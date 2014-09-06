module.exports = {
  stylesheets: {
    files: [
      '<%= stylesheetsDir %>/**/*.less',
      '<%= stylesheetsDir %>/**/*.css'
    ],
    tasks: [
      'less:compileShabu',
      'less:compile'
    ],
  },

  svgs: {
    files: ['apps/shared/images/**/*.{svg,png}'],
    tasks: ['grunticon']
  },

  images: {
    files: ['apps/shared/images/**/*'],
    tasks: ['copy:images']
  },

  claimStylesheet: {
    files: [
      '<%= stylesheetsDir %>/**/*.less',
      '<%= stylesheetsDir %>/**/*.css',
    ],
    tasks: ['less:compileClaims'],
  },

  marketingSite: {
    files: [
      'apps/marketing/pages/**/*.hbs',
      'apps/marketing/partials/**/*.hbs',
      'apps/marketing/layouts/**/*.hbs',
      'apps/marketing/helpers/**/*.js',
      'apps/marketing/data/**/*.yaml',
      'grunt/options/assemble.js'
    ],
    tasks: ['marketingSite']
  },
  marketingSiteLess: {
    files: [
      'apps/marketing/public/stylesheets/**/*.less'
    ],
    tasks: ['less:marketingSite']
  },
};
