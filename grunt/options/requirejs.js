module.exports = {

  jaded: {
    options: {
      baseUrl: 'apps/',
      name: 'shared/lib/requirejs/require',
      out: 'build/js/jaded.min.js',
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
      exclude: ['jsx'],
      include: ['webapp/public/js/app'],
      insertRequire: ['webapp/public/js/app'],
      mainConfigFile: 'apps/webapp/public/js/main.js'
    }
  }

};
