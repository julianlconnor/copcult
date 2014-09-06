define([
  'sinon',
  'react',
  'shared/js/models/api/user',
  'jsx!shabu/public/js/components/users/friend_button',
], function(sinon, React, User, FriendButton) {

  var TU = React.addons.TestUtils;

  describe('Friend Button', function() {

    it('renders', function() {
      var user = new User();
      var button = TU.renderIntoDocument(new FriendButton({ user: user }));
      expect(button).to.be.ok();
    });

  });
});
