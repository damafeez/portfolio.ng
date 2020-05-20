<template>
  <div class="editor">
    <div
      class="gear bg-secondary text-on-secondary right-0 fixed flex items-center rounded-tl-full rounded-bl-full shadow-2xl py-2 px-2"
    >
      <span class="cursor-pointer p-2" @click="setEditMode(!editMode)">
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
      const wrapper = this.$refs.template
      const editableTextNodes = wrapper.querySelectorAll('[p-editable]')
      editableTextNodes.forEach(node => {
        node.setAttribute('contenteditable', '')
      })
      if (editMode) {
        wrapper.addEventListener('click', this.$options.cmdClickOnly, {
          capture: true,
        })
        alert('You are now in edit mode, use CMD/CTRL+click to click')
      } else {
        wrapper.removeEventListener('click', this.$options.cmdClickOnly, {
          capture: true,
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
  cmdClickOnly(event) {
    // Allow only command/control + click
    if (event.metaKey || event.ctrlKey) return
    event.stopPropagation()
  },
}
</script>
<style lang="scss" scoped>
.editor {
  .gear {
    top: 5%;
    width: 3rem;
    height: 3rem;
    z-index: 10000;
  }
}
</style>
