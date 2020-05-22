import Vue from 'vue'
import _ from 'lodash'
import {
  TEMPLATE_EDITOR_UPLOAD_IMAGE,
  TEMPLATE_EDITOR_TEXT_EDIT,
} from '@/constants'

const pChange = (address, vnode) => text =>
  vnode.context.$eventBus.$emit(TEMPLATE_EDITOR_TEXT_EDIT, [address, text])

const imgUpload = (address, vnode) => e => {
  // only allow current element to trigger
  if (e.target === e.currentTarget)
    vnode.context.$eventBus.$emit(TEMPLATE_EDITOR_UPLOAD_IMAGE, address)
}
export default ({ store }) => {
  Vue.directive('schema', {
    bind(el, options, vnode) {
      if (store.state.editMode) setupSchema(el, options, vnode, true)
      const unwatch = store.watch(
        (state, getters) => getters.editMode,
        editMode => {
          if (editMode) {
            setupSchema(el, options, vnode, editMode)
          } else {
            removeSchemaListeners(el, options.modifiers)
          }
        },
      )
      el.__editMode_unwatch__ = unwatch
    },

    unbind(el, options) {
      removeSchemaListeners(el, options.modifiers)
      el.__editMode_unwatch__ && el.__editMode_unwatch__()
    },
  })
}

// functions
function setupChangeFeed(el) {
  if (el.onblur !== 'function') {
    // https://stackoverflow.com/a/9258256
    el.onfocus = function() {
      this.data_orig = this.innerHTML
    }
    el.onblur = function() {
      if (this.innerHTML !== this.data_orig)
        this.pchange(this.textContent.trim())
      delete this.data_orig
    }
  }
}

function setupSchema(el, { modifiers, value: [address] }, vnode, editMode) {
  const { text, bg, img } = modifiers
  // default to text if no modifiers
  if (text || _.isEmpty(modifiers)) {
    el.setAttribute('contenteditable', '')
    setupChangeFeed(el)
    el.pchange = pChange(address, vnode)
  } else if (bg || img) {
    el.classList.add('stop-cursor-propagation')
    el.addEventListener('dblclick', imgUpload(address, vnode))
  }
}
function removeSchemaListeners(el, modifiers) {
  const { text, bg, img } = modifiers

  if (text || _.isEmpty(modifiers)) {
    el.pchange = function() {}
    el.removeAttribute('contenteditable')
  } else if (bg || img) {
    el.removeEventListener('dblclick', imgUpload())
    el.classList.remove('stop-cursor-propagation')
  }
}
