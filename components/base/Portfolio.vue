<template>
  <main class="portfolio bg-background text-on-background">
    <slot :schema="$store.state.schema" />
  </main>
</template>
<script>
export default {
  name: 'Portfolio',
}
</script>
<style lang="scss" scoped>
.portfolio {
}
</style>
