const isFalsy = val => {
  if (
    val === null ||
    (Array.isArray(val) && !val.length) ||
    typeof val === 'object'
  )
    return true
  return !val
}

const createDefaults = (obj1 = {}, obj2 = {}) => {
  return new Proxy(obj2, {
    get(target, key) {
      return isFalsy(obj1[key]) ? target[key] : obj1[key]
    },
  })
}

export { createDefaults, isFalsy }
