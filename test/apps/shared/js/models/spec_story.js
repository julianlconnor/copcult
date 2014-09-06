defineTest([
  'q',
  'jquery',
  'expect',
  'sinon',
  'moment',
  'shared/js/models/api/user',
  'shared/js/models/api/story',
  'shared/js/models/api/collections/comments',
  'fixtures/collections/stories',
  'shared/js/helpers/ajax',
  'shared/js/helpers/constants',
  'jquery.cookie'
], {
  mocks: { 'shared/js/helpers/ajax': 'test/mocks/mock_ajax' }
}, function(q, $, expect, sinon, moment, UserModel, StoryModel,
            CommentsCollection, storiesFixture, ajax, constants) {

  describe('Story Model', function() {

    var user;
    var story;
    var STORY_AUDIENCES = constants.STORY_AUDIENCES;

    beforeEach(function() {
      story = new StoryModel({ data: storiesFixture.data[0] }, { parse: true });
      user = new UserModel();
    });

    afterEach(function() {
      ajax.reset();
    });

    describe('parse story from json response', function() {
      it('should contain a CommentsCollection for comments', function() {
        expect(story.get('comments') instanceof CommentsCollection).to.be(true);
      });

      it('should contain a User model for actor', function() {
        expect(story.getActor() instanceof UserModel).to.be(true);
      });

      it('should contain a User model for each target', function() {
        story.get('payments').forEach(function(txn) {
          expect(txn.get('target') instanceof UserModel).to.be(true);
        });
      });

      it('should contain a User model for each like', function() {
        story.get('likes').forEach(function(user) {
          expect(user instanceof UserModel).to.be(true);
        });
      });
    });

    describe('likedByUser', function() {
      it('returns whether a user liked the story or not', function() {
        expect(story.likedByUser(user)).to.be(false);
        story.set('likes', [user]);
        expect(story.likedByUser(user)).to.be(true);
      });
    });

    describe('toggleLike', function() {

      it('creates a delete request when the user has liked the story', function(done) {
        story.set('likes', [user]);
        story.toggleLike(user).then(function() {
          expect(ajax.called).to.be(true);
          expect(ajax.args[0][0].type).to.be('DELETE');
          done();
        });
      });

      it('creates a post request when the user has not liked the story', function(done) {
        story.set('likes', []);
        story.toggleLike(user).then(function() {
          expect(ajax.called).to.be(true);
          expect(ajax.args[0][0].type).to.be('POST');
          done();
        });
      });

      it('updates the model with the returned response', function(done) {
        story.set('likes', []);
        var spy = sinon.spy(story, 'set');
        expect(story.get('likes').length).to.be(0);
        story.toggleLike(user).then(function() {
          expect(spy.called).to.be(true);
          spy.restore();
          done();
        });
      });

    });

    describe('privacy', function() {
      it('ajax PUT called when passing a valid audience with the audience', function() {
        var validAudiences = Object.keys(STORY_AUDIENCES).map(function(k) { return STORY_AUDIENCES[k]; });
        validAudiences.forEach(function(audience, index) {
          story.setPrivacy(audience);
          var args = ajax.args[index][0];
          expect(args.data.audience).to.be(audience);
          expect(args.type).to.be('PUT');
        });
        expect(ajax.callCount).to.be(validAudiences.length);
      });
    });

    describe('Display Formatting', function() {
      beforeEach(function() {
        story = new StoryModel(storiesFixture.data[0], { parse: true });
      });

      it('properly returns actorName as story actor', function() {
        // should be actors name if the user is not the actor
        user = new UserModel();
        expect(story.getActorName(user)).to.be(story.getActor().getDisplayName());

        // "You" if you are the story's actor
        user = story.getActor();
        expect(story.getActorName(user)).to.be('You');
      });

      it('properly returns action', function() {
        // fixture defaults to payment
        expect(story.getAction()).to.be('paid');
        story.get('payments').first().set('action', 'charge');
        expect(story.getAction()).to.be('charged');
      });

      it('can return a formatted amount', function() {
        story.get('payments').first().set('amount', '10.00');
        expect(story.getFormattedAmount()).to.be('$10.00');
      });

      it('can check if a user is involved in the story', function() {
        var target = story.getTargets()[0];
        var actor = story.getActor();

        // true for story targets and actors
        expect(story.hasUser(target)).to.be(true);
        expect(story.hasUser(actor)).to.be(true);

        // false for users not in the story
        expect(story.hasUser(new UserModel())).to.be(false);
      });

      describe('title', function() {

        var actor;
        var johnny;

        beforeEach(function() {
          actor = story.getActor();
          johnny = new UserModel({ name: 'Johnny Cash' });
        });

        it('prefixes with `Your` if user is part of the payment', function() {
          expect(story.getTitle(actor).indexOf('Your')).to.be(0);
        });

        it('prefixes with the story actors user\'s name if not part of the payment', function() {
          expect(story.getTitle(johnny).indexOf(actor.getDisplayName())).to.be(0);
        });

        it('adds the calendar diff', function() {
          var title;
          var time = moment().subtract('days', 4);
          var calendar = time.calendar();

          story.set('dateCreated', time);
          title = story.getTitle(johnny);
          var diff = calendar.slice(0, calendar.indexOf(' at '));
          expect(new RegExp(diff).test(title)).to.ok();
        });

      });

    });

  });

});
