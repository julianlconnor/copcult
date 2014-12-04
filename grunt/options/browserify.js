module.exports = {

  jaded: {
    src: 'apps/webapp/public/js/app.js',
    dest: 'build/js/jaded.min.js',
    options: {
      transform: [
        'reactify'
      ]
    }
  }

};
