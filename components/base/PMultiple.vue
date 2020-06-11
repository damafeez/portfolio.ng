<script>
export default {
  name: 'PMultiple',
  props: {
    addresses: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  render(createElement) {
    const createElementsRecursive = addresses => {
      const [[component, address], ...subsequentAddresses] = addresses
      const element = createElement(component, {
        props: {
          address,
          tag: this.$vnode.data.tag,
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
