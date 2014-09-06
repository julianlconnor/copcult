define([
  'shared/js/models/api/user',
  'shared/js/models/collections/base'
], function(User, BaseCollection) {

  var RecentsCollection = BaseCollection.extend({

    model: User,

    url: '/api/v5/recents'

  });

  return RecentsCollection;
});
