import { mapGetters } from 'vuex'
const section = {
  computed: {
    ...mapGetters({
      schema: 'document/schema',
    }),
  },
}
const changeFeed = {
  props: {
    tag: String,
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
    }),
    tagName() {
      return this.tag || this.$vnode.data.tag
    },
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

export { section, changeFeed }
