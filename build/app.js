"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var PHI = (1 + Math.sqrt(5)) / 2; // 1.61803398874989 or "The Golden Ratio"
  var PHI_PRIME = 1 / (2 * PHI);
  var UPDATE_DELAY = 2000;

  var previousArray = [];
  var updateTimeout = void 0;

  function calcBaseLineHeight(fontSize, width) {
    var result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2));

    return Math.round(result * fontSize) / fontSize; // Lower precision.
  }

  var options = INSTALL_OPTIONS;

  function updateElements() {
    previousArray = [];
    var _options = options;
    var location = _options.location;


    var elements = Array.from(document.querySelectorAll(location));

    elements.forEach(function ($) {
      var fontSize = document.defaultView.getComputedStyle($).fontSize.split("p")[0];
      // TODO What if fontsize is in em's?
      var object = {
        type: $,
        lineHeight: document.defaultView.getComputedStyle($).lineHeight
      };

      previousArray.push(object);

      var fontWidth = $.clientWidth;

      $.style.lineHeight = calcBaseLineHeight(fontSize, fontWidth);
    });
  }

  function resetLineHeight() {
    previousArray.forEach(function ($) {
      $.type.style.lineHeight = $.lineHeight;
    });
    updateElements();
  }

  if (document.readyState === "loading") {
    // TODO fix bootstrap setup
    window.addEventListener("load", updateElements);
  } else {
    updateElements();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      clearTimeout(updateTimeout);
      options = nextOptions;
      // TODO set a timeout that blurs the screen and doesn't reload until x seconds
      updateTimeout = setTimeout(resetLineHeight, UPDATE_DELAY);
    }
  };
})();