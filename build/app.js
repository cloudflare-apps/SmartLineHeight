"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var options = INSTALL_OPTIONS;

  var PHI = (1 + Math.sqrt(5)) / 2; // 1.61803398874989 or "The Golden Ratio"
  var PHI_PRIME = 1 / (2 * PHI);
  var SELECTORS = "address, blockquote, footer, h1, h2, h3, h4, h5, h6, header, li, q, p";

  var loadingStyle = document.createElement("style");

  loadingStyle.innerHTML = "\n    body, body * {\n      color: transparent !important;\n    }\n  ";

  var previousElements = [];

  function calcBaseLineHeight(fontSize, width) {
    var result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2));

    return Math.round(result * fontSize) / fontSize; // Lower precision.
  }

  function reset() {
    previousElements.forEach(function (_ref) {
      var element = _ref.element;
      var lineHeight = _ref.lineHeight;
      return element.style.lineHeight = lineHeight;
    });
    previousElements = [];
  }

  function updateElements() {
    if (INSTALL_ID === "preview" && !options.showPreview) {
      reset();
      return;
    }

    var elements = Array.prototype.slice.call(document.querySelectorAll(SELECTORS));

    elements.forEach(function (element) {
      var fontSize = parseFloat(document.defaultView.getComputedStyle(element).fontSize);

      if (INSTALL_ID === "preview") {
        previousElements.push({ element: element, lineHeight: element.style.lineHeight });
      }

      element.style.lineHeight = calcBaseLineHeight(fontSize, element.clientWidth);
    });

    loadingStyle.parentNode && loadingStyle.parentNode.removeChild(loadingStyle);
  }

  document.head.appendChild(loadingStyle);

  if (document.readyState === "loading") {
    window.addEventListener("load", updateElements);
  } else {
    updateElements();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;

      reset();
      updateElements();
    }
  };
})();