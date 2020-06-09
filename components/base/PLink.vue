<script>
import { get } from 'lodash'
import { changeFeed } from '~/mixins'

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
  methods: {},
  render(createElement) {
    console.log(this.$el, '============PLink')
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
