module.exports = {

  jaded: {
    src: 'apps/webapp/public/js/app.js',
    dest: 'build/js/jaded.min.js',
    options: {
      alias: [
        './apps/webapp/public/js/helpers/ajax.js:ajax'
      ],
      transform: [
        'reactify'
      ]
    }
  }

};
