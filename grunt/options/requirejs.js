module.exports = {

  jaded: {
    options: {
      baseUrl: 'apps/',
      name: 'webapp/public/js/lib/requirejs/require',
      out: 'build/js/jaded.min.js',
      wrap: true,

      // use preoptimized builds of dependencies
      paths: {
        'jquery': 'webapp/public/js/lib/jquery/jquery.min',
        'react': 'webapp/public/js/lib/react/react-with-addons.min',
        'underscore': 'webapp/public/js/lib/underscore/underscore-min',
        'jquery-ui': 'webapp/public/js/lib/jquery-ui/ui/minified/jquery-ui.min'
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
