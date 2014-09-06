var path = require('path');

module.exports.asset_path = function(addon) {
  return path.join('/marketing/public', addon);
};

module.exports.image_path = function(addon) {
  return path.join('/shared/images/', addon);
};

module.exports.js_path = function(addon) {
  return path.join('/marketing/public/js/', addon);
};

module.exports.css_path = function(addon) {
  return path.join('/build/stylesheets/', addon);
};
