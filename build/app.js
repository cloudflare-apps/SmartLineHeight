"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var PHI = (1 + Math.sqrt(5)) / 2; // 1.61803398874989 or "The Golden Ratio"
  var PHI_PRIME = 1 / (2 * PHI);

  var previousElements = [];
  var options = INSTALL_OPTIONS;

  function calcBaseLineHeight(fontSize, width) {
    var result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2));

    return Math.round(result * fontSize) / fontSize; // Lower precision.
  }

  function updateElements() {
    var elements = options.selectors.map(function (entry) {
      return document.querySelectorAll(entry.selector);
    }).reduce(function (elements, subElements) {
      elements.push.apply(elements, _toConsumableArray(subElements));

      return elements;
    }, []);

    elements.forEach(function (element) {
      var fontSize = parseFloat(document.defaultView.getComputedStyle(element).fontSize);

      if (INSTALL_ID === "preview") {
        previousElements.push({ element: element, lineHeight: element.style.lineHeight });
      }

      element.style.lineHeight = calcBaseLineHeight(fontSize, element.clientWidth);
    });

    document.body.setAttribute("data-eager-readable-state", "loaded");
  }

  function bootstrap() {
    document.body.setAttribute("data-eager-readable-state", "loading");
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", updateElements);
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
    updateElements();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;

      previousElements.forEach(function (_ref) {
        var element = _ref.element;
        var lineHeight = _ref.lineHeight;
        return element.style.lineHeight = lineHeight;
      });
      previousElements = [];

      updateElements();
    }
  };
})();