// https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
const KNOWN_TEXT_CONTAINERS = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']

const getTextContainers = root => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (['STYLE', 'SCRIPT'].includes(node.nodeName))
        return NodeFilter.FILTER_REJECT
      if (
        KNOWN_TEXT_CONTAINERS.includes(node.nodeName) ||
        (node.textContent.trim() !== '' &&
          node.textContent.trim() === node.innerHTML.trim())
      )
        return NodeFilter.FILTER_ACCEPT

      return NodeFilter.FILTER_SKIP
    },
  })

  const nodes = []
  let n
  while ((n = walker.nextNode())) {
    nodes.push(n)
  }

  return nodes
}

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

export { getTextContainers, createDefaults, isFalsy }
