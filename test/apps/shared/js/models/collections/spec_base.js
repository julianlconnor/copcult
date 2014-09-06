define([
  'expect',
  'sinon',
  'shared/js/models/collections/base',
  'fixtures/collections/search'
], function(expect, sinon, BaseCollection, searchFixture) {

  describe('Base Collection', function() {

    var base;

    beforeEach(function() {
      base = new BaseCollection();
    });

    it('instantiates', function() {
      expect(base).to.be.ok();
    });

    it('correctly parses API responses', function() {
      /**
      * Correctly parsing an API response involves stripping out the `data`
      * namespace for the entire response but re-injecting it for each child
      * model.
      */
      var results = base.parse(searchFixture);

      expect(results.data).to.not.be.ok();
      results.forEach(function(result) {
        expect(result.data).to.be.ok();
      });
    });

  });

});
