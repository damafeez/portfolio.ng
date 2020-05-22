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
      // bind schema only in templateMode
      if (store.getters.templateMode) {
        if (store.state.editMode) setupSchema(el, options, vnode, true)
        const unwatch = store.watch(
          (state, getters) => getters.editMode,
          editMode => {
            if (editMode) {
              setupSchema(el, options, vnode, editMode)
            } else {
              destroySchema(el)
            }
          },
        )
        el.__editMode_unwatch__ = unwatch
      }
    },

    unbind(el) {
      el.__editMode_unwatch__ && el.__editMode_unwatch__()
    },
  })
}
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

function setEditable(el, editable) {
  if (editable) el.setAttribute('contenteditable', '')
  else el.removeAttribute('contenteditable')
}

function setupSchema(el, { modifiers, value: [address] }, vnode, editMode) {
  const { text, bg, img } = modifiers
  // default to text if no modifiers
  if (text || _.isEmpty(modifiers)) {
    setEditable(el, editMode)
    setupChangeFeed(el)
    el.pchange = pChange(address, vnode)
  } else if (bg || img) {
    el.style.cursor = 'pointer'
    el.classList.add('stop-cursor-propagation')
    el.addEventListener('dblclick', imgUpload(address, vnode))
  }
}
function destroySchema(el, modifiers) {
  const { text, bg, img } = modifiers

  if (text || _.isEmpty(modifiers)) {
    el.pchange = function() {}
  } else if (bg || img) {
    el.removeEventListener('dblclick', imgUpload())
  }
}
