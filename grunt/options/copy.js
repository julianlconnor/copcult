module.exports = {
  images: {
    files: [{
      expand: true,
      cwd: 'apps/shared',
      src: ['images/**'],
      dest: 'build/'
    }]
  },

  yearInReview: {
    files: [{
      expand: true,
      cwd: 'apps/year_in_review/public/js',
      src: ['year_in_review.min.js'],
      dest: 'build/js/'
    }]
  },

  marketingSite: {
    files: [{
      expand: true,
      cwd: 'build/marketing/apps/marketing/pages/',
      src: ['**'],
      dest: 'build/marketing/'
    }]
  }
};
