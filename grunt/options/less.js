var lessPath;
if ( process.env.NODE_ENV.toLowerCase() !== 'development' ) {
  lessPath = [
    '/app/apps/shared/lib',
    '/app/apps/shared/stylesheets'
  ];
} else { 
  lessPath = [
    './apps/shared/lib',
    './apps/shared/stylesheets'
  ];
}

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
