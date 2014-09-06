define([
  'underscore',
  'q',
  'sinon',
  'react',
  'backbone',
  'shared/js/models/api/user',
  'base/test/fixtures/user.js',
  'base/test/fixtures/story.js',
  'jsx!shabu/public/js/components/users/mini_pill',
], function(_, q, sinon, React, Backbone, User, userFixture, storyFixtures, MiniPill) {

  var TU = React.addons.TestUtils;

  describe('Mini Pill', function() {
    var pill;
    var user;
    var currentUser;

    function generatePill(userOne, userTwo, props) {
      return TU.renderIntoDocument(new MiniPill(_.extend({
        user: userOne,
        currentUser: userTwo
      }, props)));
    }

    beforeEach(function() {
      user = new User(userFixture.me, {parse: true});
      currentUser = new User(userFixture.you, {parse: true});
    });

    it('will call a click handler if provided', function() {
      var spy = sinon.spy();
      pill = generatePill(user, currentUser, { onClick: spy });

      TU.Simulate.click(pill.getDOMNode());

      expect(spy.called).to.be(true);
      spy.reset();
    });

    it('will navigate on click if told to navigate', function() {
      var spy = sinon.spy(Backbone.history, 'navigate');
      pill = generatePill(user, currentUser, { shouldNavigate: true });

      TU.Simulate.click(pill.getDOMNode());

      expect(spy.called).to.be(true);
      spy.restore();
    });

  });
});
