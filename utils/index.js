import { intersection, eq } from 'lodash'

export function getSchema(name) {
  try {
    return require(`~/schema/${name}.json`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`unable to get schema ${name}`)
  }
}

export function wait(timeout = 100) {
  return new Promise(resolve => setTimeout(() => resolve(), timeout))
}

export function loadSections() {
  return require.context(
    `~/components/sections`,
    // don't look in subfolders
    false,
    /\.vue$/,
  )
}

export function loadSectionNamesByTags(tags) {
  const sections = loadSections()

  return sections
    .keys()
    .map(fileName => {
      const file = sections(fileName)
      const component = file.default || file

      if (intersection(component.tags, tags).length > 2)
        return {
          name: fileName.match(/([\w-]+)(?=.vue$)/)[0],
          description: component.description,
          tags: component.tags,
          active: eq(component.tags, tags),
        }
    })
    .filter(Boolean)
}
