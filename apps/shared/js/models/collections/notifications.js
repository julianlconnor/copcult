define([
  'q',
  'shared/js/models/collections/base',
  'shared/js/models/base'
], function(q, BaseCollection, BaseModel) {

  var NotificationsCollection = BaseCollection.extend({
    model: BaseModel,
    url: '/api/v5/notifications'
  });

  return NotificationsCollection;
});
