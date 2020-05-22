import { mapGetters } from 'vuex'
const section = {
  computed: {
    ...mapGetters({
      schema: 'schema/schema',
    }),
  },
}

export { section }
