define([
  'react',
  'sinon',
  'q',
  'underscore',

  'shared/js/models/api/collections/stories',
  'shared/js/models/api/comment',
  'shared/js/models/api/story',
  'shared/js/models/api/user',

  'base/test/fixtures/collections/stories.js',
  'base/test/fixtures/user.js',

  'jsx!shared/js/components/forms/inputs/form_input',
  'jsx!shared/js/components/forms/inputs/bubble',

  'jsx!shabu/public/js/components/feed/comments',
  'jsx!shabu/public/js/components/feed/comment'

], function(React, sinon, q, _, StoriesCollection, CommentModel, StoryModel,
            UserModel, storiesFixture, usersFixture, FormInput, BubbleInput,
            CommentsComponent, CommentComponent) {

  var TU = React.addons.TestUtils;

  describe('Comments Component', function() {
    var commentsComponent;
    var story;
    var user;

    beforeEach(function() {
      user = new UserModel(usersFixture.apiMe.data, { parse: true });
      story = new StoryModel(storiesFixture.data[0], { parse: true });

      commentsComponent = TU.renderIntoDocument(new CommentsComponent({
        currentUser: user,
        comments: story.get('comments'),
        isVisible: true,
        story: story
      }));

      commentsComponent.setState({
        newComment: new CommentModel({
          actor: user,
          storyId: story.id,
          commentText: 'hello world'
        })
      });

    });

    describe('rendering components', function() {
      it('renders a component', function() {
        expect(commentsComponent).to.be.ok();
      });

      it('renders a comment component for every comment on the story', function() {
        var rendered = TU.scryRenderedComponentsWithType(commentsComponent, CommentComponent);
        expect(rendered.length).to.be(story.get('comments').length);
      });

      it('renders a BubbleInput to create new comments', function() {
        var rendered = TU.findRenderedComponentWithType(commentsComponent, BubbleInput);
        expect(rendered).to.be.ok();
      });
    });

    describe('creating new comments', function() {
      var stub;
      var form;

      beforeEach(function() {
        var user = new UserModel(usersFixture.apiMe.data, { parse: true });
        commentsComponent.setState({
          newComment: new CommentModel({
            user: user,
            storyId: 123,
            message: 'hello',
            dateCreated: new Date()
          })
        });
        stub = sinon.stub(commentsComponent.state.newComment, 'save');
        stub.returns(q('success'));
        form = TU.findRenderedComponentWithType(commentsComponent, BubbleInput);
      });

      afterEach(function() {
        stub.restore();
      });

      it('should call comment.save when form is submitted', function() {
        TU.Simulate.submit(form.getDOMNode());
        expect(stub.called).to.be(true);
      });

      it('should handle validation errors', function() {
        stub.returns(q.reject('save error'));
        TU.Simulate.submit(form.getDOMNode());
        expect(stub.called).to.be(true);
      });

      it('should clear form after successfully saving a comment', function(done) {
        commentsComponent.handleSubmit(new Event('test'))
          .then(function() {
            expect(form.getDOMNode().querySelector('input').value).to.be('');
          }).finally(done);
      });

      it('should refetch the story after posting a comment', function(done) {
        var spy = sinon.stub(story, 'fetch');
        commentsComponent.handleSubmit(new Event('test'))
          .then(function() {
            expect(spy.called).to.be.ok();
            spy.restore();
            done();
          })
          .catch(function(err) {
            spy.restore();
            done(err);
          });
      });

      it('handles server side errors', function(done) {
        var spy = sinon.spy(commentsComponent, 'handleSubmitError');
        stub.returns(q.reject('error'));
        commentsComponent.handleSubmit(new Event('test'))
          .then(function() {
            expect(spy.called).to.be(true);
            spy.restore();
            done();
          })
          .catch(function(err) {
            spy.restore();
            done(err);
          });
      });

    });

  });
});
