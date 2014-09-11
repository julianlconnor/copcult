/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var NotFoundView = React.createClass({

    getInitialState: function() {
      return {};
    },

    render: function() {
      return (
        <div className='error-page'>
        </div>
      );
    }
  });

  return NotFoundView;
});
