import { section } from '~/mixins'

export function getSchema(name) {
  try {
    return require(`~/schema/${name}.json`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`unable to get schema ${name}`)
  }
}

export function wait(timeout) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout))
}

export function loadSections() {
  const requireComponent = require.context(
    `~/components/sections`,
    true,
    // The regular expression used to match vue component filenames
    /\.vue$/,
  )

  return requireComponent.keys().reduce((acc, fileName) => {
    const file = requireComponent(fileName)
    const component = file.default || file
    component.mixins = [...(component.mixins || []), section]
    const splitted = fileName.split('/')
    const name = splitted[splitted.length - 1].split('.vue')[0]
    acc[name] = component
    return acc
  }, {})
}
