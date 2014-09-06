defineTest([
  'sinon',
  'q',
  'underscore',
  'react',
  'shared/js/models/api/collections/stories',
  'shared/js/models/api/user',
  'shared/js/models/api/story',
  'fixtures/collections/stories',
  'jsx!shabu/public/js/components/feed/feed',
  'jsx!shabu/public/js/components/feed/story',
  'shared/js/helpers/ajax',
], {
  mocks: {'shared/js/helpers/ajax': 'test/mocks/mock_ajax'}
}, function(sinon, q, _, React, StoriesCollection, UserModel, StoryModel,
            storiesFixture, Feed, Story, ajax) {

  var TU = React.addons.TestUtils;

  describe('Feed Component', function() {

    var storiesCollection;
    var fetchStub;

    beforeEach(function() {
      storiesCollection = new StoriesCollection(storiesFixture, {parse: true});
      fetchStub = sinon.stub(storiesCollection, 'fetchNextPage');
      fetchStub.returns(q('success'));
    });

    afterEach(function() {
      fetchStub.restore();
    });

    it('fetches the feed', function() {
      var stories = new StoriesCollection();
      var stub = sinon.stub(stories, 'fetchNextPage').returns(q('ok'));

      TU.renderIntoDocument(new Feed({
        currentUser: new UserModel(),
        feed: stories,
        onSelection: sinon.spy()
      }));

      expect(stub.called).to.be(true);
    });

    describe('rendering stories', function() {
      it('renders a story for each item in the feed', function() {
        var feed = TU.renderIntoDocument(new Feed({
          currentUser: new UserModel(),
          feed: storiesCollection,
          onSelection: sinon.spy()
        }));
        feed.setState({ fetching: false });

        expect(TU.scryRenderedComponentsWithType(feed, Story).length)
          .to.be(storiesCollection.length);
      });

      it('renders a loading placeholder while loading and removes it once loaded', function() {
        // NOTE: only when we are loading a feed that has no story data to begin with
        var feed = TU.renderIntoDocument(new Feed({
          currentUser: new UserModel(),
          feed: new StoriesCollection(),
          onSelection: sinon.spy()
        }));

        feed.setState({ fetching: true });
        expect(feed.refs.initialLoadingSpinner).to.be.ok();

        feed.setState({ fetching: false });
        expect(feed.refs.feedList).to.be.ok();
      });
    });

    describe('load more link', function() {
      var feed;

      beforeEach(function() {
        feed = TU.renderIntoDocument(new Feed({
          currentUser: new UserModel(),
          feed: storiesCollection,
          onSelection: sinon.spy()
        }));
        feed.setState({ fetching: false });
      });

      it('is in the markup', function() {
        expect(feed.refs.loadMore).to.be.ok();
      });

      it('calls fetchNextPage when clicked', function() {
        fetchStub.reset();
        TU.Simulate.click(feed.refs.loadMore.getDOMNode());
        expect(fetchStub.called).to.be(true);
      });

      it('displays "no more items" when there are no more items to load', function(done) {
        fetchStub.restore();
        ajax.returns(q({ data: [] }));

        TU.Simulate.click(feed.refs.loadMore.getDOMNode());
        TU.nextUpdate(feed, function() {
          expect(feed.refs.noMoreItems).to.be.ok();
          ajax.reset();
          done();
        });
      });

    });

    describe('loading errors', function() {
      it('displays an error if the feed fails to load', function(done) {
        var stories = new StoriesCollection();
        var stub = sinon.stub(stories, 'fetchNextPage').returns(q.reject('err'));
        var feed = TU.renderIntoDocument(new Feed({
          currentUser: new UserModel(),
          feed: stories,
          onSelection: sinon.spy()
        }));

        TU.nextUpdate(feed, function() {
          TU.nextUpdate(feed, function() {
            expect(feed.refs.initialLoadingSpinner).to.be(undefined);
            expect(feed.refs.error).to.be.ok();
            done();
          });
        });

      });

      it('fetches the feed when you click retry', function(done) {
        var stories = new StoriesCollection();
        var stub = sinon.stub(stories, 'fetchNextPage').returns(q.reject('err'));
        var feed = TU.renderIntoDocument(new Feed({
          currentUser: new UserModel(),
          feed: stories,
          onSelection: sinon.spy()
        }));
        feed.setState({ fetching: false });

        TU.nextUpdate(feed, function() {
          TU.nextUpdate(feed, function() {
            stub.reset();
            stub.returns(q(storiesFixture));
            TU.Simulate.click(feed.refs.retry);

            TU.nextUpdate(feed, function() {
              expect(stub.called).to.be(true);
              var renderedStories = TU.scryRenderedComponentsWithType(feed, Story);
              expect(renderedStories.length).to.be(feed.props.feed.length);
              done();
            });
          });
        });

      });
    });

    it('should handle selected feed items', function(done) {
      var feed = TU.renderIntoDocument(new Feed({
        currentUser: new UserModel(),
        feed: storiesCollection,
        onSelection: function(story) {
          expect(story.get('storyId')).to.be(storiesCollection.first().get('storyId'));
          done();
        }
      }));
      feed.setState({ fetching: false });
      
      var stories = TU.scryRenderedComponentsWithType(feed, Story);
      TU.Simulate.click(stories[0].getDOMNode());
    });

    it('should highlight the item that corresponds to selectedStory', function() {
      /*
      * Highlight === activate.
      */
      var feed = TU.renderIntoDocument(new Feed({
        currentUser: new UserModel(),
        feed: storiesCollection,
        onSelection: function() {},
        selectedStory: storiesCollection.at(0)
      }));
      feed.setState({ fetching: false });

      var stories = TU.scryRenderedComponentsWithType(feed, Story);
      expect(stories[0].props.isActive).to.be(true);
    });

   });
});
