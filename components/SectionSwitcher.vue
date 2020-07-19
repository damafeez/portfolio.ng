<template>
  <ul
    class="section-switcher rounded bg-secondary text-on-secondary p-3 shadow-lg"
  >
    <li
      v-for="section in similarSections"
      :key="section.name"
      class="py-3 my-2 px-4 mx-1"
      :class="
        section.active
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer btn-hover'
      "
      @click="changeSection(section)"
    >
      <figure class="flex items-center m-0">
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
        <figcaption class="ml-5">
          {{ section.name }}
        </figcaption>
      </figure>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getSectionsByTags } from '~/utils'

export default {
  name: 'SectionSwitcher',
  props: {
    index: {
      type: Number,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
    similarSections() {
      const [_, ...withoutThemeName] = this.tags
      return getSectionsByTags(withoutThemeName)
    },
  },
  methods: {
    ...mapActions('document', ['setSection']),
    changeSection(section) {
      if (section.active) return
      this.setSection({ index: this.index, value: section.name })
    },
  },
}
</script>
<style lang="scss">
.section-switcher {
  max-width: 30rem;
  max-height: 80rem;
}
</style>
