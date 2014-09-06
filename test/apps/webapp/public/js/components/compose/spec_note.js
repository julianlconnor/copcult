define([
  'underscore',
  'q',
  'sinon',
  'react',
  'shared/js/helpers/keycodes',
  'shared/js/models/api/user',
  'shared/js/models/api/transaction',
  'jsx!shabu/public/js/components/compose/note',
  'base/test/fixtures/user.js'
], function(_, q, sinon, React, keyCodes, User, Transaction,
            Note, userFixtures) {

  var TU = React.addons.TestUtils;

  describe('Compose Amount Component', function() {

    var user;
    var note;
    var transaction;
    var spy;
    var sampleNote = 'wooo weeee!';
    var handleRemoveRecipientStub = sinon.stub();

    beforeEach(function() {
      spy = sinon.spy();
      user = new User(userFixtures.me, { parse: true });
      transaction = new Transaction();
      transaction.addRecipient(user);
      transaction.set('amount', '1.00');

      note = TU.renderIntoDocument(new Note({
        exit: spy,
        user: user,
        transaction: transaction,
        onSubmit: sinon.stub().returns(q()),
        isSubmitting: false,
        onRemoveRecipient: handleRemoveRecipientStub,
        onReset: sinon.stub()
      }));
    });

    function simulateFormUsage() {
      var input = note.refs.input.refs.input.getDOMNode();
      input.value = sampleNote;

      TU.Simulate.submit(input);
    }

    it('sets note on the transaction on handleSubmit', function() {
      simulateFormUsage();
      expect(transaction.get('note')).to.be(sampleNote);
    });

    it('should call handleRemoveRecipient when clicking on the recipient', function() {
      var user = TU.findRenderedDOMComponentWithClass(note, 'mini-pill');
      TU.Simulate.click(user.getDOMNode());
      expect(handleRemoveRecipientStub.called).to.be(true);
    });

    it('invokes exit on `escape` keyDown', function() {
      expect(spy.called).to.be(false);
      note.handleKeyDown({ keyCode: keyCodes.ESCAPE, preventDefault: sinon.spy() });
      expect(spy.called).to.be(true);
    });

    it('displays an error if avail', function() {
      note = TU.renderIntoDocument(new Note({
        exit: spy,
        user: user,
        transaction: transaction,
        onSubmit: sinon.stub(),
        isSubmitting: false,
        onRemoveRecipient: handleRemoveRecipientStub,
        onReset: sinon.stub(),
        errorMessage: 'This is an error'
      }));

      TU.findRenderedDOMComponentWithClass(note, 'error');
    });

  });
});
