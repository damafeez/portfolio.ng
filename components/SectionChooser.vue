<template>
  <div
    class="section-chooser rounded bg-secondary text-on-secondary p-3 shadow-lg"
  >
    <ul>
      <li
        v-for="section in similarSections"
        :key="section.name"
        class="flex items-center py-3 my-2 px-4 mx-3"
        :class="
          section.active
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer btn-hover'
        "
        @click="changeSection(section)"
      >
        <icon-base
          v-if="section.active"
          class="text-2xl"
          name="check"
          style="width: 100px"
        ></icon-base>
        <img
          v-else
          width="100px"
          src="~assets/images/template-sample.png"
          :alt="section.name"
        />
        <span class="ml-4">
          {{ section.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { loadSectionNamesByTags } from '~/utils'

export default {
  name: 'SectionChooser',
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
    similarSections() {
      return loadSectionNamesByTags(this.tags)
    },
  },
  methods: {
    ...mapActions('document', ['setSection']),
    changeSection(section) {
      if (section.active) return
      this.setSection({ index: this.index, value: section.name })
    },
  },
  inject: ['tags', 'index'],
}
</script>
<style lang="scss">
.section-chooser {
  max-width: 30rem;
  max-height: 80rem;
}
</style>
