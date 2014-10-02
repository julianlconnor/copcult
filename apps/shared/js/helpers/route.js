define([
  'jquery',
  'lodash',
  'backbone'
], function($, _, Backbone) {

  var Route = function(opts) {
    opts = opts || {};

    // allow rendering into test divs
    this.el = opts.el || $('#content').get(0);
  };

  _.extend(Route.prototype, {
    // initialize is a no-op by default
    initialize: function() {},

    preInitialize: function() {
      if ( this.title ) {
        document.title = this.title;
      }
    }
  });

  // Checks a backbone inheritence chain to see if a class inherits from a parent
  var inherits = function(constructor, test) {
    if ( !constructor.__super__ ) { return false; }


    // buh?
    if ( constructor.constructor === test.constructor ) {
      return true;
    }

    var parent = constructor.__super__.constructor;
    if ( parent === test ) {
      return true;
    }
    var grandParent = parent.__super__.constructor;
    if ( grandParent ) {
      return inherits(parent, test);
    }
    return false;
  };

  // checks if a function is a route constructor
  Route.isRouteConstructor = function(constructor) {
    return inherits(constructor, Route);
  };

  // easiest way to reuse Backbone's extend :|
  Route.extend = Backbone.Model.extend;

  return Route;
});
