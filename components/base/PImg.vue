<script>
import { get } from 'lodash'
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
    teardown() {
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
            },
          },
          slot,
        )
      : slot
  },
}
</script>
<style lang="scss"></style>
