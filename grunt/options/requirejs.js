var _ = require('underscore');

function generateConfig(name) {
  var appPath = name + '/public/js/app';

  return _.extend({
    baseUrl: 'apps/',
    name: 'shared/lib/requirejs/require',
    wrap: true,

    // use preoptimized builds of dependencies
    paths: {
      'jquery': 'shared/lib/jquery/jquery.min',
      'react': 'shared/lib/react/react-with-addons.min',
      'underscore': 'shared/lib/underscore/underscore-min',
      'jquery-ui': 'shared/lib/jquery-ui/ui/minified/jquery-ui.min'
    },

    // Configuration for jsx plugin to work
    useStrict: true,
    onBuildWrite: function (moduleName, path, singleContents) {
      return singleContents.replace(/jsx!/g, '');
    },
    exclude: ['jsx']
  }, 
  {
    out: 'build/js/' + name + '.min.js',
    include: [appPath],
    insertRequire: [appPath],
    mainConfigFile: 'apps/' + name + '/public/js/main.js'
  });
}

module.exports = {

  shabu: { options: generateConfig('shabu') },

  claims: { options: generateConfig('claims') },

  signup: { options: generateConfig('signup') },

  intents: { options: generateConfig('intents') },

  marketingSite: { options: generateConfig('marketing') }

};
