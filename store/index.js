import { SET_EDIT_MODE } from './_mutationNames'

export const state = () => ({
  editMode: false,
})

export const mutations = {
  [SET_EDIT_MODE](state, value) {
    state.editMode = value
  },
}
export const actions = {
  setEditMode({ commit }, payload) {
    commit(SET_EDIT_MODE, payload)
  },
}
