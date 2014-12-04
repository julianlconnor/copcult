module.exports = {

  stylesheets: {
    files: [
      '<%= stylesheetsDir %>/**/*.less',
      '<%= stylesheetsDir %>/**/*.css'
    ],
    tasks: ['less'],
  },

  browserify: {
    files: [
      'apps/webapp/public/js/**/*.js'
    ],
    tasks: ['browserify']
  }

  // tests: {
  //   files: [
  //     'test/**/*.js',
  //     'apps/api/**/*.js'
  //   ],
  //   tasks: ['simplemocha']
  // }
};
