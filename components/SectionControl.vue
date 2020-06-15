<template>
  <div
    v-if="editMode"
    class="section-control text-on-tertiary p-3 flex items-center"
  >
    <span
      draggable-handle
      class="p-2 flex-center rounded-full cursor-pointer m-1 text-lg btn-hover"
      ><icon-base name="move"></icon-base
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
  position: absolute;
  top: 0;
  right: 2rem;
}
</style>
