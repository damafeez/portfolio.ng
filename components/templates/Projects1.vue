<template>
  <section class="projects pad-y">
    <h3 class="mb-32">Some things I've built</h3>
    <item-list
      v-slot="{ list: projects }"
      class="projects-grid grid-3"
      add-button-class-list="text-xl"
      address="projects"
    >
      <li
        v-for="(project, i) in projects"
        :key="i"
        class="btn-hover shadow-lg rounded bg-tertiary text-on-tertiary p-5"
      >
        <h4 v-schema="[`projects[${i}].name`]" class="text-primary">
          {{ project.name }}
        </h4>
        <p v-schema="[`projects[${i}].description`]">
          {{ project.description }}
        </p>
        <item-list
          v-slot="{ list: tags }"
          :address="`projects[${i}].tags`"
          class="tag-list flex flex-wrap items-center mt-8"
          add-button-class-list="bg-primary text-on-primary"
        >
          <li
            v-for="(tag, ii) in tags"
            :key="ii"
            v-schema="[`projects[${i}].tags[${ii}]`]"
            class="text-sm my-1"
          >
            {{ tag }}
          </li>
        </item-list>
      </li>
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
<style lang="scss" scoped>
.projects {
  .projects-grid {
    .tag-list li:not(:last-child) {
      @apply mr-3;
    }
  }
}
</style>
