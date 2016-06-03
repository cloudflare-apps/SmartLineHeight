(function () {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS

  const PHI = (1 + Math.sqrt(5)) / 2 // 1.61803398874989 or "The Golden Ratio"
  const PHI_PRIME = 1 / (2 * PHI)
  const SELECTORS = "address, blockquote, footer, h1, h2, h3, h4, h5, h6, header, li, q, p"

  const loadingStyle = document.createElement("style")

  loadingStyle.innerHTML = `
    body, body * {
      color: transparent !important;
    }
  `

  let previousElements = []

  function calcBaseLineHeight(fontSize, width) {
    const result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2))

    return Math.round(result * fontSize) / fontSize // Lower precision.
  }

  function reset() {
    previousElements.forEach(({element, lineHeight}) => element.style.lineHeight = lineHeight)
    previousElements = []
  }

  function updateElements() {
    if (INSTALL_ID === "preview" && !options.showPreview) {
      reset()
      return
    }

    const elements = Array.prototype.slice.call(document.querySelectorAll(SELECTORS))

    elements.forEach(element => {
      const fontSize = parseFloat(document.defaultView.getComputedStyle(element).fontSize)

      if (INSTALL_ID === "preview") {
        previousElements.push({element, lineHeight: element.style.lineHeight})
      }

      element.style.lineHeight = calcBaseLineHeight(fontSize, element.clientWidth)
    })


    loadingStyle.parentNode && loadingStyle.parentNode.removeChild(loadingStyle)
  }

  document.head.appendChild(loadingStyle)

  if (document.readyState === "loading") {
    window.addEventListener("load", updateElements)
  }
  else {
    updateElements()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      reset()
      updateElements()
    }
  }
}())
