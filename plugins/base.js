import Vue from 'vue'

const requireComponent = require.context(
  // load files within ../components/base/ folder
  '../components/base/',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match vue component filenames
  /\.vue$/,
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const required = requireComponent(fileName)
  const component = required.default || required
  if (!component.name) throw new Error('base components should have a name')
  // Register component globally
  Vue.component(component.name, resolve => resolve(component))
})
