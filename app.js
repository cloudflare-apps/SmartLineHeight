(function () {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS

  function updateElements() {
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElements)
  }
  else {
    updateElements()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions
      updateElements()
    }
  }
}())
