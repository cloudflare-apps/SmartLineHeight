(function () {
  if (!window.addEventListener) return // Check for IE9+

  const PHI = (1 + Math.sqrt(5)) / 2 // 1.61803398874989 or "The Golden Ratio"
  const PHI_PRIME = 1 / (2 * PHI)

  function calcBaseLineHeight(fontSize, width) {
    const result = PHI - PHI_PRIME * (1 - (width / Math.pow(fontSize * PHI, 2)))

    return Math.round(result * fontSize) / fontSize // Lower precision.
  }

  let options = INSTALL_OPTIONS

  function updateElements() {
    // TODO reset line height here or in window.INSTALL_SCOPE

    const {location} = options

    const elements = Array.from(document.querySelectorAll(location))

    elements.forEach($ => {
      const fontSize = document.defaultView.getComputedStyle($).fontSize.split("p")[0]

      const fontWidth = $.clientWidth

      $.style.lineHeight = calcBaseLineHeight(fontSize, fontWidth)
    })
  }

  function bootstrap() {
    updateElements()
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", bootstrap)
    document.addEventListener("DOMContentLoaded", bootstrap)
  }
  else {
    bootstrap()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions
      // TODO reset line height here or in updateElements
      updateElements()
    }
  }
}())
