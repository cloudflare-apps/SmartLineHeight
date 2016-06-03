(function () {
  if (!window.addEventListener) return // Check for IE9+

  const PHI = (1 + Math.sqrt(5)) / 2 // 1.61803398874989 or "The Golden Ratio"
  const PHI_PRIME = 1 / (2 * PHI)
  const SELECTORS = "address, blockquote, footer, h1, h2, h3, h4, h5, h6, header, li, q, p"

  const styleToggle = document.createElement("eager-style-toggle")
  const loadingStyle = document.createElement("style")

  styleToggle.title = "Toggle preview"

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

  function updateToggleState() {
    styleToggle.setAttribute("data-state", previousElements.length ? "enabled" : "disabled")
  }

  function reset() {
    previousElements.forEach(({element, lineHeight}) => element.style.lineHeight = lineHeight)
    previousElements = []

    updateToggleState()
  }

  function updateElements() {
    const elements = Array.prototype.slice.call(document.querySelectorAll(SELECTORS))

    elements.forEach(element => {
      const fontSize = parseFloat(document.defaultView.getComputedStyle(element).fontSize)

      if (INSTALL_ID === "preview") {
        previousElements.push({element, lineHeight: element.style.lineHeight})
      }

      element.style.lineHeight = calcBaseLineHeight(fontSize, element.clientWidth)
    })

    if (INSTALL_ID === "preview") updateToggleState()

    loadingStyle.parentNode && loadingStyle.parentNode.removeChild(loadingStyle)
  }

  function bootstrap() {
    if (INSTALL_ID === "preview") {
      styleToggle.addEventListener("click", () => {
        if (previousElements.length) reset()
        else updateElements()
      })

      updateToggleState()

      document.body.appendChild(styleToggle)
    }

    updateElements()
  }

  document.head.appendChild(loadingStyle)

  if (document.readyState === "loading") {
    window.addEventListener("load", bootstrap)
  }
  else {
    bootstrap()
  }
}())
