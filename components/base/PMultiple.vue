<script>
import { get, debounce } from 'lodash'
import { changeFeed } from '~/mixins'

export default {
  name: 'PMultiple',
  mixins: [changeFeed],
  props: {
    addresses: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      triggerFocused: false,
      pickerFocused: false,
    }
  },
  computed: {
    name() {
      return get(this.schema, this.address)
    },
    focused() {
      return this.triggerFocused || this.pickerFocused
    },
  },
  watch: {
    focused: debounce(
      function(focused) {
        const { editContainer } = this.$options

        if (focused) editContainer.style.display = null
        else editContainer.style.display = 'none'
      },
      100,
      { leading: false, trailing: true },
    ),
  },
  methods: {
    setup() {
      const { $el, containerFocus, containerBlur } = this
      if (!$el) return

      let editContainer = $el.parentNode.querySelector('[p-edit-container]')
      if (!editContainer) {
        editContainer = document.createElement('div')
        editContainer.setAttribute('p-edit-container', '')
        editContainer.setAttribute('tabindex', '-1')
        editContainer.style.display = 'none'
        editContainer.style.outline = 'none'
        $el.parentNode.insertBefore(editContainer, $el)
      }

      editContainer.addEventListener('focus', containerFocus, { capture: true })
      editContainer.addEventListener('blur', containerBlur, { capture: true })

      $el.addEventListener('focus', this.triggerFocus)
      $el.addEventListener('blur', this.triggerBlur)
      this.$options.editContainer = editContainer
    },
    containerFocus() {
      this.pickerFocused = true
    },
    containerBlur() {
      this.pickerFocused = false
    },
    triggerFocus({ target }) {
      this.triggerFocused = true
    },
    triggerBlur() {
      this.triggerFocused = false
    },
    tearDown() {
      const {
        $options: { editContainer },
        $el,
        containerFocus,
        containerBlur,
        triggerFocus,
        triggerBlur,
      } = this

      if (!$el) return
      if (editContainer) {
        editContainer.removeEventListener('focus', containerFocus, {
          capture: true,
        })
        editContainer.removeEventListener('blur', containerBlur, {
          capture: true,
        })

        $el.removeEventListener('focus', triggerFocus)
        $el.removeEventListener('blur', triggerBlur)
      }
    },
  },
  render(createElement) {
    const createElementsRecursive = addresses => {
      const [[component, address], ...subsequentAddresses] = addresses
      const element = createElement(component, {
        tag: this.$vnode.data.tag,
        props: {
          address,
          multiple: true,
        },
        scopedSlots: {
          default: props =>
            subsequentAddresses.length
              ? createElementsRecursive(subsequentAddresses)
              : typeof this.$scopedSlots.default === 'function' &&
                this.$scopedSlots.default(props),
        },
      })
      return element
    }
    // TODO: allow pascal case addresses
    const addresses = Object.entries(this.addresses).filter(([address]) =>
      this.$options.allowedComponentsOrder.includes(address),
    )
    return createElementsRecursive(addresses)
  },
  allowedComponentsOrder: ['p-link', 'p-icon', 'p-text'],
}
</script>
<style lang="scss"></style>
