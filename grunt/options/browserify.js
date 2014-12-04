module.exports = {

  jaded: {
    src: 'apps/webapp/public/js/app.js',
    dest: 'build/jaded.min.js',
    options: {
      transform: [
        'reactify'
      ]
    }
  }

};
