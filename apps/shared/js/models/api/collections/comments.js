define([
  'shared/js/models/collections/base',
  'shared/js/models/api/comment'
], function(BaseCollection, Comment) {

  var Comments = BaseCollection.extend({
    model: Comment

  });

  return Comments;
});
