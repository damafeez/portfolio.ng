import { mapGetters } from 'vuex'
const section = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
    }),
  },
}

export { section }
