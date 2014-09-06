define([
  'underscore',
  'q',
  'sinon',
  'react',
  'shared/js/models/api/user',
  'base/test/fixtures/user.js',
  'jsx!shabu/public/js/views/profile_view',
], function(_, q, sinon, React, User, userFixture, ProfileView) {

  var TU = React.addons.TestUtils;

  describe('Profile View', function() {
    var profileUser;
    var currentUser;
    var profile;

    beforeEach(function() {
      profileUser = new User(userFixture.apiYou, { parse: true });
      currentUser = new User(userFixture.me, { parse: true });

      profile = TU.renderIntoDocument(new ProfileView({
        currentUser: currentUser,
        friends: {},
        profileUser: profileUser
      }));
    });

    it('fetches user on successfull cashout', function() {
      var stub = sinon.stub(currentUser, 'fetch').returns(q('success'));
      profile.handleCashout();
      expect(stub.called).to.be(true);
    });

  });
});
