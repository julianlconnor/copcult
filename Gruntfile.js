var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/options'),
    config: {
      pkg: grunt.file.readJSON('package.json'),
      stylesheetsDir: 'apps/shared/stylesheets',
      aws: grunt.file.readJSON(path.join(process.env.HOME, 'grunt-aws.json'))
    }
  });

  grunt.registerTask('hooks', ['clean:gitHooks', 'shell:gitHooks']);
  grunt.loadTasks('grunt');
};

