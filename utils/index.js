import { merge } from 'lodash'
import defaultSchema from '@/schema/index.json'

export function getSchema(name, merger = {}) {
  let schema = {}
  try {
    schema = require(`@/schema/${name}.json`)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`unable to get schema ${name}`)
  }

  return merge({ _meta: { name } }, merger, schema, defaultSchema)
}
