<template>
  <div class="section-wrapper relative">
    <div v-if="editMode" class="section-wrapper__editor absolute top-0">
      <SectionControl
        class="justify-end"
        @changeSection="sectionControlActive = !sectionControlActive"
      />
      <SectionSwitcher
        v-if="sectionControlActive"
        :tags="tags"
        :index="index"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SectionControl from '~/components/SectionControl'
import SectionSwitcher from '~/components/SectionSwitcher'

export default {
  components: {
    SectionControl,
    SectionSwitcher,
  },
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
  data() {
    return {
      sectionControlActive: false,
    }
  },
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
  },
}
</script>
<style lang="scss">
.section-wrapper {
  &__editor {
    right: 2rem;
    z-index: 1050;
  }
}
</style>
