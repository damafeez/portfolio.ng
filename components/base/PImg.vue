<script>
import { get, inRange } from 'lodash'
import { mapGetters } from 'vuex'
import { changeFeed, changeFeedProps } from '~/mixins'
import { TEMPLATE_EDITOR_UPLOAD_IMAGE } from '~/constants'
import { wait } from '~/utils'

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
      default: 0,
      validator: val => inRange(val, 0, 1.1),
    },
  },
  data() {
    return {
      shadowOverlay: null,
    }
  },
  computed: {
    ...mapGetters({ currentThemeName: 'document/currentThemeName' }),
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
    currentThemeName: {
      async handler() {
        if (process.client) {
          if (!this.overlay) {
            this.shadowOverlay = undefined
            return
          }
          await wait(500)
          const { backgroundColor } = getComputedStyle(this.$el)
          const overlayColor = backgroundColor.replace(
            /^rgba?\((\d+,\s*\d+,\s*\d+)(,\s*\d+)?\)$/,
            `rgba($1 ,${this.overlay})`,
          )
          // TODO: handle initial shadow
          const shadowOverlay = `inset 0 0 0 100vw ${overlayColor}`
          this.shadowOverlay = shadowOverlay
        }
      },
      immediate: true,
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
  render(createElement) {
    const slot =
      typeof this.$scopedSlots.default === 'function'
        ? this.$scopedSlots.default({
            value: this.href,
          })
        : null
    return this.tagName
      ? createElement(
          this.tagName,
          {
            on: this.$listeners,
            attrs: {
              src: this.tagName === 'img' ? this.imgUrl : undefined,
            },
            style: {
              backgroundImage:
                this.tagName !== 'img' ? `url(${this.imgUrl})` : undefined,
              boxShadow: this.shadowOverlay,
              transition: 'box-shadow 0.2s cubic-bezier(0.075, 0.82, 0.165, 1)',
            },
          },
          slot,
        )
      : slot
  },
}
</script>
