var Handlebars = require('handlebars');

/**
 * Insert <div class="row"> in a list, wrapping `cols` number of items
 * i.e.
 *
 * list = [1,2,3]
 * {{#each_row list cols=2}}
 *   <li>{{this}}</li>
 * {{/each_row}}
 *
 * will end up
 * <div class="row section">
 *   <li>1</li>
 *   <li>2</li>
 * </div>
 * <div class="row section">
 *   <li>3</li>
 * </div>
 */
module.exports.each_row = function(data, options) {
  var cols = options.hash.cols;

  var html = data.reduce(function(acc, item, idx) {
    var html = acc + options.fn(item) + '\n';

    if ( idx === 0 ) {
      html = '<div class="row section">\n' + html;
    } else if ( idx === data.length - 1 ) {
      html += '</div>\n';
    } else if ( (idx + 1) % cols === 0 ) {
      html += '</div>\n<div class="row section">\n';
    }

    return html;
  }, '');

  return new Handlebars.SafeString(html);
};
