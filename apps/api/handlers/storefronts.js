//var Storefront = require('../models/storefront');

/**
* Endpoint to create a storefront.
*
* A storefront is an association between an instagram post and several items.
*/
module.exports = {
  post: function(req, res) {
    var items = req.param('items');
    var instagramMediaID = req.param('instagramMediaID');

    console.log('wap', items, instagramMediaID);

    res.send(200, 'wap');
  }
};
