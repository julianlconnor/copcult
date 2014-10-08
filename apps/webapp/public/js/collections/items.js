define([
  'webapp/public/js/collections/base',

  'webapp/public/js/models/item'
], function(BaseCollection, Item) {

  var Items = BaseCollection.extend({

    model: Item

  });

  return Items;

});

