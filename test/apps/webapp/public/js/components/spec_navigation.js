define([
  'react',
  'jquery',
  'backbone',
  'sinon',
  'q',
  'shared/js/models/api/user',
  'shared/js/models/collections/notifications',
  'jsx!shabu/public/js/components/navigation',
  'base/test/fixtures/user.js',
  'base/test/fixtures/notifications.js'
], function(React, $, Backbone, sinon, q, User, Notifications, Navigation,
            userFixtures, notificationsFixture) {

  var TU = React.addons.TestUtils;
  var navigationComponent;

  describe('navigation component', function() {
    var user = new User(userFixtures.me, { parse: true });

    it('should render a bunch of links', function() {
      navigationComponent = TU.renderIntoDocument(new Navigation({
        currentUser: user,
        notifications: new Notifications()
      }));
      var links = TU.scryRenderedDOMComponentsWithTag(navigationComponent, 'li');
      expect(links.length).to.be.ok();
    });

    it('should default the `activity` link to active', function() {
      navigationComponent = TU.renderIntoDocument(new Navigation({
        currentUser: user,
        notifications: new Notifications()
      }));
      var links = TU.scryRenderedDOMComponentsWithTag(navigationComponent, 'li');
      links.forEach(function(link) {
        var el = link.getDOMNode();

        if ( el.classList.contains('activity') ) {
          expect(el.classList.contains('active')).to.be(true);
        } else {
          expect(el.classList.contains('active')).to.be(false);
        }
      });
    });

    it('should set the activeRoute to active', function() {
      ['people', 'activity', 'settings'].forEach(function(activeRoute) {
        navigationComponent = TU.renderIntoDocument(new Navigation({
          currentUser: user,
          activeRoute: activeRoute,
          notifications: new Notifications()
        }));
        var links = TU.scryRenderedDOMComponentsWithTag(navigationComponent, 'li');
        links.forEach(function(link) {
          var el = link.getDOMNode();

          if ( el.classList.contains(activeRoute) ) {
            expect(el.classList.contains('active')).to.be(true);
          } else {
            expect(el.classList.contains('active')).to.be(false);
          }
        });
      });
    });

    it('points a `You` link to the right resource', function() {
      var user = new User(userFixtures.you, { parse: true });
      navigationComponent = TU.renderIntoDocument(new Navigation({
        currentUser: user,
        notifications: new Notifications()
      }));

      var item = TU.findRenderedDOMComponentWithClass(navigationComponent, 'you');
      var link = TU.findRenderedDOMComponentWithTag(item, 'a');

      expect(link.getDOMNode().pathname).to.be('/users/' + user.get('username'));
    });

    describe('account balance and notification polling', function() {

      var currentUser = new User(userFixtures.you, { parse: true });
      var notifications = new Notifications();

      beforeEach(function() {
        navigationComponent = TU.renderIntoDocument(new Navigation({
          currentUser: currentUser,
          notifications: notifications,
          refreshInterval: 5000
        }));
      });

      it('updates notification count when a new notification occurs', function(done) {
        var numNotifications = notificationsFixture.data.length;
        sinon.stub(notifications, 'fetch').returns(q(notificationsFixture));

        var count = navigationComponent.getDOMNode()
                     .querySelector('.notifications-count')
                     .innerText;

        expect(count).to.be('0');

        navigationComponent.updateNotificationCount().then(function() {
          expect(navigationComponent.getDOMNode().querySelector('.notifications-count').innerText)
              .to.be(numNotifications.toString());
          done();
        })
        .fail(function(error) {
          done(error);
        });
      });

      it('updates account balance when it changes', function() {
        expect(navigationComponent.getDOMNode().querySelector('.balance').innerText).to.be('$0.80');

        currentUser.set('balance', 2.8);
        navigationComponent.updateBalance();

        TU.nextUpdate(navigationComponent, function() {
          expect(navigationComponent.getDOMNode().querySelector('.balance').innerText)
              .to.be('$2.80');
        });
      });
    });

  });

});
