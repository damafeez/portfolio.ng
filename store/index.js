import { SET_MODE } from '@/constants'

export const state = () => ({
  mode: 'portfolio',
})

export const mutations = {
  [SET_MODE](state, value) {
    state.mode = value
  },
}

export const actions = {
  setMode({ commit }, payload) {
    if (['portfolio', 'template', 'edit'].includes(payload))
      commit(SET_MODE, payload)
  },
}

export const getters = {
  portfolioMode: state => state.mode === 'portfolio',
  editMode: state => state.mode === 'edit',
  templateMode: state => ['template', 'edit'].includes(state.mode),
}
