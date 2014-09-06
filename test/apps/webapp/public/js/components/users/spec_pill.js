define([
  'underscore',
  'q',
  'sinon',
  'react',
  'shared/js/models/user',
  'base/test/fixtures/user.js',
  'jsx!shabu/public/js/components/users/pill',
], function(_, q, sinon, React, User, userFixture, Pill) {

  var TU = React.addons.TestUtils;

  describe('Pill Component', function() {
    var spy;
    var pill;
    var user;

    beforeEach(function() {
      spy = sinon.spy();
      user = new User(userFixture.me, {parse: true});
      pill = TU.renderIntoDocument(new Pill({
        user: user,
        handleClose: spy
      }));
    });

    it('fires a callback when a pill is deleted', function() {
      TU.Simulate.click(pill.refs.close.getDOMNode());
      expect(spy.called).to.be(true);
    });

  });
});
