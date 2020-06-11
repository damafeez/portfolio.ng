<script>
import Vue from 'vue'
import { get } from 'lodash'
import IconPicker from '~/components/IconPicker.vue'
import { changeFeed, changeFeedProps, changeFeedPopup } from '~/mixins'
import { TEMPLATE_ICON_CHANGE } from '~/constants'

export default {
  name: 'PIcon',
  mixins: [changeFeed, changeFeedProps, changeFeedPopup],
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  computed: {
    name() {
      return get(this.schema, this.address)
    },
  },
  methods: {
    setup() {
      const { $el, $options, changeHandler, isMultiple, popupSetup } = this
      if (!isMultiple) popupSetup()
      const editContainer = $el.parentNode.querySelector('[p-edit-container]')
      let { iconPicker } = $options
      if (!iconPicker) {
        const IconPickerComponent = Vue.extend(IconPicker)
        iconPicker = new IconPickerComponent()
        iconPicker.$mount()
        editContainer.appendChild(iconPicker.$el)
        this.$options.iconPicker = iconPicker
      }
      iconPicker.$on('icon-change', changeHandler)
    },
    changeHandler(name) {
      this.$eventBus.$emit(TEMPLATE_ICON_CHANGE, [this.address, name])
    },
    teardown() {
      this.$options.iconPicker.$off('icon-change', this.changeHandler)
      if (!this.isMultiple) this.popupSetup()
    },
  },
  render(createElement) {
    return typeof this.$scopedSlots.default === 'function'
      ? this.$scopedSlots.default({
          value: this.name,
        })
      : createElement('IconBase', {
          props: {
            on: this.$listeners,
            name: this.name,
          },
        })
  },
}
</script>
<style lang="scss"></style>
