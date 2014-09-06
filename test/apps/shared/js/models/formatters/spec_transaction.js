defineTest([
  'expect',
  'sinon',
  'q',
  'shared/js/models/api/transaction',
  'fixtures/transaction',
  'shared/js/models/user',
  'shared/js/helpers/ajax',
], {
  mocks: { 'shared/js/helpers/ajax': 'test/mocks/mock_ajax' }
}, function(expect, sinon, q, Transaction, transactionFixture, User, ajax) {

  describe('Transaction Model', function() {

    var transaction;
    var user;

    var testValidate = function(attr, val) {
      /*
      * preValidate returns truthy value if invalid and falsy if valid. Much
      * easier to deal with the inverse.
      */
      return !transaction.preValidate(attr, val);
    };

    beforeEach(function() {
      user = new User({
        'id': '1234'
      });
      transaction = new Transaction({ });

    });

    describe('validation', function() {

      it('only accepts valid amounts', function() {
        expect(testValidate('amount', '10')).to.be(true);
        expect(testValidate('amount', '0.10')).to.be(true);
        expect(testValidate('amount', '10.00')).to.be(true);
        expect(testValidate('amount', '9999.99')).to.be(true);
        expect(testValidate('amount', '9,999.99')).to.be(true);
        expect(testValidate('amount', '99,999.99')).to.be(true);
        expect(testValidate('amount', '999,999.99')).to.be(true);
        expect(testValidate('amount', '11111111.00')).to.be(true);

        expect(testValidate('amount', '99f.99')).to.be(false);
        expect(testValidate('amount', '99.999')).to.be(false);
        expect(testValidate('amount', '0.00')).to.be(false);
        expect(testValidate('amount', '00.00')).to.be(false);
        expect(testValidate('amount', '-1.00')).to.be(false);
        expect(testValidate('amount', 'burb')).to.be(false);
        expect(testValidate('amount', 'as.df')).to.be(false);
        expect(testValidate('amount', '1,,,,1')).to.be(false);
        expect(testValidate('amount', '1,00')).to.be(false);
        expect(testValidate('amount', '11111,111.00')).to.be(false);
      });

      it('requires a note', function() {
        expect(testValidate('note', '')).to.be(false);
        expect(testValidate('note', 'something')).to.be(true);
      });

      it('requires recipients', function() {
        expect(testValidate('recipients', [])).to.be(false);
        expect(testValidate('recipients', [new User()])).to.be(true);
      });

    });

    it('successfully serializes a given set of attributes', function() {
      transaction.addRecipient(user);
      transaction.set({ amount: '1.01', note: 'hello' });

      var serialized = transaction.serialize();

      expect(serialized).to.be.eql([{
        user_id: '1234',
        amount: 1.01,
        note: 'hello'
      }]);
    });

    it('parses a server response', function() {
      var resp = transactionFixture.paymentResponse;

      var attrs = transaction.parse(resp);

      expect(attrs).to.be.eql({
        "status": "settled",
        "refund": null,
        "medium": "api",
        "dateCompleted": "2014-03-28T00:51:02.594638",
        "audience": "public",
        "note": "hi",
        "amount": 0.01,
        "fee": null,
        "action": "pay",
        "dateCreated": "2014-03-28T00:51:02.524998",
        "id": "1385796888350950353"
      });
    });

    it('can add recipients to the transaction', function() {
      var userOne = new User({ name: 'Julian' });
      var userTwo = new User({ name: 'Thomas' });

      transaction.addRecipient(userOne);
      transaction.addRecipient(userTwo);

      expect(transaction.getRecipients().length).to.be(2);
    });

    it('will not add a duplicate recipient to the transaction', function() {
      var liam = new User({ name: 'Liam' });
      transaction.addRecipient(liam);
      transaction.addRecipient(liam);
      transaction.addRecipient(liam);
      expect(transaction.getRecipients().length).to.be(1);
    });

    describe('serialization', function() {

      it('serializes a recipient with an id', function() {
        var serializeUser = new User({
          'id': '1234'
        });
        var resp = transaction.serialize({
          amount: '1.01',
          recipients: [serializeUser]
        });

        expect(resp).to.be.eql([{
          user_id: '1234',
          amount: 1.01
        }]);
      });

      it('serializes amount as positive for payments, negative for charges', function() {
        var serializeUser = new User({
          'email': 'tom@tester.com'
        });
        var resp;

        resp = transaction.serialize({
          amount: '1.01',
          recipients: [serializeUser]
        });

        expect(resp[0].amount).to.be(1.01);

        resp = transaction.serialize({
          amount: '1.01',
          isCharge: true,
          recipients: [serializeUser]
        });

        expect(resp[0].amount).to.be(-1.01);
      });

      it('serializes recipient with just email', function() {
        var serializeUser = new User({
          'email': 'tom@tester.com'
        });
        var resp = transaction.serialize({
          amount: '1.01',
          recipients: [serializeUser]
        });

        expect(resp).to.be.eql([{
          email: 'tom@tester.com',
          amount: 1.01
        }]);
      });

      it('serializes recipient with just phone', function() {
        var serializeUser = new User({
          'phone': '555-555-5555'
        });
        var resp = transaction.serialize({
          amount: '1.01',
          recipients: [serializeUser]
        });

        expect(resp).to.be.eql([{
          phone: '555-555-5555',
          amount: 1.01
        }]);
      });

      it('can remove recipients from the transaction', function() {
        var userOne = new User({ name: 'Julian' });
        var userTwo = new User({ name: 'Thomas' });

        transaction.addRecipient(userOne);
        transaction.addRecipient(userTwo);
        transaction.removeRecipient(userTwo);

        var recipients = transaction.getRecipients();

        expect(recipients.length).to.be(1);
        expect(recipients[0].cid).to.be(userOne.cid);
      });

    });

    // TODO: make this for multiple recipients
    it('saves a transaction for the first recipient ONLY', function() {
      var userOne = new User({ id: '222' });
      var userTwo = new User({ id: '333' });
      var spy = sinon.spy(transaction, 'saveTransaction');

      transaction.addRecipient(userOne);
      transaction.addRecipient(userTwo);
      transaction.set({ amount: '1.01', note: 'hello' });
      transaction.save();

      var expectedArgs = {
        user_id: '222',
        amount: 1.01,
        note: 'hello'
      };

      expect(ajax.calledOnce).to.be(true);
      expect(spy.withArgs(expectedArgs).calledOnce).to.be(true);
      spy.restore();
    });

  });
});

