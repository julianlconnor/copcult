define([
  'expect',
  'sinon',
  'react',
  'jsx!shabu/public/js/components/users/avatar',
  'shared/js/models/user',
  'shared/js/helpers/constants'
], function(expect, sinon, React, Avatar, User, constants) {

  var TU = React.addons.TestUtils;

  describe('Avatar Component', function() {

    it('can generate a fallback avatar', function(done) {
      var avatar = TU.renderIntoDocument(new Avatar({ 
        user: new User({ picture: 'lol/not-an-image.asdf' })
      }));

      TU.nextUpdate(avatar, function() {
        expect(avatar.state.generateAvatar).to.be(true);
        done();
      });
    });

  });

});
