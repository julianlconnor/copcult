define([
  'underscore',
  'q',
  'sinon',
  'react',

  'shared/js/models/user',
  'shared/js/models/api/transaction',
  'shared/js/models/collections/friends',

  'fixtures/collections/friends',
  'fixtures/transaction',
  'base/test/fixtures/user.js',

  'jsx!shabu/public/js/components/compose/compose',
  'jsx!shabu/public/js/components/search/search',
  'jsx!shabu/public/js/components/compose/amount',
  'jsx!shabu/public/js/components/compose/note'
], function(_, q, sinon, React, User, Transaction, FriendsCollection,
            friendsFixtures, transactionFixture, userFixture,
            Compose, Search, Amount, Note) {

  var TU = React.addons.TestUtils;

  describe('Compose Component', function() {

    var user;
    var compose;
    var friends;
    var transaction;

    beforeEach(function() {
      user = new User(userFixture.me, {parse: true});
      friends = new FriendsCollection(friendsFixtures, {parse: true});
      transaction = new Transaction();

      compose = TU.renderIntoDocument(new Compose({
        friends: friends,
        user: user,
        onMadePayment: sinon.stub(),
        transaction: transaction,
        recents: friends
      }));

    });

    function removeRecipient(txn) {
      var recipient = txn.getRecipients()[0];
      txn.removeRecipient(recipient);
    }

    function removeAmount(txn) {
      txn.set({ amount: 0 });
    }

    function transitionToAmount(txn) {
      txn.addRecipient(new User(userFixture.you, { parse: true }));
    }

    function transitionToNote(txn) {
      transitionToAmount(txn);
      txn.set('amount', '1.00');
    }

    function transitionToReady(txn) {
      transitionToNote(txn);
      txn.set('note', 'hello, I am a banana');
    }

    it('wipes the transaction on `clearTransaction`', function() {
      var spy = sinon.spy(transaction, 'wipe');

      expect(spy.called).to.be(false);
      compose.clearTransaction();
      expect(spy.called).to.be(true);
    });

    describe('State Changes', function() {

      it('should enter the `search` state when there is no user, amount, or note', function() {
        expect(compose.getCurrentStep()).to.be('search');
      });

      it('should enter the `amount` state when there is a user but no amount or note', function() {
        transitionToAmount(transaction);
        expect(compose.getCurrentStep()).to.be('amount');
      });

      it('should enter the `note` state when there is a user and an amount but no note', function() {
        transitionToNote(transaction);
        expect(compose.getCurrentStep()).to.be('note');
      });

      it('should enter the `ready` state when there is a user, an amount, and a note', function() {
        transitionToReady(transaction);
        expect(compose.getCurrentStep()).to.be('ready');
      });

    });


    function expectComponentRender(component, parentComponent) {
      expect(TU.findRenderedComponentWithType).withArgs(parentComponent, component)
        .to.not.throwException();
    }

    describe('linear flow', function() {
      /**
      * These tests refer to linear progression through compose.
      */

      it('should render a `Search` component when in the `search` state', function() {
        expect(TU.findRenderedComponentWithType).withArgs(compose, Search)
            .to.not.throwException();
      });

      it('should render an `Amount` component when in the `amount state', function() {
        transitionToAmount(transaction);
        expectComponentRender(Amount, compose);
      });

      it('should render an `Note` component when in the `note` state', function() {
        transitionToNote(transaction);
        expectComponentRender(Note, compose);
      });
    });

    describe('non-linear flow', function() {
      /**
      * All theseam tests refer to a non-linear progression through compose.
      */

      var user;
      var compose;
      var friends;
      var transaction;
      var root;

      beforeEach(function() {
        user = new User(userFixture.me, {parse: true});
        friends = new FriendsCollection(friendsFixtures, {parse: true});
        transaction = new Transaction();
        root = document.createElement('div');

        compose = React.renderComponent(new Compose({
          friends: friends,
          user: user,
          onMadePayment: sinon.stub(),
          transaction: transaction,
          recents: friends
        }), root);
      });

      afterEach(function() {
        React.unmountComponentAtNode(root);
      });

      it('is capable of transitioning back and forth between `search` and `amount` states', function() {
        transitionToAmount(transaction);
        removeRecipient(transaction);
        expectComponentRender(Search, compose);
      });

      it('is capable of transitioning back and forth between `note` and `search` states', function() {
        transitionToNote(transaction);
        removeRecipient(transaction);
        expectComponentRender(Search, compose);
      });

      it('is capable of transitioning back and forth between `note` and `amount` states', function() {
        transitionToNote(transaction);
        expectComponentRender(Note, compose);
        removeAmount(transaction);
        expectComponentRender(Amount, compose);
      });

    });
  });
});
