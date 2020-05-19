import Vue from 'vue'

Vue.directive('schema', {
  bind(el, { arg = 'text', value }) {
    if (arg === 'text') {
      el.setAttribute('p-editable', '')

      // https://stackoverflow.com/a/9258256
      if (typeof el.onblur !== 'function') {
        el.onfocus = function() {
          this.data_orig = this.innerHTML
        }
        el.onblur = function() {
          if (this.innerHTML !== this.data_orig) console.log(this.innerHTML)
          delete this.data_orig
        }
      }
    }
  },
  update(el, { arg, value }) {
    console.log(value)
  },
})
