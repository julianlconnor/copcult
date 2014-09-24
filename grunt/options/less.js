var lessPath = [
  './apps/shared/lib',
  './apps/shared/stylesheets'
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
