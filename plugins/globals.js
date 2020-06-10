import Vue from 'vue'

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$escapeHTML = function(unsafe, allowBr = true) {
  const safe = unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
  return allowBr ? safe.replace(/\n/g, '<br />') : safe
}
