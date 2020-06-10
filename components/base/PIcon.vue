<script>
import Vue from 'vue'
import { get } from 'lodash'
import IconPicker from '~/components/IconPicker.vue'
import { changeFeed } from '~/mixins'
import { TEMPLATE_ICON_CHANGE } from '~/constants'
import {
  getEditContainer,
  setupEditContainerListeners,
  removeEditContainerListeners,
} from '~/utils'

export default {
  name: 'PIcon',
  mixins: [changeFeed],
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
      if (!this.$el) return
      const editContainer = getEditContainer(this.$el)
      let iconPicker = this.$options.iconPicker
      if (!iconPicker) {
        const IconPickerComponent = Vue.extend(IconPicker)
        iconPicker = new IconPickerComponent()
        iconPicker.$mount()
        editContainer.appendChild(iconPicker.$el)
        this.$options.iconPicker = iconPicker
      }
      iconPicker.$on('icon-change', this.changeHandler)
      setupEditContainerListeners(this.$el)
    },
    changeHandler(name) {
      this.$eventBus.$emit(TEMPLATE_ICON_CHANGE, [this.address, name])
    },
    tearDown() {
      if (this.$options.iconPicker && this.$el) {
        removeEditContainerListeners(this.$el)
        this.$options.iconPicker.$off('icon-change', this.changeHandler)
      }
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
