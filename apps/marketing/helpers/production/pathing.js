var url = require('url');
var constants = require('../../../../config/constants');

module.exports.asset_path = function(addon) {
  return url.resolve(constants.CDN_URL, addon);
};

module.exports.js_path = function(addon) {
  return url.resolve(constants.CDN_URL + 'js/', addon);
};

module.exports.image_path = function(addon) {
  return url.resolve(constants.CDN_URL + 'images/', addon);
};

module.exports.css_path = function(addon) {
  return url.resolve(constants.CDN_URL + 'stylesheets/', addon);
};
