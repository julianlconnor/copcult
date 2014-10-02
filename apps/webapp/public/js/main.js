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
    'text': 'shared/lib/requirejs-text/text',

    'jquery': 'shared/lib/jquery/jquery',
    'q': 'shared/lib/q/q',

    // lodash + backbone
    'lodash': 'shared/lib/lodash/lodash.min',
    'underscore.string': 'shared/lib/underscore.string/lib/underscore.string',
    'backbone': 'shared/lib/backbone/backbone',
    'backbone.super': 'shared/lib/backbone-super/backbone-super/backbone-super',
    'backbone.validation': 'shared/lib/backbone.validation/index',
    'backbone.queryparams': 'shared/lib/backbone-query-parameters/backbone.queryparams',

    // react
    'react': "shared/lib/react/react-with-addons",
    'jsx': "shared/lib/jsx-requirejs-plugin/js/jsx",
    'JSXTransformer': 'shared/lib/react/JSXTransformer',
    'react.backbone': 'shared/lib/react.backbone/react.backbone',

    'jquery.cookie': 'shared/lib/jquery.cookie/jquery.cookie',
    'fastclick': 'shared/lib/fastclick/lib/fastclick'
  },

  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'jquery-ui': {
      deps: ['jquery']
    },
    'lodash': {
      exports: '_'
    },
    'jquery.payment': ['jquery'],
    'backbone.super': ['backbone'],
  }

});
