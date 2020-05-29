import { set, merge } from 'lodash'
import { SET_SCHEMA } from '@/constants'

export const state = () => ({
  schema: {},
  updates: {},
})

export const mutations = {
  [SET_SCHEMA](state, schema) {
    state.schema = merge({}, state.schema, schema)
  },
}

export const actions = {
  editSchema({ commit, rootState }, [address, value]) {
    if (rootState.mode === 'edit') {
      const update = set({}, address, value)
      commit(SET_SCHEMA, update)
    }
  },
  setSchema({ commit }, payload) {
    commit(SET_SCHEMA, payload)
  },
}

export const getters = {
  schema: state => state.schema,
  templateName: (state, { schema }) => schema._meta.name,
}
