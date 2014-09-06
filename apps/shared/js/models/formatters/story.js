define([
  'shared/js/helpers/format',
], function(format) {

  return {

    getActorName: function(user) {
      var actor = this.getActor();
      if ( actor && user ) {
        var name = actor.getDisplayName();

        if ( actor.getId() === user.getId() ) {
          name = 'You';
        }

        return name;
      }
    },

    getAction: function() {
      if ( this.get('type') === 'payment' ) {
        return this.get('payments').first().get('action') === 'pay' ? 'paid' : 'charged';
      }
    },

    getTimestamp: function() {
      return format.elapsedTime(this.get('dateCreated'));
    },

    getFormattedAmount: function() {
      return '$' + format.moneyAmount(this.getAmount());
    },

    getTitle: function(user) {
      var index;
      var prefix = 'Your';
      var actor = this.getActor();
      var timestamp = this.get('dateCreated');

      if ( !actor || !user ) {
        return;
      }

      if ( actor.getId() !== user.getId() ) {
        prefix = actor.getDisplayName() + '\u2019s';
      }

      prefix += ' payment from ';
      prefix += format.elapsedCalendar(timestamp);

      /**
      * Remove 'at'.
      */
      index = prefix.indexOf(' at ');
      if ( index !== -1 ) {
        prefix = prefix.slice(0, prefix.indexOf(' at '));
      }

      return prefix;
    }

  };

});
