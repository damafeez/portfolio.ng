import { set, get, merge, without } from 'lodash'
import {
  SET_SCHEMA,
  SCHEMA_LIST_ADD,
  SCHEMA_LIST_REMOVE_ONE,
  CHANGE_THEME_INDEX,
} from '~/constants'

export const state = () => ({
  schema: {},
  updates: {},
  currentThemeIndex: 0,
})

export const mutations = {
  [SET_SCHEMA](state, schema) {
    state.schema = merge({}, state.schema, schema)
  },
  [SCHEMA_LIST_ADD](state, { address, items = [] }) {
    const list = get(state.schema, address)
    if (!Array.isArray(list))
      throw new Error(`Error adding item. Invalid address ${address}`)
    if (!Array.isArray(items))
      throw new Error(`Error adding items. ${items} should be an Array`)
    list.push(...items)
  },
  [SCHEMA_LIST_REMOVE_ONE](state, { address, index }) {
    const list = get(state.schema, address)
    if (!Array.isArray(list))
      throw new Error(`Error removing item. Invalid address ${address}`)

    list.splice(index, 1)
  },
  [CHANGE_THEME_INDEX](state) {
    state.currentThemeIndex =
      state.currentThemeIndex <
      Object.keys(state.schema._meta.themes).length - 1
        ? state.currentThemeIndex + 1
        : 0
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
  schemaListAdd({ commit }, payload) {
    commit(SCHEMA_LIST_ADD, payload)
  },
  schemaListRemoveOne({ commit }, payload) {
    commit(SCHEMA_LIST_REMOVE_ONE, payload)
  },
  setSections({ dispatch }, sections) {
    dispatch('editSchema', ['_meta.sections', sections])
  },
  setSection({ dispatch }, { index, value }) {
    dispatch('editSchema', [`_meta.sections[${index}]`, value])
  },
  changeThemeIndex({ commit }) {
    commit(CHANGE_THEME_INDEX)
  },
}

export const getters = {
  schema: state => state.schema,
  templateName: (state, { schema }) => schema._meta.name,
  themeNames: (state, { schema }) => {
    const modeNames = Object.keys(schema._meta.themes)
    const preferredCurrent = schema._meta.currentMode
    return preferredCurrent
      ? [preferredCurrent, ...without(modeNames, preferredCurrent)]
      : modeNames
  },
  currentThemeName: (state, { themeNames }) =>
    themeNames[state.currentThemeIndex],
  currentTheme: (state, { currentThemeName }) =>
    state.schema._meta.themes[currentThemeName],
}
