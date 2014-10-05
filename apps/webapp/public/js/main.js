/**
* @module Venmo
*/

require.config({
  hbs: {
    disableI18n: true,
    disableHelpers: true,
    templateExtension : 'hbs'
  },

  baseUrl: '/',
  paths: {
    'text': 'webapp/public/js/lib/requirejs-text/text',

    'jquery': 'webapp/public/js/lib/jquery/jquery',
    'bluebird': 'webapp/public/js/lib/bluebird/js/browser/bluebird',

    // lodash + backbone
    'underscore': 'webapp/public/js/lib/underscore/underscore-min',
    'underscore.string': 'webapp/public/js/lib/underscore.string/lib/underscore.string',
    'backbone': 'webapp/public/js/lib/backbone/backbone',
    'backbone.super': 'webapp/public/js/lib/backbone-super/backbone-super/backbone-super',
    'backbone.validation': 'webapp/public/js/lib/backbone.validation/index',
    'backbone.queryparams': 'webapp/public/js/lib/backbone-query-parameters/backbone.queryparams',

    // react
    'react': 'webapp/public/js/lib/react/react-with-addons',
    'react-router': 'webapp/public/js/lib/react-router/dist/react-router',
    'react-router-shim': 'webapp/public/js/helpers/router_shim',
    'jsx': 'webapp/public/js/lib/jsx-requirejs-plugin/js/jsx',
    'JSXTransformer': 'webapp/public/js/lib/react/JSXTransformer',
    'react.backbone': 'webapp/public/js/lib/react.backbone/react.backbone',

    'jquery.cookie': 'webapp/public/js/lib/jquery.cookie/jquery.cookie',
    'fastclick': 'webapp/public/js/lib/fastclick/lib/fastclick'
  },

  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-ui': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'react-router-shim': {
      exports: 'React'
    },
    'react-router': ['react-router-shim'],
    'jquery.payment': ['jquery'],
    'backbone.super': ['backbone'],
  }

});
