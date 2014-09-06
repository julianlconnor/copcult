module.exports = function(grunt) {
  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/nodemon.js', '--debug', 'server.js'],
      opts: {
        stdio: 'inherit'
      }
    },
    function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });
}
