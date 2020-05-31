<template>
  <section class="projects pad-y">
    <h3 class="mb-32">Some things I've built</h3>
    <item-list
      class="projects-grid grid-3"
      button-class-list="text-xl"
      li-class-list="btn-hover shadow-lg rounded bg-tertiary text-on-tertiary p-5"
      address="projects"
    >
      <template #item="{ item: project, address }">
        <h4 v-schema="[`${address}.name`]" class="text-primary">
          {{ project.name }}
        </h4>
        <p v-schema="[`${address}.description`]">
          {{ project.description }}
        </p>
        <item-list
          :address="`${address}.tags`"
          class="tag-list flex flex-wrap items-center mt-8"
          button-class-list="bg-primary text-on-primary"
          li-class-list="text-sm my-1"
        >
          <template #item="{ item: tag, tagAddress }">
            <span v-schema="[tagAddress]">
              {{ tag }}
            </span>
          </template>
        </item-list>
      </template>
    </item-list>

    <button class="mt-20 bg-transparent text-current pl-2 shadow-none">
      Show more &darr;
    </button>
  </section>
</template>
<script>
import { section } from '@/mixins'
export default {
  mixins: [section],
}
</script>
<style lang="scss">
.projects {
  .projects-grid {
    .tag-list li:not(:last-child) {
      @apply mr-3;
    }
  }
}
</style>
