import Vue from 'vue'
import { TEMPLATE_EDITOR_UPLOAD_IMAGE } from '@/constants'

export default ({ store }) => {
  const pChange = address => text =>
    store.dispatch('schema/editSchema', [address, text])

  Vue.directive('schema', {
    bind(el, { arg = 'text', value: [address, editMode] }) {
      if (arg === 'text') {
        setEditable(el, editMode)
        setupChangeFeed(el)
      }
      if (editMode) el.pchange = pChange(address)
    },
    update(
      el,
      { arg = 'text', oldValue: [, oldEditMode], value: [address, editMode] },
      vnode,
    ) {
      if (oldEditMode !== editMode) {
        if (arg === 'text') {
          setEditable(el, editMode)
          // add change listener if editMode recently became true
          if (editMode) el.pchange = pChange(address)
          // set listener to an empty function
          else el.pchange = function() {}
        } else if (arg === 'bg' || arg === 'img') {
          el.style.cursor = 'pointer'
          el.classList.add('stop-cursor-propagation')
          el.addEventListener('dblclick', function(e) {
            // only allow current element to trigger
            if (e.target === e.currentTarget)
              vnode.context.$eventBus.$emit(
                TEMPLATE_EDITOR_UPLOAD_IMAGE,
                address,
              )
          })
        }
      }
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
