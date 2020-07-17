<template>
  <div
    v-if="editMode"
    class="section-control absolute z-1000 top-0 text-on-tertiary"
  >
    <div class="p-3 flex items-center">
      <span
        draggable-handle
        class="section-control__icon p-1 flex-center rounded-full cursor-move m-2 text-lg"
        ><icon-base name="menu"></icon-base
      ></span>
      <span
        class="section-control__icon p-1 flex-center rounded-full cursor-move m-2 text-lg"
        @click="sectionControlActive = !sectionControlActive"
        ><icon-base name="columns"></icon-base
      ></span>
    </div>
    <SectionChooser v-if="sectionControlActive" class="absolute right-0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SectionChooser from '~/components/SectionChooser'

export default {
  name: 'SectionControl',
  components: {
    SectionChooser,
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
.section-control {
  right: 2rem;
  &__icon {
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      border: 1px solid;
      font-size: 1rem;
      padding: 0.7rem;
    }
  }
}
</style>
