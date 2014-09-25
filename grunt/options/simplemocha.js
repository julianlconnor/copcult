module.exports = {
  test: {
    src: 'test/**/*.js',
    options: {
      timeout: 3000,
      ignoreLeaks: false,
      ui: 'bdd',
    }
  }
};
