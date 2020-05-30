<template>
  <ul>
    <slot :list="list" />
    <li v-if="editMode">
      <span
        class="add-button cursor-pointer btn-hover rounded-full text-on-tertiary flex-center"
        :class="addButtonClassList"
        @click="addOne(address)"
      >
        <icon-base name="plus" />
      </span>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from 'lodash'
export default {
  name: 'ItemList',
  props: {
    address: {
      type: String,
      required: true,
    },
    addButtonClassList: { type: String, default: '' },
  },
  computed: {
    ...mapGetters({
      schema: 'document/schema',
      editMode: 'editMode',
    }),
    list() {
      // TODO: add random id to list
      const list = get(this.schema, this.address)
      if (!Array.isArray(list))
        throw new Error(`address: ${this.address} should point to an array`)
      return list
    },
  },
  methods: {
    ...mapActions({
      addOne: 'document/schemaListAddOne',
    }),
  },
}
</script>
<style lang="scss" scoped>
.add-button {
  &:not(.no-bg) {
    @apply bg-tertiary;
    width: 2.5em;
    height: 2.5em;
  }
}
</style>
