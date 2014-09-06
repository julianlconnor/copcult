define(function() {
  /*
  * Adds all the polyfills we need.
  */

  // ES5 15.3.4.5 Function.prototype.bind ( thisArg [, arg1 [, arg2, ... ]] )
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
  // Taken from https://github.com/inexorabletash/polyfill/blob/master/es5.js
  if ( !Function.prototype.bind ) {
    Function.prototype.bind = function (o) {
      if ( typeof this !== 'function' ) { throw new TypeError("Bind must be called on a function"); }
      var slice = [].slice,
          args = slice.call(arguments, 1),
          self = this,
          bound = function () {
            return self.apply(this instanceof nop ? this : (o || {}),
                              args.concat(slice.call(arguments)));
          };

      /** @constructor */
      function nop() {}
      nop.prototype = self.prototype;

      bound.prototype = new nop();

      return bound;
    };
  }

  // http://stackoverflow.com/questions/1181575/javascript-determine-whether-an-array-contains-a-value
  if( !Array.prototype.indexOf ) {
    Array.prototype.indexOf = function(needle) {
      for( var i = 0; i < this.length; i++ ) {
        if( this[i] === needle ) {
          return i;
        }
      }
      return -1;
    };
  }
});
