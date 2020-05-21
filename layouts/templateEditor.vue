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
      <nuxt />
    </div>

    <input
      v-if="editMode"
      ref="imageUploader"
      type="file"
      accept=".png, .jpg, .jpeg"
      @change.prevent="imageChange"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { TEMPLATE_EDITOR_UPLOAD_IMAGE } from '@/constants'

export default {
  name: 'TemplateEditor',
  data() {
    return {
      schemaAddress: '',
    }
  },
  computed: {
    ...mapState({
      editMode: 'editMode',
    }),
  },
  watch: {
    editMode(editMode) {
      const wrapper = this.$refs.template
      if (editMode) {
        wrapper.addEventListener('click', this.$options.cmdClickOnly, {
          capture: true,
        })
        // alert('You are now in edit mode, use CMD/CTRL+click to click')
      } else {
        wrapper.removeEventListener('click', this.$options.cmdClickOnly, {
          capture: true,
        })
      }
    },
  },
  mounted() {
    this.$store.dispatch('setEditMode', this.$route.query.edit === 'true')
    this.$eventBus.$on(TEMPLATE_EDITOR_UPLOAD_IMAGE, this.busImageUpoad)
  },
  destroyed() {
    this.$eventBus.$off(TEMPLATE_EDITOR_UPLOAD_IMAGE, this.busImageUpoad)
  },
  methods: {
    ...mapActions({
      setEditMode: 'setEditMode',
      editSchema: 'schema/editSchema',
    }),
    busImageUpoad(payload) {
      if (this.schemaAddress)
        return alert('can not upload now, please try again')
      this.schemaAddress = payload
      this.$refs.imageUploader.click()
      this.schemaAddress = ''
    },
    imageChange(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        this.editSchema([this.schemaAddress, reader.result])
        this.uploadImage(this.schemaAddress, file)
      }
      if (file) reader.readAsDataURL(file)
    },
    uploadImage() {},
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
  #template-editor-image-uploader {
    opacity: 0; /* make transparent */
    z-index: -1; /* move under anything else */
    position: absolute; /* don't let it take up space */
    pointer-events: none;
    transform: scale(0);
  }
}
</style>
<style lang="scss">
.stop-cursor-propagation * {
  cursor: initial;
}
</style>
