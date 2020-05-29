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
      store.dispatch('document/editSchema', ['_meta.name', name])
      store.dispatch(
        'document/setSchema',
        getSchema(name, store.state.document.schema),
      )
    }
  },
}
</script>
