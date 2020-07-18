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
    brightness() {
      return this.overlay && `brightness(${this.overlay * 100}%)`
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
    const { tagName, imgUrl, brightness } = this
    const slot =
      typeof this.$scopedSlots.default === 'function'
        ? this.$scopedSlots.default({
            value: imgUrl,
          })
        : null
    const attrs = {}
    const style = {}
    if (tagName === 'img') {
      attrs.src = imgUrl
      brightness && (style.filter = brightness)
    } else {
      style.backgroundImage = `url(${imgUrl})`
      brightness && (style.position = 'relative')
    }

    return this.tagName
      ? h(
          this.tagName,
          {
            on: this.$listeners,
            attrs,
            style,
          },
          tagName === 'img' || !brightness
            ? slot
            : [
                h('div', {
                  style: {
                    backdropFilter: `brightness(${this.overlay * 100}%)`,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                  },
                }),
                h(
                  'div',
                  {
                    style: {
                      position: 'relative',
                    },
                  },
                  slot,
                ),
              ],
        )
      : slot
  },
}
</script>
