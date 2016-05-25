(function () {
  if (!window.addEventListener) return // Check for IE9+

  const PHI = (1 + Math.sqrt(5)) / 2 // 1.61803398874989 or "The Golden Ratio"
  const PHI_PRIME = 1 / (2 * PHI)

  let previousElements = []
  let options = INSTALL_OPTIONS

  function calcBaseLineHeight(fontSize, width) {
    const result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2))

    return Math.round(result * fontSize) / fontSize // Lower precision.
  }

  function updateElements() {
    const elements = options.selectors
      .map(entry => document.querySelectorAll(entry.selector))
      .reduce((elements, subElements) => {
        elements.push(...subElements)

        return elements
      }, [])

    elements.forEach(element => {
      const fontSize = parseFloat(document.defaultView.getComputedStyle(element).fontSize)

      if (INSTALL_ID === "preview") {
        previousElements.push({element, lineHeight: element.style.lineHeight})
      }

      element.style.lineHeight = calcBaseLineHeight(fontSize, element.clientWidth)
    })

    document.body.setAttribute("data-eager-readable-state", "loaded")
  }

  function bootstrap() {
    document.body.setAttribute("data-eager-readable-state", "loading")
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", updateElements)
    document.addEventListener("DOMContentLoaded", bootstrap)
  }
  else {
    bootstrap()
    updateElements()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      previousElements.forEach(({element, lineHeight}) => element.style.lineHeight = lineHeight)
      previousElements = []

      updateElements()
    }
  }
}())
