var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/options'),
    config: {
      pkg: grunt.file.readJSON('package.json'),
      stylesheetsDir: 'apps/webapp/public/stylesheets'
    }
  });

  grunt.registerTask('build', [
    'less',
    'browserify'
  ]);

  grunt.registerTask('hooks', ['clean:gitHooks', 'shell:gitHooks']);
  grunt.loadTasks('grunt');
};

