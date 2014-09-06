define([
  'sinon',
  'react',
  'jsx!shabu/public/js/components/feed/story_detail',
  'jsx!shabu/public/js/components/feed/comment',
  'shared/js/models/api/story',
  'shared/js/models/api/user',
  'base/test/fixtures/collections/stories.js'
], function(sinon, React, StoryDetail, Comment, StoryModel, User, storiesFixture) {

  describe('Story Detail', function() {

    var spy;
    var storyDetail;
    var story;
    var TU = React.addons.TestUtils;
    var storyFixture = storiesFixture.data[0];

    beforeEach(function() {
      spy = sinon.spy();

      story = new StoryModel(storyFixture, { parse: true });

      storyDetail = TU.renderIntoDocument(new StoryDetail({
        currentUser: new User(),
        story: story,
        onClose: spy,
      }));
    });

    afterEach(function() {
      spy.reset();
    });

    // NOTE: the close button is temporarily hidden on the story detail view - 
    // let's add this back when we put the X back
    // it('should handle a user closing the component', function() {
    //   TU.Simulate.click(storyDetail.refs.close);
    //   expect(spy.called).to.be(true);
    // });

    it('should render comments for a story', function() {
      var comments = TU.scryRenderedComponentsWithType(storyDetail, Comment);
      expect(comments.length).to.be(storyFixture.comments.data.length);
    });

  });


});

