import Vue from 'vue'

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
    ) {
      if (oldEditMode !== editMode && arg === 'text') {
        setEditable(el, editMode)
        if (editMode) el.pchange = pChange(address)
        else el.pchange = function() {}
      }
    },
  })
}
