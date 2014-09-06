var path = require('path');

module.exports.bower_path = function(addon) {
  return path.join('/w/shared/lib', addon);
};
