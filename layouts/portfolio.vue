<template>
  <main
    class="portfolio-layout bg-background text-on-background somolu"
    :mode="currentMode"
    :style="{ ...themes[currentMode], ...meta.styles }"
  >
    <slot>
      <nuxt />
    </slot>
    <div
      class="mode z-1000 btn-hover fixed cursor-pointer rounded-lg shadow-xl bg-secondary text-on-secondary-2 flex-center"
      @click="changeMode"
    ></div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
import { without } from 'lodash'

export default {
  name: 'PortfolioLayout',
  data() {
    return {
      modeIndex: 0,
    }
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      templateName: 'document/templateName',
      editMode: 'editMode',
    }),
    meta() {
      return this.schema._meta
    },
    themes() {
      return this.meta.themes
    },
    modes() {
      const modes = Object.keys(this.themes)
      const preferredCurrent = this.meta.currentMode
      return preferredCurrent
        ? [preferredCurrent, ...without(modes, preferredCurrent)]
        : modes
    },
    currentMode() {
      return this.modes[this.modeIndex]
    },
  },
  methods: {
    changeMode() {
      this.modeIndex =
        this.modeIndex < this.modes.length - 1 ? this.modeIndex + 1 : 0
    },
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
