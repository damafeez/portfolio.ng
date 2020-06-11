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
      if (editMode) this.setup()
      else this.tearDown()
    },
  },
  methods: {
    setup() {},
    tearDown() {},
  },
  mounted() {
    if (this.editMode) this.setup()
  },
  beforeDestroy() {
    this.tearDown()
  },
}

const changeFeedProps = {
  props: {
    multiple: false,
  },
}

export { section, changeFeed, changeFeedProps }
