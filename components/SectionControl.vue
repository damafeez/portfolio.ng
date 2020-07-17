<template>
  <div class="section-control text-on-tertiary p-3 flex items-center">
    <span
      draggable-handle
      class="section-control__icon p-1 flex-center rounded-full cursor-move m-2 text-lg"
      ><icon-base name="menu"></icon-base
    ></span>
    <span
      class="section-control__icon p-1 flex-center rounded-full cursor-move m-2 text-lg"
      @click="$emit('changeSection')"
      ><icon-base name="columns"></icon-base
    ></span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionControl',
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
  },
}
</script>
<style lang="scss">
.section-control {
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
