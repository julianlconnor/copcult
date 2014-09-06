defineTest([
  'q',
  'sinon',
  'react',
  'shared/js/models/api/collections/stories',
  'shared/js/models/api/user',
  'shared/js/models/api/story',
  'fixtures/collections/stories',
  'fixtures/user',
  'jsx!shabu/public/js/components/feed/story',
  'shared/js/helpers/ajax'
], {
  mocks: { 'shared/js/helpers/ajax': 'test/mocks/mock_ajax' }
}, function(q, sinon, React, Stories, UserModel,
            StoryModel, storiesFixture, userFixture, Story, ajax) {

  var TU = React.addons.TestUtils;

  describe('Story Component', function() {

    var user;
    var story;
    var storyModel;

    beforeEach(function() {
      user = new UserModel();
      storyModel = new StoryModel({
        data: storiesFixture.data[0]
      },{
        parse: true
      });

      story = TU.renderIntoDocument(new Story({
        currentUser: new UserModel(),
        story: storyModel,
        onSelection: sinon.spy()
      }));
    });

    it('renders a story', function() {
      expect(story).to.be.ok();
    });

    it('becomes liked when liking is successful', function() {
      var stub = sinon.stub(story.props.story, 'likedByUser');
      stub.returns(true);
      story.forceUpdate();
      // TODO: Make this not rely on classname
      expect(story.getDOMNode().querySelector('.like').classList.contains('icon-heart-medium-red')).to.be(true);

      stub.returns(false);
      story.forceUpdate();
      expect(story.getDOMNode().querySelector('.like').classList.contains('icon-heart-medium')).to.be(true);
    });

  });
});
