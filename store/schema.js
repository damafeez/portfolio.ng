import _ from 'lodash'
import { EDIT_SCHEMA, SET_SCHEMA } from '@/constants'

export const state = () => ({
  profile: {
    name: '',
    description: '',
    images: [],
  },
  about: {
    intro: '',
    description: '',
  },
  cta: [],
  social: {
    description: '',
    links: [],
  },
  wiw: [],
  _meta: {},
})

export const mutations = {
  [EDIT_SCHEMA](state, [accessor, value]) {
    _.set(state, accessor, value)
  },
  [SET_SCHEMA](state, schema) {
    state = _.merge(state, schema)
  },
}

export const actions = {
  editSchema({ commit, rootState }, payload) {
    if (rootState.mode === 'edit') commit(EDIT_SCHEMA, payload)
  },
  setSchema({ commit }, payload) {
    commit(SET_SCHEMA, payload)
  },
}

export const getters = {
  templateName: state => state._meta.name,
}
