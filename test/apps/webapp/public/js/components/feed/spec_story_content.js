define([
  'q',
  'sinon',
  'react',
  'shared/js/models/api/user',
  'shared/js/models/api/story',
  'base/test/fixtures/collections/stories.js',
  'base/test/fixtures/user.js',
  'jsx!shabu/public/js/components/feed/story_content',
], function(q, sinon, React, UserModel,
            StoryModel, storiesFixture, userFixture, StoryContent) {

  var TU = React.addons.TestUtils;

  describe('Story Content Component', function() {
    var getStoryWithAmount = function() {
      var storyFixture = storiesFixture.data[0];
      return new StoryModel(storyFixture, { parse: true });
    };

    var getStoryWithoutAmount = function() {
      var storyFixture = storiesFixture.data[0];
      storyFixture.payments.data.forEach(function(payment) {
        payment.amount = null;
      });
      return new StoryModel(storyFixture, { parse: true });
    };

    var getStoryWithLikes = function(numLikes) {
      var storyFixture = storiesFixture.data[0];
      storyFixture.likes.count = numLikes;
      storyFixture.likes.data = [];
      for ( var i = 0; i < numLikes; i++ ) {
        storyFixture.likes.data.push(new UserModel());
      }

      return new StoryModel(storyFixture, { parse: true });
    };

    it('renders amount if there is an amount in the data', function() {
      var storyContent = TU.renderIntoDocument(new StoryContent({
        currentUser: new UserModel(),
        story: getStoryWithAmount()
      }));

      expect(TU.findRenderedDOMComponentWithClass).withArgs(storyContent, 'amount')
          .to.not.throwException();
    });

    it('renders amount if there is an amount in the data', function() {
      var storyContent = TU.renderIntoDocument(new StoryContent({
        currentUser: new UserModel(),
        story: getStoryWithoutAmount()
      }));

      expect(TU.findRenderedDOMComponentWithClass).withArgs(storyContent, 'amount')
          .to.throwException();
    });

    it('renders list of likes if there are any', function() {
      var storyContent = TU.renderIntoDocument(new StoryContent({
        currentUser: new UserModel(),
        story: getStoryWithLikes(1)
      }));

      expect(TU.findRenderedDOMComponentWithClass).withArgs(storyContent, 'likes')
          .to.not.throwException();
    });

    it('renders list of likes if there are any', function() {
      var storyContent = TU.renderIntoDocument(new StoryContent({
        currentUser: new UserModel(),
        story: getStoryWithLikes(0)
      }));

      expect(TU.findRenderedDOMComponentWithClass).withArgs(storyContent, 'likes')
          .to.throwException();
    });

  });
});
