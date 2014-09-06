define([
  'q',
  'expect',
  'sinon',
  'shared/js/models/user',
  'base/test/fixtures/user.js',
  'base/test/fixtures/session.js',
], function(q, expect, sinon, UserModel, userFixtures, sessionFixtures) {

  describe('User Model', function() {
    var user;
    var server;

    beforeEach(function() {
      user = new UserModel();
      server = sinon.fakeServer.create();
      server.autoRespond = true;
      // set autoRespondAfter to 0 in order to skip the fucking stupid
      // default delay time of 10ms, 10ms delay / request slows down a test
      // suite
      server.autoRespondAfter = 0;
      q.longStackSupport = true;
    });

    afterEach(function() {
      server.restore();
    });

    it('instantiates', function() {
      expect(user).to.be.ok();
    });

    // Obviously this has less coverage of the specific regexes than we did before,
    // but I think we can trust them at this point
    it('validates a valid fixture', function() {
      user.set(userFixtures.valid);
      user.validate();
      expect(user.isValid()).to.be(true);
    });

    it('can return a profile url', function() {
      user.set('id', 'foo');
      user.set('username', 'julian');
      expect(user.getProfileURL()).to.be('/users/julian');
    });

    it('can return a users formatted balance', function() {
      user.set('balance', 2.8);
      expect(user.getFormattedBalance()).to.be('$2.80');
    });

    it('can tell us if page user is current user', function() {
      var julian = new UserModel(userFixtures.you, { parse: true });
      var kortina = new UserModel(userFixtures.me, { parse: true });

      expect(UserModel.isPageUser(julian, kortina)).to.be(false);
      expect(UserModel.isPageUser(julian, julian)).to.be(true);

      expect(UserModel.isPageUser(kortina, julian)).to.be(false);
      expect(UserModel.isPageUser(kortina, kortina)).to.be(true);
    });

    describe('login', function() {

      it('sets access token and id after login', function(done) {
        var response = [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify(sessionFixtures.success)
        ];
        server.respondWith('POST', '/account/login', response);

        user.createDjangoSession().done(function() {
          expect(user.get('accessToken')).to.be('foooo');
          expect(user.get('id')).to.be('123');
          done();
        });
      });

    });

    describe('formatters', function() {

      it('can generate a user\'s acronym', function() {
        user.set({
          firstName: 'Julian',
          lastName: 'Connor'
        });

        expect(user.getAcronym()).to.be('JC');
      });

    });

  });

});
