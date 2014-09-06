var path = require('path');
var sitePath = 'apps/marketing';

var makePath = function() {
  var args = Array.prototype.slice.call(arguments);
  return path.join.apply(null, [sitePath].concat(args));
};

module.exports = function(grunt) {

  grunt.loadNpmTasks('assemble');

  /**
  * Write json file with env.
  *
  * This is used within assemble to dictate whether a minified file or require
  * block should be served.
  */
  var contents = {};
  var env = grunt.option('prod') ? 'production' : 'development';

  contents[env] = true;
  grunt.file.write(path.join(process.cwd(), 'apps/marketing/data/', 'env.json'),
                   JSON.stringify(contents, null, 4));

  return {
    options: {
      middleware: ['assemble-middleware-sitemap'],
      layout: makePath('layouts/default.hbs'),
      partials: [ makePath('partials/*.hbs') ],
      data: [ makePath('data/*.{yaml,json}') ],
      helpers: [ makePath('helpers/*.js'), makePath('helpers', env, '*.js') ]
    },

    marketingSite: {
      options: {
        plugins: ['assemble-middleware-sitemap'],
        sitemap: {
          dest: 'build/marketing',
          relativedest: 'build/marketing/apps/marketing/pages',
          homepage: 'http://venmo.com'
        }
      },

      src: [ makePath('pages/**/*.hbs') ],
      dest: 'build/marketing/'
    }
  };
};
