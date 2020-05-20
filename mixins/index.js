import { mapState } from 'vuex'
const section = {
  computed: {
    ...mapState({
      editMode: 'editMode',
      schema: 'schema',
    }),
  },
}

export { section }
