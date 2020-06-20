<template>
  <draggable
    v-model="sections"
    :disabled="!editMode"
    :animation="300"
    easing="cubic-bezier(0.075, 0.82, 0.165, 1)"
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
import { section as sectionMixin } from '~/mixins'

export default {
  layout: 'portfolio',
  components: {
    draggable,
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
  watch: {
    sections: {
      handler(sections) {
        const { components } = this.$options
        sections.forEach(name => {
          if (!(name in components)) {
            const component = require(`~/components/sections/${name}.vue`)
            const section = component.default || component
            section.mixins = [...(section.mixins || []), sectionMixin]
            components[name] = section
          }
        })
      },
      immediate: true,
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
