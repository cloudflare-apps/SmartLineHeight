"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var PHI = (1 + Math.sqrt(5)) / 2; // 1.61803398874989 or "The Golden Ratio"
  var PHI_PRIME = 1 / (2 * PHI);

  function calcBaseLineHeight(fontSize, width) {
    var result = PHI - PHI_PRIME * (1 - width / Math.pow(fontSize * PHI, 2));

    return Math.round(result * fontSize) / fontSize; // Lower precision.
  }

  var options = INSTALL_OPTIONS;

  function updateElements() {
    // TODO reset line height here or in window.INSTALL_SCOPE

    var _options = options;
    var location = _options.location;


    var elements = Array.from(document.querySelectorAll(location));

    elements.forEach(function ($) {
      var fontSize = document.defaultView.getComputedStyle($).fontSize.split("p")[0];

      var fontWidth = $.clientWidth;

      $.style.lineHeight = calcBaseLineHeight(fontSize, fontWidth);
    });
  }

  function bootstrap() {
    updateElements();
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", bootstrap);
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;
      // TODO reset line height here or in updateElements
      updateElements();
    }
  };
})();