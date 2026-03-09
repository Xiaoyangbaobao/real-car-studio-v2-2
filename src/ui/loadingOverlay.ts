export function createLoadingOverlay() {
  const overlay = document.querySelector<HTMLElement>('[data-loading-overlay]')
  const text = document.querySelector<HTMLElement>('[data-loading-text]')

  return {
    setText(value: string) {
      if (text) text.textContent = value
    },
    hide() {
      overlay?.classList.add('is-hidden')
    }
  }
}
