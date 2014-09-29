module.exports = {
  stylesheets: {
    files: [
      '<%= stylesheetsDir %>/**/*.less',
      '<%= stylesheetsDir %>/**/*.css'
    ],
    tasks: ['less'],
  },

  svgs: {
    files: ['apps/shared/images/**/*.{svg,png}'],
    tasks: ['grunticon']
  },

  images: {
    files: ['apps/shared/images/**/*'],
    tasks: ['copy:images']
  },

  tests: {
    files: [
      'test/**/*.js',
      'apps/api/**/*.js'
    ],
    tasks: ['simplemocha']
  }
};
