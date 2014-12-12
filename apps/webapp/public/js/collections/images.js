var ajax = require('ajax');

var Image = require('../models/image');
var BaseCollection = require('./base');

var Images = BaseCollection.extend({

  model: Image,

  fetchSubmittedImages: function() {
    return this.ajax({
      url: '/api/v1/users/' + jaded.user.id + '/images',
      type: 'GET'
    });
  },

  addImage: function(url) {
    return ajax({
      type: 'POST',
      url: '/api/v1/images',
      data: {
        url: url
      }
    }).then(function(response) {
      return this.add(response.data, { at: 0 });
    }.bind(this));
  }

});

module.exports = Images;
