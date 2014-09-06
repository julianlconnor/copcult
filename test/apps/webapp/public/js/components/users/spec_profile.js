define([
  'underscore',
  'q',
  'sinon',
  'react',

  'shared/js/models/api/user',

  'base/test/fixtures/user.js',

  'jsx!shabu/public/js/components/users/profile',
  'jsx!shabu/public/js/components/feed/feed'

], function(_, q, sinon, React, User, userFixture, Profile, Feed) {

  var TU = React.addons.TestUtils;

  describe('Profile Component', function() {
    var user;
    var currentUser;
    var profile;

    beforeEach(function() {
      user = new User(userFixture.me, { parse: true });
      currentUser = new User(userFixture.apiYou, { parse: true });

      profile = TU.renderIntoDocument(new Profile({
        user: user,
        currentUser: currentUser,
        onStorySelection: sinon.stub()
      }));
      profile.setState({ fetching: false });
    });

    it('renders a profile feed', function() {
      expect(TU.findRenderedComponentWithType).withArgs(profile, Feed)
          .to.not.throwException();
    });

    it('resets state on successful payment', function() {
      TU.Simulate.click(profile.refs.pay.getDOMNode());
      expect(profile.state.paymentType).to.be('payment');
      profile.handleMadePayment();
      expect(profile.state.paymentType).to.be(null);
    });

  });
});
