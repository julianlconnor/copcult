define([
  'q',
  'sinon',
  'react',

  'jsx!shabu/public/js/views/home_view',
  'jsx!shabu/public/js/components/feed/story_detail',
  'jsx!shabu/public/js/components/feed/story',

  'shared/js/models/user',
  'shared/js/models/collections/friends',
  'shared/js/models/collections/notifications',

  'base/test/fixtures/collections/stories.js',

  'shared/js/models/api/collections/stories'
], function(q, sinon, React, HomeView, StoryDetail, Story, User, Friends,
            Notifications, storiesFixtures, Stories) {

  describe('Home View', function() {

    var TU = React.addons.TestUtils;
    var storiesCollection;

    beforeEach(function() {
      storiesCollection = new Stories(storiesFixtures, {parse: true});
    });

    it('refreshes the feed and current user when a payment is made', function() {

      var stories = new Stories();

      var homeViewComponent = new HomeView({
        currentUser: new User(),
        feed: stories,
        friends: new Friends(),
        recents: new Friends(),
        notifications: new Notifications()
      });

      // Don't render <AppWrapper> because it has side effects
      // TODO(tboyt): React warns when you do this, and ideally we would stub out the <AppWrapper>
      // module. However, the jsx! filter fucks up defineTests's loading system because it makes
      // loading async, so the test isn't actually loaded with the rest of the tests (and thus you
      // can't do .only, etc.). This should be changed once we move off of RequireJS filters for
      // building.
      homeViewComponent.render = function() { return React.DOM.span(); };

      var homeView = TU.renderIntoDocument(homeViewComponent);

      var userFetchStub = sinon.stub(homeView.props.currentUser, 'fetch');
      var storiesFetchNextPageStub = sinon.stub(homeView.state.feed, 'fetchNextPage')
                                        .returns(q({}));
      var storiesFetchStub = sinon.stub(homeView.state.feed, 'fetch');

      homeView.handleMadePayment();

      expect(storiesFetchStub.called).to.be(true);
      expect(userFetchStub.called).to.be(true);

      storiesFetchStub.restore();
      storiesFetchNextPageStub.restore();
      userFetchStub.restore();
    });

    it('should be able to open up a detail component with a story', function() {
      var homeView = TU.renderIntoDocument(new HomeView({
        currentUser: new User({
          balance: 1
        }),
        friends: new Friends(),
        feed: storiesCollection,
        recents: new Friends(),
        notifications: new Notifications()
      }));

      homeView.handleSelection(storiesCollection.first());
      expect(TU.findRenderedComponentWithType)
        .withArgs(homeView, StoryDetail).to.not.throwException();
    });

    it('should be able to close the detail view', function() {
      var user = new User({ balance: 1 });
      sinon.stub(storiesCollection, 'fetchNextPage').returns(q('success'));
      var homeView = TU.renderIntoDocument(new HomeView({
        currentUser: user,
        friends: new Friends(),
        feed: storiesCollection,
        recents: new Friends(),
        notifications: new Notifications()
      }));

      homeView.handleSelection(storiesCollection.first());
      homeView.handleDetailClose();

      expect(TU.findRenderedComponentWithType)
        .withArgs(homeView, StoryDetail).to.throwException();
    });

  });

});
