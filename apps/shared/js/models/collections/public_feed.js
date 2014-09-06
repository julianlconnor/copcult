define([
  'backbone',
  'underscore',
  'shared/js/models/payment'
],
function(Backbone, _, PaymentModel) {
  /**
   * @class FeedCollection
   * @extends Backbone.Collection
   */
  var FeedCollection = Backbone.Collection.extend({

    model: PaymentModel,

    url: '/api/v5/public',

    /**
     * Parses an API response into Payment Models
     *
     * @method parse
     * @param {Object} resp The API Response
     */
    parse: function(resp) {
      return _.map(resp.data, this.parseAPIPayment);
    },

    /**
     * Translates from the API format into Payment Model format
     *
     * @method parseAPIPayment
     * @param {Object} payment An object from the API representing a payment
     */
    parseAPIPayment: function(payment) {
      return {
        amount: payment.transactions[0].amount,
        actor: {
          name: payment.actor.name,
          picture: payment.actor.picture
        },
        target: {
          name: payment.transactions[0].target.name
        },
        note: payment.message,
        timestamp: payment.created_time
      };
    }
  });

  return FeedCollection;

});
