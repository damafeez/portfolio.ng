import { mapGetters } from 'vuex'

export const section = {
  props: {
    index: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
      currentThemeName: 'document/currentThemeName',
      currentThemeStyles: 'document/currentTheme',
      templateName: 'document/templateName',
    }),
  },
}

export * from './changeFeed'
