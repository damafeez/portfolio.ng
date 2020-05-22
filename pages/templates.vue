<template>
  <nuxt-child />
</template>

<script>
import { getSchema } from '@/utils'
export default {
  layout: 'templateEditor',
  middleware({ app, store, route }) {
    const name = route.name.split('-')[1]
    if (name) {
      store.dispatch('schema/editSchema', ['_meta.name', name])
      store.dispatch(
        'schema/setSchema',
        getSchema(name, store.state.schema.document),
      )
    }
  },
}
</script>
