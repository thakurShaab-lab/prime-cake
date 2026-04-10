export const eventBus = {
  emit(event, data) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }))
  },
  on(event, callback) {
    window.addEventListener(event, callback)
  },
  off(event, callback) {
    window.removeEventListener(event, callback)
  },
}