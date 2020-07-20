<template>
  <!-- wrap with portfolio layout because nuxt doesn't allow nested layouts -->
  <portfolio-layout>
    <nuxt-child />
  </portfolio-layout>
</template>

<script>
import { merge } from 'lodash'
import PortfolioLayout from '~/layouts/portfolio'
import { getSchema } from '~/utils'
import defaultSchema from '~/schema/index.json'

export default {
  layout: 'templateEditor',
  components: {
    PortfolioLayout,
  },
  middleware({ store, route, error }) {
    const name = route.params.portfolio
    const schema = getSchema(name)
    if (!schema)
      return error({
        statusCode: 404,
        message: `Template "${name}" not found, you probably followed an invalid link :(`,
      })

    const mergedSchema = merge(
      {},
      defaultSchema,
      { _meta: { modes: ['default'] } },
      schema,
      { _meta: { name } },
    )
    store.dispatch('document/setSchema', mergedSchema)
  },
}
</script>
