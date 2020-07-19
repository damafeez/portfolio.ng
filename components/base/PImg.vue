<script>
import { get, inRange } from 'lodash'
import { changeFeed, changeFeedProps } from '~/mixins'
import { TEMPLATE_EDITOR_UPLOAD_IMAGE } from '~/constants'

export default {
  // mount file uploader from this component
  name: 'PImg',
  mixins: [changeFeed, changeFeedProps],
  props: {
    address: {
      type: String,
      required: true,
    },
    overlay: {
      type: [Number, String],
      default: null,
      validator: val => inRange(val, 0, 1.0000001),
    },
  },
  computed: {
    imgUrl() {
      return get(this.schema, this.address, '')
    },
    tagName() {
      return this.$vnode.data.tag || 'img'
    },
  },
  watch: {
    imgUrl(url) {
      if (this.$el.tagName === 'IMG') this.$el.setAttribute('src', url)
      else this.$el.style.backgroundImage = `url(${this.imgUrl})`
    },
  },
  methods: {
    setup() {
      this.$el.classList.add('stop-cursor-propagation')
      this.$el.addEventListener('dblclick', this.imgUpload)
    },
    imgUpload({ target }) {
      this.$eventBus.$emit(TEMPLATE_EDITOR_UPLOAD_IMAGE, this.address)
    },
    changeHandler(text) {},
    clean() {
      this.$el.removeEventListener('dblclick', this.imgUpload)
      this.$el.classList.remove('stop-cursor-propagation')
    },
  },
  render(h) {
    const slot =
      typeof this.$scopedSlots.default === 'function'
        ? this.$scopedSlots.default({
            value: this.imgUrl,
          })
        : null
    const attrs = {}
    const style = {}
    if (this.tagName === 'img') {
      const brightness =
        this.overlay !== null && `brightness(${1 - this.overlay})`
      brightness && (style.filter = brightness)
      attrs.src = this.imgUrl
    } else {
      const overlayGradient =
        this.overlay === null
          ? ''
          : `linear-gradient(rgba(0, 0, 0, ${this.overlay}), rgba(0, 0, 0, ${this.overlay})), `
      style.backgroundImage = `${overlayGradient}url(${this.imgUrl})`
    }
    return this.tagName
      ? h(
          this.tagName,
          {
            on: this.$listeners,
            attrs,
            style,
          },
          slot,
        )
      : slot
  },
}
</script>
