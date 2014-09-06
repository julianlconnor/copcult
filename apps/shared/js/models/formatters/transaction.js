define([
  'shared/js/helpers/format',
], function(format) {

  return {

    getAction: function() {
      return this.get('type') === 'payment' ? 'paid' : 'charged';
    },

    getTimestamp: function() {
      return format.elapsedTime(this.get('createdTime'));
    },

    getFormattedAmount: function() {
      var amount = this.get('amount');

      if ( !amount ) {
        throw new Error('Cannot format undefined Transaction amount');
      }

      return '$' + format.moneyAmount(amount);
    },

    getAmountVerbiage: function() {
      // verbiage for amount component in compose
      if ( this.isCharge() ) {
        return {
          verb: 'Request',
          preposition: 'from'
        };
      } else {
        return {
          verb: 'Send',
          preposition: 'to'
        };
      }
    },

    getNoteVerbiage: function() {
      // verbiage for note component in compose
      if ( this.isCharge() ) {
        return {
          action: 'You are requesting',
          preposition: 'from',
          placeholder: 'Say something about your charge\u2026'
        };
      } else {
        return {
          action: 'You are sending',
          preposition: 'to',
          placeholder: 'Say something about your payment\u2026'
        };
      }
    }

  };

});
