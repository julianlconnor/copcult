define([
  'q',
  'expect',
  'sinon',
  'shared/js/models/formatters/user',
  'shared/js/models/user',
  'shared/js/models/api/user'
], function(q, expect, sinon, UserFormatter, UserModel, ApiUserModel) {

  describe('User Model', function() {
    var user;
    var apiUser;

    beforeEach(function() {
      user = new UserModel();
      apiUser = new ApiUserModel();
    });

    it('can getProfilePicture for venmo urls', function() {
      var venmo = 'https://venmopics.appspot.com/u/v7/%size%/07b577fa-cc75-4933-b5af-eb98d28e670a';
      var sizes = [
        { small: 's', large: 'l' },
        { small: 'm', large: 'l' },
        { small: 'f', large: 'n' }
      ];

      sizes.forEach(function(size) {
        user.set('picture', venmo.replace('%size%', size.small));
        expect(user.getProfilePicture()).to.be(venmo.replace('%size%', size.small));
        expect(user.getProfilePictureLarge()).to.be(venmo.replace('%size%', size.large));
      });
    });

    it('can getProfilePicture for facebook urls', function() {
      /**
      * Facebook resource.
      */
      user.set('picture', 'https://graph.facebook.com/100003850208660/picture?type=large');
      expect(user.getProfilePicture()).to.be('https://graph.facebook.com/100003850208660/picture');
      expect(user.getProfilePictureLarge()).to.be('https://graph.facebook.com/100003850208660/picture?type=large');

      user.set('picture', 'https://graph.facebook.com/100003850208660/picture?type=square');
      expect(user.getProfilePicture()).to.be('https://graph.facebook.com/100003850208660/picture');
      expect(user.getProfilePictureLarge()).to.be('https://graph.facebook.com/100003850208660/picture?type=large');
    });

  });

});
