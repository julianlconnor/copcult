define([
  'sinon',
  'react',
  'shared/js/models/user',
  'jsx!shabu/public/js/components/search/search_result'
], function(sinon, React, User, SearchResult) {

  var TU = React.addons.TestUtils;

  describe('Search Result Component', function() {

    it('properly pluralizes mutual friends string', function() {

      var searchResult = TU.renderIntoDocument(new SearchResult({
        user: new User({
          mutualFriendsIds: [1]
        }),
        handleSelection: function() {},
        active: true,
        onPayUser: sinon.spy(),
        onChargeUser: sinon.spy()
      }));

      expect(searchResult.getDOMNode().querySelector('.num-mutual').innerHTML).to.be('1 mutual friend');

      searchResult = TU.renderIntoDocument(new SearchResult({
        user: new User({
          mutualFriendsIds: [1, 2]
        }),
        handleSelection: function() {},
        active: true,
        onPayUser: sinon.spy(),
        onChargeUser: sinon.spy()
      }));

      expect(searchResult.getDOMNode().querySelector('.num-mutual').innerHTML).to.be('2 mutual friends');
    });

  });
});

