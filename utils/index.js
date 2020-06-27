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
