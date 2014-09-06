define(['moment'], function(moment) {

  return {

    phoneNumber: function(number) {
      number = number.replace(/[^0-9]/g, '');

      // remove country code
      if ( number.length === 11 && number[0] === '1') {
        number = number.slice(1, 11);
      }

      // if it's not a 10-digit number, don't try formatting it
      if ( number.length !== 10 ) {
        return number;
      }

      var groups = number.match(/(\d{3})(\d{3})(\d{4})/);
      return '(' + groups[1] + ') ' + groups[2] + '-' + groups[3];
    },

    /**
     * Turns 7.8 -> 7.80,
     * Turns 3000 -> 3,000.00
     *
     * Source: http://stackoverflow.com/a/149099/880859
     */
    moneyAmount: function(money) {
      var s = money < 0 ? "-" : "";
      var i = parseInt(money = Math.abs(+money || 0).toFixed(2)) + "";
      var j = (j = i.length) > 3 ? j % 3 : 0;

      return s + (j ? i.substr(0, j) + ',' : '')
               + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',')
               + (2 ? '.' + Math.abs(money - i).toFixed(2).slice(2) : '');
    },

    /**
    * Turns ['foo', 'bar', 'baz'] into 'foo, bar, and baz'
    */
    list: function(things) {
      if ( things.length === 2 ) {
        // special case to make sure there's no comma
        return things[0] + ' and ' + things[1];
      }

      return things.reduce(function(acc, thing, idx) {
        if ( idx === 0 ) {
          return thing;
        } else if ( idx === (things.length - 1) ) {
          return acc + ', and ' + thing;
        }
        return acc + ', ' + thing;
      }, '');
    },

    elapsedTime: function(timestamp) {
      if ( !/Z$/.test(timestamp) ) {
        // Add a 'z' denoting GMT.
        timestamp += 'Z';
      }

      return moment(timestamp).fromNow();
    },

    elapsedCalendar: function(timestamp) {
      return moment(timestamp).calendar();
    },

    prettyDate: function(timestamp) {
      return moment(timestamp).format('llll');
    },

    widont: function(text){
      // Prevent widows (trailing single words)
      return text.replace(/([^\s])\s+([^\s]+)\s*$/, '$1\u00A0$2');
    },

    smarty: function(text) {
      // Curly quotes and em dashes
      text = text.replace(/(^|[-\u2014\s(\["])'/g, '$1\u2018');
      text = text.replace(/'/g, "\u2019");
      text = text.replace(/(^|[-\u2014/\[(\u2018\s])"/g, '$1\u201c');
      text = text.replace(/"/g, '\u201d');
      text = text.replace(/--/g, '\u2014');

      return text;
    },

    formatUserContent: function(text) {
      if ( !text ) {
        return '';
      }
      return this.widont(this.smarty(text));
    }

  };

});
