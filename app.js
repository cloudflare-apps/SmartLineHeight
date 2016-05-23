(function () {
  if (!window.addEventListener) return // Check for IE9+

  const PHI = (1 + Math.sqrt(5)) / 2 // 1.61803398874989 or "The Golden Ratio"
  const PHI_PRIME = 1 / (2 * PHI)
  const UPDATE_DELAY = 2000

  let previousArray = []
  let updateTimeout

  function calcBaseLineHeight(fontSize, width) {
    const result = PHI - PHI_PRIME * (1 - (width / Math.pow(fontSize * PHI, 2)))

    return Math.round(result * fontSize) / fontSize // Lower precision.
  }

  let options = INSTALL_OPTIONS

  function updateElements() {
    previousArray = []
    const {location} = options

    const elements = Array.from(document.querySelectorAll(location))

    elements.forEach($ => {
      const fontSize = document.defaultView.getComputedStyle($).fontSize.split("p")[0]
      // TODO What if fontsize is in em's?
      const object = {
        type: $,
        lineHeight: document.defaultView.getComputedStyle($).lineHeight
      }

      previousArray.push(object)

      const fontWidth = $.clientWidth

      $.style.lineHeight = calcBaseLineHeight(fontSize, fontWidth)
    })
  }

  function resetLineHeight() {
    previousArray.forEach($ => {
      $.type.style.lineHeight = $.lineHeight
    })
    updateElements()
  }

  if (document.readyState === "loading") {
    // TODO fix bootstrap setup
    window.addEventListener("load", updateElements)
  }
  else {
    updateElements()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      clearTimeout(updateTimeout)
      options = nextOptions
      // TODO set a timeout that blurs the screen and doesn't reload until x seconds
      updateTimeout = setTimeout(resetLineHeight, UPDATE_DELAY)
    }
  }
}())
