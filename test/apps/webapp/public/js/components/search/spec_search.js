define([
  'q',
  'sinon',
  'react',

  'shared/js/models/collections/friends',
  'shared/js/models/collections/search_results',
  'shared/js/models/collections/recents',
  'shared/js/models/user',
  'shared/js/helpers/keycodes',

  'fixtures/collections/friends',
  'fixtures/collections/search',

  'jsx!shabu/public/js/components/search/search',
  'jsx!shabu/public/js/components/search/results',
  'jsx!shabu/public/js/components/search/search_result'
], function(q, sinon, React, FriendsCollection, 
            SearchResultsCollection, RecentsCollection, 
            User, keyCodes, friendsFixtures, searchFixtures, 
            SearchComponent, SearchResults, SearchResult) {

  var TU = React.addons.TestUtils;

  describe('Search Component', function() {
    var root;
    var search;
    var friends;
    var recents;
    var handleSelectionStub = sinon.stub();

    beforeEach(function() {
      friends = new FriendsCollection(friendsFixtures, { parse: true });
      recents = new RecentsCollection(friendsFixtures, { parse: true }).slice(0, 2);
      root = document.createElement('div');

      document.body.appendChild(root);

      search = React.renderComponent(new SearchComponent({
        friends: friends,
        recents: recents,
        user: new User(),
        onSelection: handleSelectionStub,
        onPayUser: sinon.spy(),
        onChargeUser: sinon.spy()
      }), root);

      sinon.stub(search.state.results, 'search').returns(q({}));
    });

    afterEach(function() {
      React.unmountComponentAtNode(root);
    });


    it('it can be rendered', function() {
      expect(search).to.be.ok();
    });

    it('updates query when the input changes', function() {
      var input = search.refs.input.getDOMNode();
      input.value = 'tobias';
      TU.Simulate.change(input);
      expect(search.state.query).to.be('tobias');
    });

    it('calls search() when the input changes', function() {
      search.state.results.search.restore();

      var mock = sinon.mock(search.state.results);
      mock.expects('search').once().withArgs('fooo').returns(q({}));

      var input = search.refs.input.getDOMNode();
      input.value = 'fooo';
      TU.Simulate.change(input);

      mock.verify();
    });

    it('filters friends when the input changes', function() {
      var result;

      var input = search.refs.input.getDOMNode();
      input.value = 'shreyans';
      TU.Simulate.change(input);
      TU.Simulate.focus(search.refs.input.getDOMNode());

      result = TU.findRenderedComponentWithType(search, SearchResult);
      expect(result.props.user.get('username')).to.be('shreyans');
    });

    it('will only display search results when the input is focused', function() {
      search.setState({query: 'foooo'});
      expect(search.refs.results).to.be(undefined);

      TU.Simulate.focus(search.refs.input.getDOMNode());
      expect(search.refs.results).to.be.ok();
    });

    it('displays recents when focused with an empty query', function() {
      var stub = sinon.stub(search, 'getRecents').returns(recents);
      TU.Simulate.focus(search.refs.input.getDOMNode());

      expect(TU.scryRenderedComponentsWithType(search, SearchResult).length).to.be(2);
      stub.restore();
    });

    describe('defaultQuery', function() {
      var friendsCollection = new FriendsCollection(searchFixtures, { parse: true });
      var currentUser;

      it('contains result for default query', function() {
        currentUser = friendsCollection.first();
        var root = document.createElement('div');
        var stub = sinon.stub(SearchResultsCollection.prototype, 'search').returns(q({}));

        var component = React.renderComponent(new SearchComponent({
          friends: friendsCollection,
          user: currentUser,
          onSelection: handleSelectionStub,
          onQueryChange: sinon.stub(),
          onFocus: sinon.stub(),
          onBlur: sinon.stub(),
          defaultQuery: 'Julian',
          displayUnregisteredUser: true,
          exit: sinon.stub()
        }), root);


        var results = component.getSearchResults();
        expect(results.length).to.be(4);
        React.unmountComponentAtNode(root);
        stub.restore();
      });

    });


    describe('#getSearchResults()', function() {
      var friendsCollection = new FriendsCollection(searchFixtures, { parse: true });
      var searchResultsCollection = new SearchResultsCollection(searchFixtures, { parse: true });
      var currentUser;
      var searchComponent;

      beforeEach(function() {
        currentUser = friendsCollection.first();

        searchComponent = TU.renderIntoDocument(new SearchComponent({
          friends: friendsCollection,
          user: currentUser,
          onSelection: handleSelectionStub,
          onQueryChange: sinon.stub(),
          onFocus: sinon.stub(),
          onBlur: sinon.stub(),
          displayUnregisteredUser: true,
          exit: sinon.stub()
        }));

        searchComponent.setState({ results: searchResultsCollection });
      });


      it('should remove duplicate entries between friends and search results', function() {
        var results = searchComponent.getSearchResults();
        results.forEach(function(user) {
          // if in friends && in results, then it should only appear in results once
          if ( friendsCollection.contains(user) && searchResultsCollection.contains(user) ) {
            // expect results to only contain user once
            expect(results.filter(function(resultUser) {
              return resultUser.get('id') === user.get('id');
            }).length).to.be(1);
          }
        });
      });

      it('should remove current user from search results', function() {
        var filteredList = searchComponent.removeDuplicates(searchResultsCollection.toArray());
        filteredList.forEach(function(user) {
          expect(user.get('id')).to.not.be(currentUser.get('id'));
        });
      });

      it('should include a result for a query that looks kinda like an email or phone', function() {
        var results;
        var isUnregistered = function(user) { return !user.get('id'); };

        // include no unregistered users for no match
        searchComponent.setState({ query: 'hello' });
        results = searchComponent.addUnregisteredUsers([]);
        expect(results.filter(isUnregistered).length).to.be(0);

        // show on @ sign
        searchComponent.setState({ query: 'me@' });
        results = searchComponent.addUnregisteredUsers([]);
        expect(results.filter(isUnregistered).length).to.be(1);
        expect(results.filter(isUnregistered)[0].get('email')).to.be('me@');

        // show on matching 3+ digits
        searchComponent.setState({ query: '555-' });
        results = searchComponent.addUnregisteredUsers([]);
        expect(results.filter(isUnregistered).length).to.be(1);
        expect(results.filter(isUnregistered)[0].get('phone')).to.be('555-');

        // show on matching 3+ digits with an @ as an email, not a phone
        searchComponent.setState({ query: '555@gmail.com' });
        results = searchComponent.addUnregisteredUsers([]);
        expect(results.filter(isUnregistered).length).to.be(1);
        expect(results.filter(isUnregistered)[0].get('email')).to.be('555@gmail.com');
      });
    });

    describe('selecting a user', function() {

      var user;

      beforeEach(function() {
        user = new User({data: friendsFixtures.data[0]}, {parse: true});
      });

      it('should clear the query after selecting a user', function() {
        search.handleSelection(user);
        expect(search.state.query).to.be('');
      });

      it('calls the passed handleSelection', function() {
        search.handleSelection(user);
        expect(search.props.onSelection.called).to.be(true);
      });

      it('clears the search results', function() {
        search.handleSelection(user);
        expect(search.refs.results).to.be(undefined);
      });

    });

    describe('keyboard control', function() {

      var resultsStub;

      function getEvent(keyCode) {
        return {
          keyCode: keyCode,
          preventDefault: sinon.spy()
        };
      }

      function setSelectedIndex(index, done) {
        if ( !done ) {
          done = function() {};
        }

        search.setState({ selectedIndex: index }, done);
      }

      beforeEach(function(done) {
        resultsStub = sinon.stub(search, 'getSearchResults').returns(recents);
        setSelectedIndex(0, done);
      });

      it('should handle select of the selected result on enter key', function() { 
        search.handleKeyDown(getEvent(keyCodes.RETURN));
        expect(handleSelectionStub.called).to.be(true);
      });

      it('should decrement selectedIndex within the bounds of results.length when hitting the up arrow', function() {
        setSelectedIndex(1);

        search.handleKeyDown(getEvent(keyCodes.UP_ARROW));
        expect(search.state.selectedIndex).to.be(0);

        search.handleKeyDown(getEvent(keyCodes.UP_ARROW));
        expect(search.state.selectedIndex).to.be(0);
      });

      it('should increment selectedIndex within the bounds of results.length when hitting the down arrow', function() {
        setSelectedIndex(recents.length - recents.length);

        search.handleKeyDown(getEvent(keyCodes.DOWN_ARROW));
        expect(search.state.selectedIndex).to.be(1);

        search.handleKeyDown(getEvent(keyCodes.DOWN_ARROW));
        expect(search.state.selectedIndex).to.be(1);
      });

      it('should set focus to false when escape is hit', function() {
        var input = search.refs.input.getDOMNode();
        var blurStub = sinon.stub(input, 'blur');
        search.handleKeyDown(getEvent(keyCodes.ESCAPE));
        expect(blurStub.called).to.be(true);
        expect(search.state.focus).to.be(false);
      });

    });

  });

});
