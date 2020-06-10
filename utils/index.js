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

  return merge(defaultSchema, schema, merger, { _meta: { name } })
}
// TODO: Handle this more elegantly by using a multi-edit component
export function getEditContainer(el) {
  const { parentNode } = el
  let editContainer = parentNode.querySelector('[p-edit-container]')
  if (!editContainer) {
    editContainer = document.createElement('div')
    editContainer.setAttribute('p-edit-container', '')
    editContainer.setAttribute('tabindex', '-1')
    editContainer.style.display = 'none'
    editContainer.style.outline = 'none'

    editContainer.addEventListener('focus', containerFocus, { capture: true })
    editContainer.addEventListener('blur', containerBlur, { capture: true })

    el.addEventListener('focus', triggerFocus)
    el.addEventListener('blur', triggerBlur)

    parentNode.insertBefore(editContainer, el)
  }
  return editContainer
}

export function setupEditContainerListeners(el) {
  const { parentNode } = el
  const editContainer = parentNode.querySelector('[p-edit-container]')
  if (editContainer && el) {
    editContainer.addEventListener('focus', containerFocus, { capture: true })
    editContainer.addEventListener('blur', containerBlur, { capture: true })

    el.addEventListener('focus', triggerFocus)
    el.addEventListener('blur', triggerBlur)
  }
}

export function removeEditContainerListeners(el) {
  if (!el || !el.parentNode) return
  const editContainer = el.parentNode.querySelector('[p-edit-container]')

  pickerFocused = false
  triggerFocused = false

  editContainer.removeEventListener('focus', containerFocus, { capture: true })
  editContainer.removeEventListener('blur', containerBlur, { capture: true })

  el.removeEventListener('focus', triggerFocus)
  el.removeEventListener('blur', triggerBlur)
  return true
}

export const wait = timeout =>
  new Promise(resolve => setTimeout(() => resolve(), timeout))

// local helpers

let pickerFocused = false
let triggerFocused = false

function containerFocus() {
  pickerFocused = true
}
async function containerBlur() {
  pickerFocused = false
  await wait(100)

  handleEditFocus(this)
}
function triggerFocus() {
  triggerFocused = true
  this.parentNode &&
    handleEditFocus(this.parentNode.querySelector('[p-edit-container]'))
}
async function triggerBlur() {
  triggerFocused = false
  await wait(100)
  this.parentNode &&
    handleEditFocus(this.parentNode.querySelector('[p-edit-container]'))
}
function handleEditFocus(container) {
  if (!container) return
  if (triggerFocused || pickerFocused) container.style.display = null
  else container.style.display = 'none'
}
