<template>
  <main class="portfolio bg-background text-on-background">
    <slot v-if="schemaIsValid" />
    <div v-else>Please provide a valid schema</div>
  </main>
</template>
<script>
import { isEmpty } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'Portfolio',
  computed: {
    ...mapGetters({
      schema: 'schema/schema',
    }),
    schemaIsValid() {
      return !isEmpty(this.schema)
    },
  },
}
</script>
<style lang="scss" scoped>
.portfolio {
}
</style>
