define([
  'q',
  'sinon',
  'react',
  'shared/js/models/api/user',
  'shared/js/models/api/story',
  'base/test/fixtures/collections/stories.js',
  'base/test/fixtures/user.js',
  'jsx!shabu/public/js/components/feed/story_likes',
], function(q, sinon, React, UserModel,
            StoryModel, storiesFixture, userFixture, StoryLikes) {

  var TU = React.addons.TestUtils;

  describe('Story Likes Component', function() {
    // create current user and other mock users
    var currentUser = new UserModel({
      id: 8,
      externalId: 8,
      firstName: 'Current First Name',
      lastName: 'Current Last Name'
    });
    var mockUsers = [];
    var newUser;
    for ( var i = 0; i < 7; i++ ) {
      newUser = new UserModel({
        id: i,
        firstName: 'First Name ' + i,
        lastName: 'Last Name ' + i
      });
      mockUsers.push(newUser);
    }

    // modify and return a story fixture to have the correct likes
    var getStoryLikesComponent = function (currentUserLikes, numOtherUserLikes) {
      var story;
      var storyLikes;
      var storyFixture = storiesFixture.data[0];
      storyFixture.likes.count = numOtherUserLikes + currentUserLikes;
      storyFixture.likes.data = [];

      if ( currentUserLikes ) {
        storyFixture.likes.data.push(currentUser.attributes);
      }

      for ( var i = 0; i < numOtherUserLikes; i++ ) {
        storyFixture.likes.data.push(mockUsers[i].attributes);
      }

      story = new StoryModel(storyFixture, { parse: true });
      storyLikes = TU.renderIntoDocument(new StoryLikes({
        currentUser: currentUser,
        story: story
      }));

      return storyLikes;
    };

    it('shows nothing when there are no likes', function() {
      var storyLikesComponent = getStoryLikesComponent(false, 0);

      expect(storyLikesComponent.getDOMNode().innerText).to.be('');
    });

    it('displays correctly when only the current user has liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(true, 0);

      expect(storyLikesComponent.getDOMNode().innerText).to.be('You like this.');
    });

    it('displays correctly when the current user and one other have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(true, 1);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('You and First Name 0 Last Name 0 like this.');
    });

    it('displays correctly when two other users have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(false, 2);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('First Name 0 Last Name 0 and First Name 1 Last Name 1 like this.');
    });

    it('displays correctly when the current user and two others have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(true, 2);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('You, First Name 0 Last Name 0 and First Name 1 Last Name 1 like this.');
    });

    it('displays correctly when three other users have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(false, 3);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('First Name 0 Last Name 0, First Name 1 Last Name 1 and First Name 2 Last Name 2 like this.');
    });

    it('displays correctly when the current user and more than two others have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(true, 4);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('You, First Name 0 Last Name 0, First Name 1 Last Name 1 and 2 others like this.');
    });

    it('displays correctly when more than three other users have liked the story', function() {
      var storyLikesComponent = getStoryLikesComponent(false, 5);

      expect(storyLikesComponent.getDOMNode().innerText)
          .to.be('First Name 0 Last Name 0, First Name 1 Last Name 1, First Name 2 Last Name 2 and 2 others like this.');
    });

  });
});
