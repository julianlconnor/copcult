define([
  'expect',
  'sinon',
  'shared/js/models/collections/public_feed',
  'base/test/fixtures/story.js'
], function(expect, sinon, FeedCollection, storyFixtures) {

  describe('Feed Collection', function() {

    it('instantiates', function() {
      expect(new FeedCollection()).to.be.ok();
    });

    it('parses an API response correctly', function() {
      var valid = storyFixtures.valid;

      var feed = new FeedCollection();
      var parsedResp = feed.parseAPIPayment(valid);
      expect(parsedResp.amount).to.be(valid.transactions[0].amount);
      expect(parsedResp.note).to.be(valid.message);
      expect(parsedResp.actor.name).to.be(valid.actor.name);
    });

  });

});
