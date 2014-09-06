define([
  'expect',
  'sinon',
  'shared/js/models/collections/recents',
], function(expect, sinon, RecentsCollection) {

  describe('recents collection', function() {

    var recents;

    beforeEach(function() {
      recents = new RecentsCollection();
    });

    it('instantiates', function() {
      expect(recents).to.be.ok();
    });

  });

});

