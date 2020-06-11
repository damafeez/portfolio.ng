import { mapGetters } from 'vuex'
export const section = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
    }),
  },
}

export * from './changeFeed'
