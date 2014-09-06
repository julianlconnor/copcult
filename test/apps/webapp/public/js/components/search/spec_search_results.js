define([
  'sinon',
  'react',
  'backbone',
  'underscore',

  'shared/js/models/user',
  'jsx!shabu/public/js/components/search/results',
  'shared/js/models/collections/friends',
  'shared/js/models/collections/search_results',

  'fixtures/collections/search',
  'jsx!shabu/public/js/components/search/search_result'
], function(sinon, React, Backbone, _, User, SearchResultsComponent, FriendsCollection,
            SearchResultsCollection, searchFixtures, SearchResult) {

  var TU = React.addons.TestUtils;

  describe('Search Results Component', function() {

    it('will only call handleSelection for an unregistered user if valid email or phone', function() {
      var handleSelectionStub = sinon.stub();
      var searchResults = TU.renderIntoDocument(new SearchResultsComponent({
        results: [],
        user: new User(),
        displayUnregisteredUser: true,
        handleSelection: handleSelectionStub
      }));

      // invalid phones
      ['', '555', '555-555', '555--5555', '555555', '55555555'].forEach(function(phone) {
        var testUser = new User({ phone: phone }, { parse: true });
        searchResults.handleSelection(testUser);
        expect(handleSelectionStub.called).to.be(false);
      });

      // invalid emails
      ['dude', 'dude@', 'dudecom', '@dude@', 'dude.com'].forEach(function(email) {
        var testUser = new User({ email: email }, { parse: true });
        searchResults.handleSelection(testUser);
        expect(handleSelectionStub.called).to.be(false);
      });


      // valid phones
      var validPhones = ['5555555555', '5555555', '555-5555', '555-555-5555', '1-555-555-5555'];
      validPhones.forEach(function(phone) {
        var testUser = new User({ phone: phone }, { parse: true });
        searchResults.handleSelection(testUser);
        expect(handleSelectionStub.called).to.be(true);
      });

      // valid emails
      ['dude@dude.com', 'dude.dude@dude.com', 'dude@dude.edu'].forEach(function(email) {
        var testUser = new User({ email: email }, { parse: true });
        searchResults.handleSelection(testUser);
        expect(handleSelectionStub.called).to.be(true);
      });
    });

    it('can limit the number of results it displays', function() {
      var results = [new User(), new User(), new User()];

      [0, 1, 2, 3, 4, 5].forEach(function(max) {
        var searchResults = TU.renderIntoDocument(new SearchResultsComponent({
          results: results,
          user: new User(),
          displayUnregisteredUser: true,
          handleSelection: sinon.stub(),
          maxDisplayCount: max
        }));

        var rendered = TU.scryRenderedComponentsWithType(searchResults, SearchResult);
        expect(rendered.length <= max).to.be(true);
      });

    });

  });
});

