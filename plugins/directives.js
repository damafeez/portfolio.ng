import Vue from 'vue'
import { isEmpty } from 'lodash'
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
      if (store.getters.editMode) setupSchema(el, options, vnode)
      const unwatch = store.watch(
        (state, getters) => getters.editMode,
        editMode => {
          if (editMode) {
            setupSchema(el, options, vnode)
          } else {
            removeSchemaListeners(el, options.modifiers)
          }
        },
      )
      el.__editMode_unwatch__ = unwatch
    },

    update(el, options, vnode) {
      const {
        oldValue: [oldAddress],
        value: [address],
      } = options
      // setup schema again if address has changed
      if (store.getters.editMode && address !== oldAddress) {
        removeSchemaListeners(el, options.modifiers)
        setupSchema(el, options, vnode)
      }
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

function setupSchema(el, { modifiers, value: [address] }, vnode) {
  const { text, bg, img } = modifiers
  // default to text if no modifiers
  if (text || isEmpty(modifiers)) {
    el.setAttribute('contenteditable', '')
    setupChangeFeed(el)
    el.pchange = pChange(address, vnode)
  } else if (bg || img) {
    el.classList.add('stop-cursor-propagation')
    el.__dblclick = imgUpload(address, vnode)
    el.addEventListener('dblclick', el.__dblclick)
  }
}
function removeSchemaListeners(el, modifiers) {
  const { text, bg, img } = modifiers
  if (text || isEmpty(modifiers)) {
    el.pchange = function() {}
    el.removeAttribute('contenteditable')
  } else if (bg || img) {
    el.removeEventListener('dblclick', el.__dblclick)
    el.classList.remove('stop-cursor-propagation')
  }
}
