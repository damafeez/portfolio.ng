<template>
  <draggable
    v-model="sections"
    :disabled="!editMode"
    :animation="200"
    group="sections"
    handle="[draggable-handle]"
  >
    <transition-group type="transition">
      <component :is="section" v-for="section in sections" :key="section">
      </component>
    </transition-group>
  </draggable>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { loadSections } from '~/utils'

export default {
  layout: 'portfolio',
  components: {
    // load all sections
    ...loadSections(),
    draggable,
  },
  data() {
    return {
      drag: false,
    }
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
    }),
    sections: {
      get() {
        return this.schema._meta.sections
      },
      set(value) {
        this.setSections(value)
      },
    },
  },
  methods: {
    ...mapActions({
      setSections: 'document/setSections',
    }),
    changeMode() {
      this.modeIndex =
        this.modeIndex < this.modes.length - 1 ? this.modeIndex + 1 : 0
    },
  },
}
</script>
