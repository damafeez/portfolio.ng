import { set, get, merge, cloneDeep } from 'lodash'
import {
  SET_SCHEMA,
  SCHEMA_LIST_ADD_ONE,
  SCHEMA_LIST_REMOVE_ONE,
} from '@/constants'

export const state = () => ({
  schema: {},
  updates: {},
})

export const mutations = {
  [SET_SCHEMA](state, schema) {
    state.schema = merge({}, state.schema, schema)
  },
  [SCHEMA_LIST_ADD_ONE](state, address) {
    const list = get(state.schema, address)
    if (!Array.isArray(list))
      throw new Error(`Error adding item. Invalid address ${address}`)

    const last = list[list.length - 1]
    const newItem = cloneDeep(last)

    newItem !== undefined && list.push(newItem)
  },
  [SCHEMA_LIST_REMOVE_ONE](state, { address, index }) {
    const list = get(state.schema, address)
    if (!Array.isArray(list))
      throw new Error(`Error removing item. Invalid address ${address}`)

    list.splice(index, 1)
  },
}

export const actions = {
  setSchema({ commit }, payload) {
    commit(SET_SCHEMA, payload)
  },
  editSchema({ commit, rootState }, [address, value]) {
    if (rootState.mode === 'edit') {
      const update = set({}, address, value)
      commit(SET_SCHEMA, update)
    }
  },
  schemaListAddOne({ commit }, payload) {
    commit(SCHEMA_LIST_ADD_ONE, payload)
  },
  schemaListRemoveOne({ commit }, payload) {
    commit(SCHEMA_LIST_REMOVE_ONE, payload)
  },
}

export const getters = {
  schema: state => state.schema,
  templateName: (state, { schema }) => schema._meta.name,
}
