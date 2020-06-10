<script>
import Vue from 'vue'
import { get } from 'lodash'
import {
  getEditContainer,
  setupEditContainerListeners,
  removeEditContainerListeners,
} from '~/utils'
import TextInput from '~/components/TextInput'
import { changeFeed } from '~/mixins'
import { TEMPLATE_LINK_CHANGE } from '~/constants'

export default {
  name: 'PLink',
  mixins: [changeFeed],
  props: {
    address: {
      type: String,
      required: true,
    },
  },
  computed: {
    href() {
      return get(this.schema, this.address, '')
    },
  },
  methods: {
    setup() {
      if (!this.$el) return
      const editContainer = getEditContainer(this.$el)
      let textInput = this.$options.textInput
      if (!textInput) {
        const TextInputComponent = Vue.extend(TextInput)
        textInput = new TextInputComponent({
          propsData: { value: this.href, icon: 'link' },
        })

        textInput.$mount()
        editContainer.appendChild(textInput.$el)
        this.$options.textInput = textInput
      }
      textInput.$on('input', this.changeHandler)
      setupEditContainerListeners(this.$el)
    },
    changeHandler(link) {
      this.$eventBus.$emit(TEMPLATE_LINK_CHANGE, [this.address, link])
    },
    tearDown() {
      if (this.$options.iconPicker && this.$el) {
        removeEditContainerListeners(this.$el)
        this.$options.iconPicker.$off('input', this.changeHandler)
      }
    },
  },
  render(createElement) {
    const slot =
      typeof this.$scopedSlots.default === 'function'
        ? this.$scopedSlots.default({
            value: this.href,
          })
        : null
    return this.$vnode.data.tag
      ? createElement(
          this.$vnode.data.tag,
          {
            on: this.$listeners,
            attrs: { href: this.href },
          },
          slot,
        )
      : slot
  },
}
</script>
<style lang="scss"></style>
