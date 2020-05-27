<template>
  <section
    v-schema.bg="['profile.images[0]']"
    class="hero bg-secondary text-on-secondary bg-right-top bg-no-repeat pb-32"
    :style="{ backgroundImage: `url(${schema.profile.images[0]})` }"
  >
    <nav class="neg-margin pad-x py-6"></nav>
    <h1 class="mt-48 mb-6 max-w-2xl">
      Hi, <br />
      I'm
      <span v-schema="['profile.name']">{{ schema.profile.name }}</span
      >.
    </h1>
    <p v-schema="['profile.description']" class="max-w-xl">
      {{ schema.profile.description }}
    </p>
    <button v-schema="['cta[0].text']" class="bg-primary my-10 text-on-primary">
      {{ schema.cta[0].text }}
    </button>
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
  background-size: 0;
  @screen sm {
    background-size: auto 100%;
  }
}
</style>
