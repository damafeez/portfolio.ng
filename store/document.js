import { set, get, merge } from 'lodash'
import { SET_SCHEMA, SCHEMA_LIST_ADD_ONE } from '@/constants'

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
    list.push(list[list.length - 1])
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
  schemaListAddOne({ commit, rootState }, address) {
    commit(SCHEMA_LIST_ADD_ONE, address)
  },
}

export const getters = {
  schema: state => state.schema,
  templateName: (state, { schema }) => schema._meta.name,
}
