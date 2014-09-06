define([
  'sinon',
  'expect',
  'shared/js/models/api/collections/stories',
  'fixtures/collections/feedWithTransfers'
], function(sinon, expect, StoryCollection, feedFixtures) {

  describe('API Story Collection', function() {

    var stories;

    beforeEach(function() {
      stories = new StoryCollection(feedFixtures, { parse: true });
    });

    it('instantiates', function() {
      expect(stories).to.be.ok();
    });

    it('filters out stories that are type transfer', function() {
      stories.forEach(function(story) {
        expect(story.get('type')).to.not.be('transfer');
      });
    });

  });

});

