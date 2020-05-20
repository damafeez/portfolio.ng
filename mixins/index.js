import { mapState } from 'vuex'
const section = {
  computed: {
    ...mapState({
      editMode: 'editMode',
    }),
  },
}

export { section }
