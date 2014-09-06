define([
  'q',
  'underscore',
  'shared/js/models/base',
  'shared/js/models/formatters/transaction',
  'shared/js/helpers/ajax',
  'shared/js/helpers/regex',
  'shared/js/helpers/dev_api_url',
], function(q, _, BaseModel, TransactionFormatter, ajax, regex, devApiUrl) {


  // NOTE: we should consider remodling this model to map more closely to the
  // idea that a transaction is, for the time-being, only for a single user -
  // using a 'transaction' to encapsulate multiple distinct payments seems a bit
  // unintuitive - but then again maybe the endpoint will change and a single
  // transaction could truly encapsulate multiple recipients

  var TransactionModel = BaseModel.extend({

    defaults: {
      recipients: [],
      isCharge: false
    },

    url: devApiUrl() + '/v1/payments',

    validation: {
      amount: function(value) {
        if ( !value ) {
          return 'Amount is required.';
        }

        if ( !regex.amount.test(value) ) {
          return 'Amount is invalid.';
        }

        if ( parseFloat(value) <= 0 ) {
          return 'Amount must be greater than zero.';
        }

        return undefined;
      },
      note: function(value) {
        if ( !value || !value.trim().length ) {
          return 'A note is required! :D';
        }
      },
      recipients: {
        required: true
      }
    },

    saveTransaction: function(transaction) {
      return ajax({
        url: this.url,
        method: 'POST',
        withCredentials: true,
        data: transaction
      });
    },

    save: function() {
      // backbone.validate form
      if ( this.isValid(true) === false ) {
        return q.reject(new Error(this.VALIDATION_ERROR));
      }

      // TODO: let's do multipay later :-)
      var transaction = this.serialize()[0];
      return this.saveTransaction(transaction);
    },

    serialize: function(attrs) {
      attrs = attrs || _.clone(this.attributes);

      var recipients = attrs.recipients || this.getRecipients();

      attrs.amount = parseFloat(attrs.amount);

      if ( attrs.isCharge ) {
        // NOTE: if we are charging, return negative amount
        attrs.amount = -1 * attrs.amount;
      }

      delete attrs.recipients;
      delete attrs.isCharge;

      return _.map(recipients, function(recipient) {
        if ( recipient.has('id') ) {
          attrs.userId = recipient.get('id');
        } else if ( recipient.has('email') ) {
          attrs.email = recipient.get('email');
        } else if ( recipient.has('phone') ) {
          attrs.phone = recipient.get('phone');
        }
        return this._super(attrs);
      }.bind(this));
    },

    addRecipient: function(user) {
      var recipients = this.getRecipients();
      if ( !_.contains(recipients, user) ) {
        this.set({ recipients: recipients.concat([user]) });
      }
    },

    removeRecipient: function(user) {
      var recipients = this.getRecipients();
      var rejected = _.reject(recipients, function(recipient) {
        return recipient.cid === user.cid;
      });

      this.set({ recipients: rejected });

      return rejected;
    },

    getRecipients: function() {
      return this.get('recipients') || [];
    },

    wipe: function(props) {
      /**
      * Similar to clear but resets defaults.
      *
      * This will NOT trigger an event on clear.
      */
      props = props || this.defaults;
      this.clear({ silent: true }).set(props);
    },

    isCharge: function() {
      return !!this.get('isCharge');
    },

    parse: function(resp) {
      var payload = resp.data.payment;

      // some day might turn these into models, for now we can just discard them (since at this
      // point recipient will have been set and there will be a current user for sender)
      delete payload.target;
      delete payload.actor;

      return this._super({data: payload});
    },

    handleServerSideError: function(error) {
      if (error.code === 1319 || error.code === 1396) {
        this.validationError.amount = "Insufficient funds.";
      } else if (error.code === 104) {
        this.validationError.amount = "Invalid amount.";
      }
    }
  });

  _.extend(TransactionModel.prototype, TransactionFormatter);

  return TransactionModel;
});
