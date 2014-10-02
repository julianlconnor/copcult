/**
* @module Venmo
*/
require.config({
  hbs: {
    disableI18n: true,
    disableHelpers: true,
    templateExtension : 'hbs'
  },

  baseUrl: '/w/',
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

    // handlebars
    'Handlebars': 'shared/lib/hbs/Handlebars',
    'hbs': 'shared/lib/hbs/hbs',
    'i18nprecompile': 'shared/lib/hbs/hbs/i18nprecompile',
    'json2': 'shared/lib/hbs/hbs/json2',

    // misc helpers
    'punycode': 'shared/lib/punycode/punycode',
    'modernizr': 'shared/lib/modernizr/modernizr',
    'jquery.payment': 'shared/lib/jquery.payment/lib/jquery.payment',
    'jquery.cookie': 'shared/lib/jquery.cookie/jquery.cookie',
    'spin': 'shared/lib/Ladda/dist/spin.min',
    'ladda': 'shared/lib/Ladda/dist/ladda.min',
    'moment': 'shared/lib/moment/moment',
    'fastclick': 'shared/lib/fastclick/lib/fastclick',
    'mixpanel.events' : 'shared/js/config/mixpanel/events',
    'mixpanel.experiments' : 'shared/js/config/mixpanel/experiments',

    // year in review
    'physics': 'shared/lib/physicsjs/index',
    'jquery-ui': 'shared/lib/jquery-ui/ui/jquery-ui'
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
    'modernizr': {
      exports: 'Modernizr'
    }
  }

});
