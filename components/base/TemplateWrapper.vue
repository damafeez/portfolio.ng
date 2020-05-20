<template>
  <div class="editor">
    <div
      class="gear bg-secondary text-on-secondary right-0 fixed flex items-center rounded-tl-full rounded-bl-full shadow-2xl py-2 px-2"
    >
      <span class="cursor-pointer p-2" @click="!editMode && setEditMode(true)">
        <icon-base :name="editMode ? 'settings' : 'edit-2'" />
      </span>
    </div>
    <div ref="template">
      <slot />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TemplateWrapper',
  computed: {
    ...mapState({
      editMode: 'editMode',
    }),
  },
  watch: {
    editMode(editMode) {
      if (editMode) {
        const editableTextNodes = this.$refs.template.querySelectorAll(
          '[p-editable]',
        )
        editableTextNodes.forEach(node => {
          node.setAttribute('contenteditable', '')
        })
      }
    },
  },
  mounted() {
    this.$store.dispatch('setEditMode', this.$route.query.edit === 'true')
  },
  methods: {
    ...mapActions({
      setEditMode: 'setEditMode',
    }),
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
