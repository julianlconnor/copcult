module.exports = {

  jaded: {
    src: 'apps/webapp/public/js/app.js',
    dest: 'build/js/jaded.min.js',
    options: {
      shim: {
        'react.backbone': {
          path: './node_modules/react.backbone/react.backbone.js',
          exports: null,
          depends: {
            react: 'React'
          }
        }
      },
      alias: [
        './apps/webapp/public/js/helpers/ajax.js:ajax'
      ],
      transform: [
        'reactify'
      ]
    }
  }

};
