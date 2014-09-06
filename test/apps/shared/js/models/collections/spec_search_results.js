define([
  'q',
  'backbone',
  'expect',
  'sinon',
  'shared/js/models/collections/search_results',
  'shared/js/helpers/ajax',
  'fixtures/collections/search'
], function(q, Backbone, expect, sinon, SearchResultsCollection, ajax, searchFixtures) {

  describe('Search Results Collection', function() {

    var searchResults;
    var ajaxStub;

    beforeEach(function() {
      searchResults = new SearchResultsCollection();
    });

    it('instantiates', function() {
      expect(searchResults).to.be.ok();
    });

    it('sends the query along to ajax request', function(done) {
      ajaxStub = sinon.stub(Backbone, 'ajax', function(args) {
        expect(args.data.query).to.match(/foo/);
        ajaxStub.restore();
        done();
      });

      searchResults.search('foo');
    });

    it('will not make an empty search request', function() {
      ajaxStub = sinon.stub(Backbone, 'ajax', function(args) {
        return q(searchFixtures);
      });

      return searchResults.search('shrey').then(function() {
        expect(ajaxStub.called).to.be(true);
        ajaxStub.reset();
      }).then(function() {
        return searchResults.search(' ');
      }).then(function() {
        expect(ajaxStub.called).to.be(false);
      }).finally(function() {
        ajaxStub.restore();
      });

    });

  });

});

