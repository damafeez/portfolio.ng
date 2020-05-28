<template>
  <section class="projects pad-y">
    <h3 class="mb-32">Some things I've built</h3>
    <div class="projects-grid grid-3">
      <div
        v-for="(project, i) in schema.projects"
        :key="i"
        class="btn-hover shadow-lg rounded bg-tertiary text-on-tertiary p-5"
      >
        <h4 v-schema="[`projects[${i}].name`]" class="text-primary">
          {{ project.name }}
        </h4>
        <p v-schema="['project.description']">
          {{ project.description }}
        </p>
        <ul class="flex mt-8">
          <li
            v-for="(tag, ii) in project.tags"
            :key="ii"
            v-schema="[`projects[${i}].name.tags[${ii}]`]"
            class="text-sm"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>

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
    & > div li:not(:last-child) {
      @apply mr-3;
    }
  }
}
</style>
