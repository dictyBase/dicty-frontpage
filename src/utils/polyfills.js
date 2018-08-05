import "core-js/es6/string"
import "core-js/es6/array"
import "core-js/es7/array"
import "babel-polyfill"
;(function(arr) {
  arr.forEach(function(item) {
    if (item.hasOwnProperty("remove")) {
      return
    }
    Object.defineProperty(item, "remove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this)
      },
    })
  })
})([Element.prototype, CharacterData.prototype, DocumentType.prototype])

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    "use strict"
    if (typeof start !== "number") {
      start = 0
    }

    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}
