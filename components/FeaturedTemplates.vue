<template>
  <section class="featured-templates pad-y">
    <h3 class="mb-32 text-center">Featured templates</h3>
    <div class="template-grid grid-3">
      <nuxt-link
        v-for="name in $options.themeNames"
        :key="name"
        class="uppercase mb-10"
        :to="`/templates/${name}`"
      >
        <figure class="m-0">
          <img
            class="rounded object-cover h-56 btn-hover"
            src="~assets/images/template-sample.png"
            :alt="name"
          />
          <figcaption class="mt-3">
            {{ name }}
          </figcaption>
        </figure></nuxt-link
      >
    </div>
    <nuxt-link
      to="templates"
      class="btn bg-primary text-on-primary mt-20 no-underline"
    >
      View all templates &rarr;
    </nuxt-link>
  </section>
</template>
<script>
import { getSchemaNames } from '~/utils'
export default {
  themeNames: getSchemaNames(),
}
</script>
