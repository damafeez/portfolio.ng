import _ from 'lodash'
import { EDIT_SCHEMA } from './_mutationNames'

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
})

export const mutations = {
  [EDIT_SCHEMA](state, [accessor, value]) {
    _.set(state, accessor, value)
  },
}
