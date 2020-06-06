import { mapGetters } from 'vuex'
const section = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
    }),
  },
}
const changeFeed = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
    }),
  },
  watch: {
    editMode(editMode) {
      if (!this.$el) return
      if (editMode) this.setup()
      else this.clean()
    },
  },
  methods: {
    setup() {},
    clean() {},
  },
  mounted() {
    if (this.editMode) this.setup()
  },
  beforeDestroy() {
    this.clean()
  },
}

export { section, changeFeed }
