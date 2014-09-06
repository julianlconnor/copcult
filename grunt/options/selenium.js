module.exports = {
  options: {
    jar: function() {
      var find = require('find');

      var jars = find.fileSync(/\.jar/, '/usr/local/Cellar/selenium-server-standalone');

      if ( jars.length < 1 ) {
        throw new Error('Install yr selenium jar! brew install selenium-standalone-server');
      }

      return jars[0];
    },
    port: 4444
  },
  main: {}
};
