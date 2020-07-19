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
      <SectionWrapper
        v-for="(section, i) in sections"
        :key="templateName + i"
        :index="i"
        :tags="loadSection(section).tags"
      >
        <component :is="section" />
      </SectionWrapper>
    </transition-group>
  </draggable>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import SectionWrapper from '~/components/SectionWrapper'
import { section as sectionMixin } from '~/mixins'
import { loadSection } from '~/utils'

export default {
  layout: 'portfolio',
  scrollToTop: true,
  components: {
    draggable,
    SectionWrapper,
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      // because nuxt doesn't scrollToTop for child routes
      templateName: 'document/templateName',
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
            const section = this.loadSection(name)
            section.mixins = [...(section.mixins || []), sectionMixin]
            components[name] = section
          }
        })
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('document', ['setSections']),
    loadSection,
  },
}
</script>
