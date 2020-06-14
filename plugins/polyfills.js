if (process.client) {
  if (!('getComputedStyle' in window)) {
    window.getComputedStyle = function(element) {
      if (!element.currentStyle)
        console.warn(
          'getComputedStylePolyfill::::: element.currentStyle is undefined',
        )
      return element.currentStyle || {}
    }
  }
}
