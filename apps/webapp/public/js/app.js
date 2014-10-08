define([
  'jquery',
  'backbone',
  'fastclick',

  'jsx!webapp/public/js/app_router',

  'react.backbone'
], function($, Backbone, FastClick) {
  /**
  * App Wide initialization.
  */
  $.ajaxSetup({ cache: false });
  FastClick.attach(document.body);
});

