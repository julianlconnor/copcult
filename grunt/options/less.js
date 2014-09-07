var lessPath = [
  './apps/shared/lib',
  './apps/shared/stylesheets'
];

module.exports = {
  arbiter: {
    files: {
      'build/stylesheets/arbiter.min.css': 'apps/webapp/public/stylesheets/main.less',
    },
    options: {
      paths: lessPath
    }
  }
};
