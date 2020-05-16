<template>
  <section class="featured-templates text-center pad-y">
    <h3 class="mb-32">Featured templates</h3>
    <div class="template-grid grid-3">
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
      <nuxt-link class="btn-hover" to="/templates/somolu"></nuxt-link>
    </div>
    <nuxt-link
      to="templates"
      class="btn bg-primary text-on-primary mt-20 no-underline"
    >
      View all templates &rarr;
    </nuxt-link>
  </section>
</template>
<style lang="scss" scoped>
.featured-templates {
  .template-grid {
    & > a {
      @apply rounded bg-cover;
      background-image: url('~assets/images/template-sample.png');
      height: 15rem;
      &:nth-child(even) {
        background-image: url('~assets/images/template-sample2.png');
      }
    }
  }
}
</style>
