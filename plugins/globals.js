import schema from '@/schema/somolu'
import { createDefaults } from '@/utils'

export default ({ store }, inject) => {
  inject(
    'schema',
    Object.entries(schema).reduce((acc, [key, value]) => {
      acc[key] = createDefaults(store.state.schema[key], value)
      return acc
    }, {}),
  )
}
