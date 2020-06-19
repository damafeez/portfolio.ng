<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import { section as sectionMixin } from '~/mixins'

export default {
  layout: 'portfolio',
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
  render(createElement) {
    return createElement(
      draggable,
      {
        props: {
          disabled: !this.editMode,
          animation: 200,
          group: 'sections',
          handle: '[draggable-handle]',
          value: this.sections,
        },
        on: {
          input: event => {
            this.sections = event
          },
        },
      },
      [
        createElement(
          'transition-group',
          { props: { type: 'transition' } },
          this.schema._meta.sections.map(name => {
            const component = require(`~/components/sections/${name}.vue`)
            const section = component.default || component
            section.mixins = [...(section.mixins || []), sectionMixin]
            return createElement(section, {
              key: name,
            })
          }),
        ),
      ],
    )
  },
}
</script>
