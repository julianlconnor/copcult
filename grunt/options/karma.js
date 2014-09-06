module.exports = {
  ci: {
    configFile: 'karma.conf.js',
    browsers: ['Chrome'],
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: 'test/test-results.xml',
      suite: ''
    },
    singleRun: true
  }
};
