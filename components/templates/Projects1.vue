<template>
  <section class="projects pad-y">
    <h3 class="mb-32">Some things I've built</h3>
    <div class="projects-grid grid-3">
      <div
        v-for="project in $schema.projects"
        :key="project.name"
        class="btn-hover shadow-lg  rounded-sm bg-tertiary text-on-tertiary p-5"
      >
        <h4 v-schema-text="project.name" class="text-primary" />
        <p v-schema-text="project.description" />
        <ul class="flex mt-8">
          <li
            v-for="tag in project.tags"
            :key="tag"
            v-schema-text="tag"
            class="text-sm"
          />
        </ul>
      </div>
    </div>

    <button class="mt-20 bg-transparent text-current pl-2 shadow-none">
      Show more &darr;
    </button>
  </section>
</template>
<style lang="scss" scoped>
.projects {
  .projects-grid {
    & > div li:not(:last-child) {
      @apply mr-3;
    }
  }
}
</style>
