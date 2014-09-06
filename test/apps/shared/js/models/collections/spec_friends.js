define([
  'expect',
  'sinon',
  'underscore',
  'shared/js/models/collections/friends',
  'fixtures/collections/friends',
], function(expect, sinon, _, Friends, friendsFixtures) {

  describe('Friends Collection', function() {

    var friends;

    beforeEach(function() {
      friends = new Friends(friendsFixtures, {parse: true});
    });

    describe('local search', function() {

      it('filters over first or last name prefix', function() {
        var results = friends.search('s');

        var containsKortina = _.any(results, function(user) {
          return user.get('lastName') === 'Bhansali';
        });

        expect(containsKortina).to.be(true);

        var containsKriti = _.any(results, function(user) {
          return user.get('firstName') === 'Kriti';
        });

        expect(containsKriti).to.be(true);
      });

      it('should return an exact result for both pieces', function() {

        friends.set([{
          firstName: 'Lucas',
          lastName: 'Whatever'
        }, {
          firstName: 'Lucas',
          lastName: 'Chi'
        }]);

        var results = friends.search('Lucas Chi');
        expect(results.length).to.be(1);
        expect(results[0].get('lastName')).to.be('Chi');
      });

      it('should return no results for an empty string', function() {
        var results = friends.search('');
        expect(results.length).to.be(0);
      });

    });

    describe('caching', function() {

      it('can cache a friends collection', function() {
        var spy = sinon.spy(Friends.prototype, 'fetch');

        Friends.fetchCurrentFriends();
        Friends.fetchCurrentFriends();

        expect(spy.called).to.be(true);
        expect(spy.callCount).to.be(1);

        spy.restore();
      });

    });

  });

});

