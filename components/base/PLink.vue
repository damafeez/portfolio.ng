<script>
import Vue from 'vue'
import { get } from 'lodash'
import TextInput from '~/components/TextInput'
import { changeFeed, changeFeedProps, changeFeedPopup } from '~/mixins'
import { TEMPLATE_LINK_CHANGE } from '~/constants'

export default {
  name: 'PLink',
  mixins: [changeFeed, changeFeedProps, changeFeedPopup],
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
      const { $el, $options, changeHandler, isMultiple, popupSetup } = this
      if (!isMultiple) popupSetup()
      const editContainer = $el.parentNode.querySelector('[p-edit-container]')
      let { textInput } = $options
      if (!textInput) {
        const TextInputComponent = Vue.extend(TextInput)
        textInput = new TextInputComponent({
          propsData: { value: this.href, icon: 'link' },
        })

        textInput.$mount()
        editContainer.appendChild(textInput.$el)
        this.$options.textInput = textInput
      }
      textInput.$on('input', changeHandler)
    },
    changeHandler(link) {
      this.$eventBus.$emit(TEMPLATE_LINK_CHANGE, [this.address, link])
    },
    clean() {
      this.$options.textInput.$off('input', this.changeHandler)
      if (!this.isMultiple) this.popupClean()
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
