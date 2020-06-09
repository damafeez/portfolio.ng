<script>
import Vue from 'vue'
import { get } from 'lodash'
import IconPicker from '~/components/IconPicker.vue'
import { changeFeed } from '~/mixins'
import { TEMPLATE_ICON_CHANGE } from '~/constants'

export default {
  name: 'PIcon',
  mixins: [changeFeed],
  props: {
    address: {
      type: String,
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
    focused(focused) {
      const { iconPicker } = this.$options
      if (focused) iconPicker.$el.style.display = null
      else iconPicker.$el.style.display = 'none'
    },
  },
  methods: {
    setup() {
      if (!this.$el) return
      const IconPickerComponent = Vue.extend(IconPicker)
      const iconPicker = new IconPickerComponent()
      this.$options.iconPicker = iconPicker

      iconPicker.$mount()
      iconPicker.$on('icon-change', this.changeHandler)
      iconPicker.$el.style.display = 'none'
      iconPicker.$el.addEventListener('focus', this.onPickerFocus)
      iconPicker.$el.addEventListener('blur', this.onPickerBlur)
      this.$el.parentNode.insertBefore(iconPicker.$el, this.$el)
      this.$el.addEventListener('focus', this.focus)
      this.$el.addEventListener('blur', this.blur)
    },
    onPickerFocus() {
      this.pickerFocused = true
    },
    onPickerBlur() {
      this.pickerFocused = false
    },
    focus({ target }) {
      this.triggerFocused = true
    },
    async blur() {
      await this.$wait(100)
      this.triggerFocused = false
    },
    changeHandler(name) {
      this.$eventBus.$emit(TEMPLATE_ICON_CHANGE, [this.address, name])
    },
    tearDown() {
      const { iconPicker } = this.$options
      if (!this.$el) return
      if (iconPicker) {
        iconPicker.$off('icon-change', this.changeHandler)
        iconPicker.$el.remove()
        iconPicker.$el.removeEventListener('focus', this.onPickerFocus)
        iconPicker.$el.removeEventListener('blur', this.onPickerBlur)
      }
      this.$options.iconPicker = null
      this.$el.removeEventListener('focus', this.focus)
      this.$el.removeEventListener('blur', this.blur)
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
