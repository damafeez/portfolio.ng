import Vue from 'vue'
import IconBase from 'feather-icons-vue'

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$escapeHTML = function(unsafe, withNewLine = true) {
  const safe = unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
  return withNewLine ? safe.replace(/\n/g, '<br />') : safe
}

Vue.use(IconBase)
