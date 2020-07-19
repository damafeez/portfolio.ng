<template>
  <div class="section-wrapper relative">
    <div v-if="editMode" class="section-wrapper__editor absolute z-10 top-0">
      <SectionControl
        class="justify-end"
        @changeSection="sectionControlActive = !sectionControlActive"
      />
      <keep-alive>
        <transition name="fade">
          <SectionSwitcher
            v-if="sectionControlActive"
            class="mr-2"
            :tags="tags"
            :index="index"
          />
        </transition>
      </keep-alive>
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
  watch: {
    editMode(editMode) {
      if (!editMode) this.sectionControlActive = false
    },
  },
}
</script>
<style lang="scss">
.section-wrapper {
  &__editor {
    right: 2rem;
  }
}
</style>
