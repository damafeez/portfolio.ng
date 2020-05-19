import Vue from 'vue'

Vue.directive('schema-text', {
  inserted(el, { value }) {
    el.textContent = value
  },
})
