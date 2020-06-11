<script>
import { changeFeed, changeFeedPopup } from '~/mixins'

export default {
  name: 'PMultiple',
  mixins: [changeFeed, changeFeedPopup],
  props: {
    addresses: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setup() {
      this.popupSetup()
    },
    teardown() {
      this.popupTeardown()
    },
  },
  render(createElement) {
    const createElementsRecursive = addresses => {
      const [[component, address], ...subsequentAddresses] = addresses
      const element = createElement(component, {
        tag: this.$vnode.data.tag,
        props: {
          address,
          multiple: true,
        },
        scopedSlots: {
          default: props =>
            subsequentAddresses.length
              ? createElementsRecursive(subsequentAddresses)
              : typeof this.$scopedSlots.default === 'function' &&
                this.$scopedSlots.default(props),
        },
      })
      return element
    }
    // TODO: allow pascal case addresses
    const addresses = Object.entries(this.addresses).filter(([address]) =>
      this.$options.allowedComponentsOrder.includes(address),
    )
    return createElementsRecursive(addresses)
  },
  allowedComponentsOrder: ['p-link', 'p-icon', 'p-text'],
}
</script>
<style lang="scss"></style>
