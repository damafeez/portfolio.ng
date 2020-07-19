import { intersection, eq } from 'lodash'

export function getSchema(name) {
  try {
    return require(`~/schema/${name}.json`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`unable to get schema ${name}`)
  }
}

export function getSchemaNames() {
  return require
    .context(
      // load files within schema folder
      '../schema/',
      // Whether or not to look in subfolders
      false,
      // The regular expression used to match vue component filenames
      /\.json$/,
    )
    .keys()
    .filter(name => name !== './index.json')
    .map(name => name.match(/\.\/([\w-]+)(?=.json$)/)[1])
}

export function wait(timeout = 100) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout))
}

export function loadSection(name) {
  const component = require(`~/components/sections/${name}.vue`)
  return component.default || component
}

export function loadSections() {
  return require.context(
    `~/components/sections`,
    // don't look in subfolders
    false,
    /\.vue$/,
  )
}

export function getSectionsByTags(tags) {
  const sections = loadSections()
  const [_, ...withoutThemeName] = tags

  return sections
    .keys()
    .map(fileName => {
      const file = sections(fileName)
      const component = file.default || file
      if (
        intersection(component.tags, withoutThemeName).length /
          withoutThemeName.length >
        0.5
      )
        return {
          name: fileName.match(/([\w-]+)(?=.vue$)/)[0],
          description: component.description,
          tags: component.tags,
          active: eq(component.tags, tags),
        }
    })
    .filter(Boolean)
}
