import Vue from 'vue'
import { mapGetters } from 'vuex'
import SectionControl from '~/components/SectionControl'

export const section = {
  props: {
    index: Number,
    required: true,
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
      currentThemeName: 'document/currentThemeName',
      currentThemeStyles: 'document/currentTheme',
    }),
  },
  provide() {
    return {
      tags: this.$options.tags,
      index: this.index,
    }
  },
  mounted() {
    if (process.client) {
      const { $el } = this
      const SectionControlComponent = Vue.extend(SectionControl)
      const sectionControl = new SectionControlComponent({
        parent: this,
      })
      sectionControl.$mount()
      const currentPositionValue = getComputedStyle($el).position
      if (currentPositionValue === 'static') $el.style.position = 'relative'
      $el.appendChild(sectionControl.$el)
    }
  },
}

export * from './changeFeed'
