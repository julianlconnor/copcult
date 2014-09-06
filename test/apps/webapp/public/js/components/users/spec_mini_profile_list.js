define([
  'expect',
  'sinon',
  'q',
  'react',
  'base/test/fixtures/recents.js',
  'shared/js/models/collections/recents',
  'jsx!shabu/public/js/components/users/mini_profile_list',
  'jsx!shabu/public/js/components/users/mini_profile'
], function(expect, sinon, q, React, recentsFixture, RecentsCollection,
            MiniProfileListComponent, MiniProfileComponent) {

  describe('mini profile list component', function() {
    var TU = React.addons.TestUtils;

    var recentsCollection;

    beforeEach(function() {
      recentsCollection = new RecentsCollection(recentsFixture);
    });

    it('should contain a mini profile component for each user in the collection', function() {
      var recentUserComponents;

      var recentsComponent = TU.renderIntoDocument(new MiniProfileListComponent({
        collection: recentsCollection.toArray(),
        handleSelection: function() {}
      }));
      
      recentUserComponents = 
          TU.scryRenderedComponentsWithType(recentsComponent, MiniProfileComponent);
      expect(recentUserComponents.length).to.be(recentsCollection.length);
    });

    it('should handle click on subcomponents with user model', function(done) {
      var recentsComponent = TU.renderIntoDocument(new MiniProfileListComponent({
        collection: recentsCollection.toArray(),
        handleSelection: function(user) {
          expect(user instanceof recentsCollection.model).to.be(true);
          done();
        }
      }));

      var recentUserComponents = 
          TU.scryRenderedComponentsWithType(recentsComponent, MiniProfileComponent);
      TU.Simulate.mouseDown(recentUserComponents[0].getDOMNode());
    });
  });

});
