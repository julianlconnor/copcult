define([
  'jquery',
  'backbone',
  'fastclick',

  'jsx!webapp/public/js/app_router'
], function($, Backbone, FastClick) {
  /**
  * App Wide initialization.
  */
  $.ajaxSetup({ cache: false });
  FastClick.attach(document.body);
});

