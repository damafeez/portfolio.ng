import _ from 'lodash'
import schema from '@/schema/somolu'

export default ({ store }, inject) => {
  inject('schema', _.merge(store.state.schema, schema))
}
