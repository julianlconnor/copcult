define([
  'q',
  'expect',
  'sinon',
  'shared/js/models/api/user',
  'base/test/fixtures/user.js'
], function(q, expect, sinon, User, userFixtures) {

  describe('API User Model', function() {
    var user;

    it('strips externalId and sets id', function() {
      var user = new User(userFixtures.me, { parse: true });

      expect(user.get('id')).to.be(userFixtures.me.data.external_id);
      expect(user.get('externalId')).to.not.be.ok();
    });

  });

});
