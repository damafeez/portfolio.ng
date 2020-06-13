<template>
  <main
    class="portfolio bg-background text-on-background"
    :mode="modes[modeIndex]"
  >
    <draggable v-if="schemaIsValid" v-model="sections" :disabled="!editMode">
      <transition-group>
        <component :is="section" v-for="section in sections" :key="section">
        </component>
      </transition-group>
    </draggable>
    <div v-else>Please provide a valid schema</div>
    <div
      class="mode z-1000 btn-hover fixed cursor-pointer rounded-lg shadow-xl bg-secondary text-on-secondary-2 flex-center"
      @click="changeMode"
    ></div>
  </main>
</template>
<script>
import { isEmpty } from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { loadSections } from '~/utils'

export default {
  name: 'Portfolio',
  components: {
    draggable,
    // load all sections
    ...loadSections(),
  },
  props: {
    modes: {
      type: Array,
      default: () => ['default'],
    },
  },
  data() {
    return {
      modeIndex: 0,
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
    schemaIsValid() {
      return !isEmpty(this.schema)
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
<style lang="scss" scoped>
.portfolio {
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
}
</style>
