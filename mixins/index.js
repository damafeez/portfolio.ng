import { mapGetters } from 'vuex'

export const section = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
      currentThemeName: 'document/currentThemeName',
      currentThemeStyles: 'document/currentTheme',
    }),
  },
}

export * from './changeFeed'
