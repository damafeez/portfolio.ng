<script>
import { get } from 'lodash'
import { changeFeed } from '~/mixins'

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
  methods: {},
  render(createElement) {
    console.log(this.$el, '============PIcon')
    return typeof this.$scopedSlots.default === 'function'
      ? this.$scopedSlots.default({
          value: this.name,
        })
      : createElement('IconBase', {
          props: {
            name: this.name,
          },
        })
  },
}
</script>
<style lang="scss"></style>
