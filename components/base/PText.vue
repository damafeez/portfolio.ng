<script>
import { get } from 'lodash'
import { changeFeed } from '~/mixins'
import { TEMPLATE_EDITOR_TEXT_EDIT } from '~/constants'

export default {
  name: 'PText',
  mixins: [changeFeed],
  props: {
    address: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    text() {
      return this.$escapeHTML(get(this.schema, this.address) || '')
    },
    tagName() {
      return this.$vnode.data.tag || this.tag
    },
  },
  methods: {
    setup() {
      this.$el.setAttribute('contenteditable', '')
      this.$el.addEventListener('focus', this.focus)
      this.$el.addEventListener('blur', this.blur)
    },
    focus({ target }) {
      target.initialText = target.innerHTML
    },
    blur({ target }) {
      if (target.innerHTML !== target.initialText)
        this.changeHandler(target.textContent.trim())
      delete target.initialText
    },
    changeHandler(text) {
      this.$eventBus.$emit(TEMPLATE_EDITOR_TEXT_EDIT, [this.address, text])
    },
    clean() {
      if (!this.$el) return
      this.$el.removeAttribute('contenteditable')
      this.$el.removeEventListener('focus', this.focus)
      this.$el.removeEventListener('blur', this.blur)
    },
  },
  render(createElement) {
    const slot =
      typeof this.$scopedSlots.default === 'function'
        ? this.$scopedSlots.default({
            value: this.text,
            address: this.address,
          })[0]
        : {}
    return slot.tag
      ? slot
      : createElement(this.tagName, {
          on: this.$listeners,
          attr: this.$attr,
          domProps: {
            innerHTML: slot.text || this.text,
          },
        })
  },
}
</script>
<style lang="scss"></style>
