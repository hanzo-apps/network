// Follow the device: Hanzo's tokens are dark on :root and switch to light with the `light` class.
// A classic external script in <head>, so the class is set before first paint and CSP allows it.
;(function () {
  var query = matchMedia('(prefers-color-scheme: light)')
  var apply = function () {
    document.documentElement.classList.toggle('light', query.matches)
  }
  apply()
  query.addEventListener('change', apply)
})()
