import { mapState } from 'vuex'
const section = {
  computed: {
    ...mapState({
      editMode: 'editMode',
    }),
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
}

export { section }
