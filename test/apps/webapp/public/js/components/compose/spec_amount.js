define([
  'underscore',
  'q',
  'sinon',
  'react',
  'backbone',

  'shared/js/helpers/keycodes',
  'shared/js/models/user',
  'shared/js/models/api/transaction',

  'jsx!shabu/public/js/components/users/mini_pill',
  'jsx!shabu/public/js/components/compose/amount',
  'jsx!shabu/public/js/components/compose/note',

  'base/test/fixtures/user.js'
], function(_, q, sinon, React, Backbone, keyCodes, User, 
            Transaction, MiniPill, Amount, Note, userFixtures) {

  var TU = React.addons.TestUtils;

  describe('Compose Amount Component', function() {

    var user;
    var stub;
    var amount;
    var transaction;
    var onRemoveRecipient = sinon.spy();
    var onReset = sinon.stub();
    var spy;

    beforeEach(function() {
      spy = sinon.spy();
      stub = sinon.stub(Transaction.prototype, 'preValidate').returns('');
      user = new User(userFixtures.me, { parse: true });
      transaction = new Transaction();
      transaction.addRecipient(user);

      amount = TU.renderIntoDocument(new Amount({
        onRemoveRecipient: onRemoveRecipient,
        onReset: onReset,
        transaction: transaction,
        exit: spy,
        user: new User()
      }));
    });

    afterEach(function() {
      stub.restore();
      onRemoveRecipient.reset();
    });

    function simulateFormUsage() {
      var input = amount.refs.amount.getDOMNode();
      input.value = '1.00';

      TU.Simulate.submit(input);
    }

    it('sets amount on the transaction on handleSubmit', function() {
      simulateFormUsage();
      expect(transaction.get('amount')).to.be('1.00');
    });

    it('calls preValidate before set', function() {
      simulateFormUsage();
      expect(stub.called).to.be(true);
    });

    it('adds class invalid if isValid returns false', function() {
      stub.returns('INVALID!');
      simulateFormUsage();
      expect(amount.refs.amountWrapper.getDOMNode().classList.contains('invalid')).to.be(true);
    });

    it('should not navigate when clicking on the recipient', function() {
      var spy = sinon.spy(Backbone.history, 'navigate');
      var user = TU.findRenderedComponentWithType(amount, MiniPill);

      TU.Simulate.click(user.getDOMNode());
      expect(spy.called).to.be(false);

      spy.restore(); 
    });

    it('invokes exit on `escape` keyDown', function() {
      expect(spy.called).to.be(false);
      amount.handleKeyDown({ keyCode: keyCodes.ESCAPE, preventDefault: sinon.spy() });
      expect(spy.called).to.be(true);
    });
  });
});
