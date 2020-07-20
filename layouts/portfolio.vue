<template>
  <main
    class="portfolio-layout bg-background text-on-background somolu"
    :mode="currentThemeName"
    :style="{ ...currentThemeStyles, ...meta.styles }"
    :class="meta.classes"
    :outline-button="meta.attrs.outlineButton"
    :section-spacing="meta.attrs.sectionSpacing"
    :show-section-index="meta.attrs.showSectionIndex"
  >
    <slot>
      <nuxt />
    </slot>
    <div
      class="mode z-1001 btn-hover fixed cursor-pointer rounded-lg shadow-xl bg-secondary text-on-secondary-2 flex-center"
      @click="changeTheme"
    ></div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PortfolioLayout',
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      templateName: 'document/templateName',
      currentThemeName: 'document/currentThemeName',
      currentThemeStyles: 'document/currentTheme',
      editMode: 'editMode',
    }),
    meta() {
      return this.schema._meta
    },
  },
  methods: {
    ...mapActions({
      changeTheme: 'document/changeThemeIndex',
    }),
  },
}
</script>
<style lang="scss" scoped>
.portfolio-layout {
  .mode {
    width: 2.5rem;
    height: 2.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    @screen sm {
      bottom: 1rem;
      left: 1rem;
    }
    &::before {
      content: '';
      font-size: 1rem;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      background-color: currentColor;
      transition: 0.5s ease-out;
    }
  }
  &[mode='night'] .mode::before {
    background-color: transparent;
    box-shadow: inset 0.5em 0 currentColor;
    animation: hover 70s ease-out infinite;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
}
</style>
