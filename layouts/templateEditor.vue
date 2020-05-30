<template>
  <div class="editor">
    <div
      class="gear bg-secondary text-on-secondary right-0 fixed flex items-center rounded-tl-full rounded-bl-full shadow-2xl py-2 px-2"
    >
      <span class="cursor-pointer p-2" @click="toggleEditMode">
        <icon-base :name="editMode ? 'settings' : 'edit-2'" />
      </span>
    </div>
    <Notification />
    <div ref="template">
      <nuxt />
    </div>

    <input
      v-if="editMode"
      id="template-editor-image-uploader"
      ref="imageUploader"
      type="file"
      accept=".png, .jpg, .jpeg"
      @change.prevent="imageChange"
    />
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import Notification from '~/components/Notification'
import {
  TEMPLATE_EDITOR_UPLOAD_IMAGE,
  TEMPLATE_EDITOR_TEXT_EDIT,
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '~/constants'

export default {
  name: 'TemplateEditor',
  components: {
    Notification,
  },
  data() {
    return {
      schemaAddress: '',
    }
  },
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
  },
  watch: {
    editMode(editMode) {
      const wrapper = this.$refs.template
      if (editMode) {
        wrapper.addEventListener('click', this.$options.cmdClickFocus, {
          capture: true,
        })
        this.busBindListeners()
        this.$eventBus.$emit(SHOW_NOTIFICATION, {
          title: "You're in edit mode. 🙂",
          text: `CMD/CTRL+click to click/focus silently.
            Double click images to replace them.`,
        })
      } else {
        wrapper.removeEventListener('click', this.$options.cmdClickFocus, {
          capture: true,
        })
        this.$eventBus.$emit(REMOVE_NOTIFICATION)
        this.busUnbindListeners()
      }
    },
  },
  mounted() {
    this.setMode(this.$route.query.edit === 'true' ? 'edit' : 'template')
  },
  destroyed() {
    this.busUnbindListeners()
  },
  methods: {
    ...mapActions({
      setMode: 'setMode',
      editSchema: 'document/editSchema',
    }),
    toggleEditMode: debounce(
      function editToggle() {
        this.setMode(this.editMode ? 'template' : 'edit')
      },
      500,
      { leading: true, trailing: false },
    ),
    busImageUpoad(payload) {
      this.schemaAddress = payload
      this.$refs.imageUploader.click()
    },
    busSchemaEdit(payload) {
      this.editSchema(payload)
    },
    busBindListeners() {
      this.$eventBus.$on(TEMPLATE_EDITOR_UPLOAD_IMAGE, this.busImageUpoad)
      this.$eventBus.$on(TEMPLATE_EDITOR_TEXT_EDIT, this.busSchemaEdit)
    },
    busUnbindListeners() {
      this.$eventBus.$off(TEMPLATE_EDITOR_UPLOAD_IMAGE, this.busImageUpoad)
      this.$eventBus.$off(TEMPLATE_EDITOR_TEXT_EDIT, this.busSchemaEdit)
    },
    imageChange(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        this.editSchema([this.schemaAddress, reader.result])
        this.uploadImage(this.schemaAddress, file)
        // TODO: update schemaAddress to avoid conflict
        this.schemaAddress = ''
      }
      if (file) reader.readAsDataURL(file)
    },
    uploadImage() {},
  },
  cmdClickFocus(event) {
    // Disallow only command/control + click
    if (event.metaKey || event.ctrlKey) event.stopPropagation()
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
.stop-cursor-propagation {
  cursor: url('~assets/images/image.png'), auto;
  * {
    cursor: initial;
  }
}
</style>
