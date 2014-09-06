module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'requirejs'],

    // Tell the karma server which files to serve
    files: [
      {pattern: 'apps/**/**/**/*.js', included: false},
      {pattern: 'apps/**/**/**/*.css', included: false},
      {pattern: 'apps/**/**/**/*.hbs', included: false},

      {pattern: 'test/fixtures/**/*.js', included: false},
      {pattern: 'test/apps/**/*.js', included: false},
      {pattern: 'test/mocks/**/*.js', included: false},

      'test/main.js'
    ],

    exclude: [
      '**/*.swp',
      '**/*__jsx_transform__.js'
    ],

    reporters: ['dots'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false

  });

};
