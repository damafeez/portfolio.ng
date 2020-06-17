<template>
  <!-- wrap with portfolio layout because nuxt doesn't allow nested layouts -->
  <portfolio-layout>
    <nuxt-child />
  </portfolio-layout>
</template>

<script>
import PortfolioLayout from '~/layouts/portfolio'
import { getSchema } from '~/utils'
export default {
  layout: 'templateEditor',
  components: {
    PortfolioLayout,
  },
  middleware({ app, store, route, payload }) {
    const name = route.params.portfolio
    store.dispatch(
      'document/setSchema',
      getSchema(name, store.state.document.schema),
    )
  },
}
</script>
