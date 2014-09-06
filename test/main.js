var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return (/spec_.*.js$/).test(file);
});

require(['/base/apps/shared/js/main.js'], function() {

  require.config({
    baseUrl: '/base/apps/',

    paths: {
      'expect': 'shared/lib/expect.js/index',
      'sinon':  'shared/lib/sinon/pkg/sinon-1.7.3',
      'react': "shared/lib/react/react-with-addons",

      'fixtures': '/base/test/fixtures',
      'test': '/base/test'
    },
    shim:  {
      'expect': {
        exports: 'expect'
      },
      'sinon': {
        exports: 'sinon'
      },
    },
  });

  require(['sinon', 'underscore'], function(sinon, _) {

    // via http://weblog.bocoup.com/effective-unit-testing-with-amd/
    (function(window) {
      var contextId = 0;

      window.defineTest = function(moduleIds, opts, cb) {

        // this is a hacky way to get the current global config
        var config = _.clone(window.require.s.contexts._.config);

        config.map = {
          '*': {}
        };

        config.context = 'test-context-' + contextId;
        contextId += 1;

        if (opts.mocks) {
          for (var module in opts.mocks) {
            var mock = opts.mocks[module];
            config.map['*'][module] = mock;
          }
        }

        var context = require.config(config);

        return context.call(this, moduleIds, cb);
      };
    }(window));

    /* global mocha */
    mocha.setup({ globals: ['XMLHttpRequest', 'jQuery*'] });
    window.arbiter = {
      ENV: 'karma'
    };
    window.mixpanel = {
      track: function(){},
      identify: function(){},
      get_distinct_id: function(){}
    };
    window.Raven = {
      captureMessage: function() {},
      captureException: function() {}
    };

    require(tests, function() {
      // TODO(tboyt): Hack for defineTest() modules not loading properly
      setTimeout(function() {
        window.__karma__.start();
      }, 100);
    });
  });

});
