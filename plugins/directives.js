import Vue from 'vue'

function setupChangeFeed(el) {
  if (el.onblur !== 'function') {
    // https://stackoverflow.com/a/9258256
    el.onfocus = function() {
      this.data_orig = this.innerHTML
    }
    el.onblur = function() {
      if (this.innerHTML !== this.data_orig) this.pchange()
      delete this.data_orig
    }
  }
}

export default ({ store }) => {
  Vue.directive('schema', {
    bind(el, { arg = 'text', value }) {
      if (arg === 'text') {
        el.setAttribute('p-editable', '')
        setupChangeFeed(el)

        el.pchange = function() {
          if (!store.state.editMode) return
          store.commit('schema/EDIT_SCHEMA', [value, this.textContent.trim()])
        }
      }
    },
  })
}
