<template>
  <section
    class="hero bg-secondary text-on-secondary bg-right-top bg-no-repeat pb-32"
    :style="{ backgroundImage: `url(${$schema.profile.images[0]})` }"
  >
    <nav class="neg-margin pad-x py-6"></nav>
    <h1 class="mt-48 mb-6 max-w-2xl">
      Hi, <br />
      I'm <span v-schema-text="$schema.profile.name" />.
    </h1>
    <p v-schema-text="$schema.profile.description" class="max-w-xl" />
    <button
      v-schema-text="$schema.cta[0].text"
      class="bg-primary my-10 text-on-primary"
    />
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  mixins: [section],
}
</script>
<style lang="scss" scoped>
.hero {
  background-size: auto 100%;
}
</style>
