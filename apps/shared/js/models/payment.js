define([
  'shared/js/models/base',
  'moment'
], function(BaseModel, moment) {

  // sets how Moment formats the 'ago' timestamps (sick -Julian)
  moment.lang('en-phone-feed', {
    relativeTime : {
      s:  "1m",
      m:  "1m",
      mm: "%dm",
      h:  "1h",
      hh: "%dh",
      d:  "1d",
      dd: "%dd",
      M:  "1mo",
      MM: "%dmo",
      y:  "1y",
      yy: "%dy"
    }
  });
  moment.lang('en');

  var PaymentModel = BaseModel.extend({
    /**
     * Overrides BaseModel parse to simply return the response. 
     *
     * @method parse 
     */
    parse: function(resp) {
      return resp;
    },

    /**
     * Appends time ago, a string representing time since now, to our JSON object
     *
     * @method toJSON 
     */
    toJSON: function() {
      var json = BaseModel.prototype.toJSON.call(this);
      json.timeAgo = this.getTimeAgo();

      return json;
    },

    getTimeAgo: function() {
      // this is the only way to make moment use a different language for fromNow(), apparently :\
      moment.lang('en-phone-feed');
      var time = moment(this.get('timestamp')).fromNow(true);
      moment.lang('en');
      return time;
    }

  });

  return PaymentModel;

});
