<template>
  <section class="featured-templates text-center pad-y">
    <h3 class="mb-32">Featured templates</h3>
    <div class="template-grid">
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
      View all templates &#8594;
    </nuxt-link>
  </section>
</template>
<style lang="scss" scoped>
.featured-templates {
  .template-grid {
    display: grid;
    gap: 3rem;
    grid-template-columns: 1;
    @screen sm {
      grid-template-columns: repeat(2, 1fr);
    }
    @screen lg {
      grid-template-columns: repeat(3, 1fr);
    }
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
