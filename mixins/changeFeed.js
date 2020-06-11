import { debounce } from 'lodash'
import { mapGetters } from 'vuex'

export const changeFeed = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
    }),
  },
  watch: {
    editMode(editMode) {
      if (process.client) {
        if (editMode) this.setup()
        else this.teardown()
      }
    },
  },
  methods: {
    setup() {},
    teardown() {},
  },
  mounted() {
    if (this.editMode && process.client) this.setup()
  },
  beforeDestroy() {
    if (process.client) this.teardown()
  },
}

export const changeFeedPopup = {
  data() {
    return {
      popupTriggerFocused: false,
      popupContainerFocused: false,
    }
  },
  computed: {
    popupFocused() {
      return this.popupTriggerFocused || this.popupContainerFocused
    },
  },
  watch: {
    popupFocused: debounce(
      function(focused) {
        const { popupContainer } = this.$options

        if (focused) popupContainer.style.display = null
        else popupContainer.style.display = 'none'
      },
      100,
      { leading: false, trailing: true },
    ),
  },
  methods: {
    popupSetup() {
      const { $el, containerFocus, containerBlur } = this
      if (!$el) return

      let popupContainer = $el.parentNode.querySelector('[p-edit-container]')
      if (!popupContainer) {
        popupContainer = document.createElement('div')
        popupContainer.setAttribute('p-edit-container', '')
        popupContainer.setAttribute('tabindex', '-1')
        // TODO: handle container positioning
        popupContainer.style.display = 'none'
        popupContainer.style.outline = 'none'
        $el.parentNode.insertBefore(popupContainer, $el)
      }

      popupContainer.addEventListener('focus', containerFocus, {
        capture: true,
      })
      popupContainer.addEventListener('blur', containerBlur, { capture: true })

      $el.addEventListener('focus', this.triggerFocus)
      $el.addEventListener('blur', this.triggerBlur)
      this.$options.popupContainer = popupContainer
    },
    containerFocus() {
      this.popupContainerFocused = true
    },
    containerBlur() {
      this.popupContainerFocused = false
    },
    triggerFocus() {
      this.popupTriggerFocused = true
    },
    triggerBlur() {
      this.popupTriggerFocused = false
    },
    popupTeardown() {
      const {
        $options: { popupContainer },
        $el,
        containerFocus,
        containerBlur,
        triggerFocus,
        triggerBlur,
      } = this

      if (!$el) return
      if (popupContainer) {
        popupContainer.removeEventListener('focus', containerFocus, {
          capture: true,
        })
        popupContainer.removeEventListener('blur', containerBlur, {
          capture: true,
        })

        $el.removeEventListener('focus', triggerFocus)
        $el.removeEventListener('blur', triggerBlur)
      }
    },
  },
}

export const changeFeedProps = {
  props: {
    isMultiple: false,
  },
}
