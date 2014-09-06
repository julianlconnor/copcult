/** @jsx React.DOM */

define([
  'react',
  'modernizr',
  'punycode',

  'shared/js/helpers/cdn',
], function(React, Modernizr, punycode, cdn) {
  /**
   * Produces an array that has a separator inbetween
   * each element of the passed in `array`
   */
  var interpose = function(separator, array) {
    var interpose = [];
    for ( var i = 0; i < array.length; i++ ){
      interpose.push(array[i]);
      if ( i !== (array.length - 1) ){
        interpose.push(separator);
      }
    }
    return interpose;
  };

  return {
    /**
     * Replaces the emojis in a text string with <img> tags
     */
    isEmojiCode: function(charCode) {
      return (
        ( charCode >= 0x1F300 && charCode <= 0x1F5FF ) ||
        ( charCode >= 0x1F600 && charCode <= 0x1F64F ) ||
        ( charCode >= 0x1F680 && charCode <= 0x1F6FF ) ||
        ( charCode >= 0x2600 && charCode <= 0x26FF )
      );
    },

    emojiTransform: function(text) {
      var decoded = punycode.ucs2.decode(text);

      var entries = [];
      decoded.forEach(function(charCode, idx) {
        if ( this.isEmojiCode(charCode) ) {
          // emoji char encountered, insert img tag
          var hexCode = charCode.toString(16);
          entries.push(
            <img className="emoji" src={cdn.imagePath('emoji/' + hexCode + '.png')} key={idx} />
          );
        } else {
          var char = punycode.ucs2.encode([charCode]);

          var lastIdx = entries.length - 1;
          if ( typeof entries[lastIdx] === 'string' ) {
            entries[lastIdx] += char;
          } else {
            entries.push(char);
          }
        }
      }.bind(this));

      return entries;
    },

    /**
     * Replaces any URLs in a text string with <a href> tags
     */
    urlTransform: function(text) {
      text = text.split(' ');

      // URL regexes: http://stackoverflow.com/a/3890175
      // also: http://stackoverflow.com/questions/4688518/why-does-javascripts-regexp-maintain-state-between-calls
      var replacements = [
        //URLs starting with http://, https://, or ftp://
        /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/im,
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        /(^|[^\/])(www\.[\S]+(\b|$))/im
      ];

      for ( var i = 0; i < text.length; i++ ) {
        if ( replacements[0].test(text[i]) ) {
          text[i] = (
            <a href={text[i]} target="_blank">{text[i]}</a>
          );
        } else if ( replacements[1].test(text[i]) ) {
          text[i] = (
            <a href={"http://" + text[i]} target="_blank">{text[i]}</a>
          );
        }
      }

      // add back spaces that were previously split on
      text = interpose(' ', text);

      return text;
    }
  };
});
