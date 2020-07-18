<template>
  <ul class="items">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="relative items-li"
      :class="liClassList"
    >
      <span
        v-if="editMode"
        class="items-li_close btn-hover absolute z-50 text-sm cursor-pointer text-white rounded-full bg-red-700 flex-center"
        @click="
          remove({ address, index })
          $emit('remove', { address, index })
        "
        ><icon-base name="x"
      /></span>
      <slot
        name="item"
        :item="item"
        :index="index"
        :address="`${address}[${index}]`"
      />
    </li>
    <li v-if="editMode">
      <span
        class="add-button cursor-pointer btn-hover rounded-full text-on-tertiary flex-center"
        :class="buttonClassList"
        @click="
          schemaListAdd({ address, items: [itemToAdd] })
          $emit('addOne', address)
        "
      >
        <icon-base name="plus" />
      </span>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { get, cloneDeep } from 'lodash'
export default {
  // TODO: use random ids for all keys
  name: 'ItemList',
  props: {
    address: {
      type: String,
      required: true,
    },
    buttonClassList: { type: String, default: '' },
    liClassList: { type: String, default: '' },
  },
  data() {
    return {
      itemToAdd: null,
    }
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
  mounted(editMode) {
    this.itemToAdd = cloneDeep((this.list || [])[0])
  },
  methods: {
    ...mapActions({
      schemaListAdd: 'document/schemaListAdd',
      remove: 'document/schemaListRemoveOne',
    }),
  },
}
</script>
<style lang="scss" scoped>
.items {
  .add-button {
    &:not(.no-bg) {
      @apply bg-tertiary;
      width: 2.5em;
      height: 2.5em;
    }
  }
  &-li {
    &:not(:hover) {
      .items-li_close {
        pointer-events: none;
        opacity: 0;
      }
    }
    &_close {
      width: 1.5em;
      height: 1.5em;
      top: -0.5em;
      right: -0.5em;
    }
  }
}
</style>
