<template>
  <div class="editor">
    <div
      class="gear bg-secondary text-on-secondary right-0 fixed flex items-center rounded-tl-full rounded-bl-full shadow-2xl py-2 px-2"
    >
      <span
        class="cursor-pointer p-2"
        @click="!editMode && $router.push({ query: { edit: 'true' } })"
      >
        <icon-base :name="editMode ? 'settings' : 'edit-2'" />
      </span>
    </div>
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
    }
  },
  watch: {
    $route(route) {
      this.editMode = route.query.edit === 'true'
    },
  },
  mounted() {
    this.editMode = this.$route.query.edit === 'true'
  },
}
</script>
<style lang="scss" scoped>
.editor {
  .gear {
    top: 5%;
    width: 3rem;
    height: 3rem;
  }
}
</style>
