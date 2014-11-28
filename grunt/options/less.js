var lessPath = [
  './apps/webapp/public/js/lib',
  './apps/webapp/public/stylesheets'
];

module.exports = {
  jaded: {
    files: {
      'build/stylesheets/jaded.min.css': 'apps/webapp/public/stylesheets/main.less',
    },
    options: {
      paths: lessPath
    }
  }
};
