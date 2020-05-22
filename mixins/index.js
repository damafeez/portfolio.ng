import { mapState } from 'vuex'
const section = {
  computed: {
    ...mapState({
      schema: 'schema',
    }),
  },
}

export { section }
