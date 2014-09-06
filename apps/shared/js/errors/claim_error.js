/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var ClaimErrorComponent = React.createClass({

    propTypes: {
      model: React.PropTypes.object.isRequired
    },

    render: function() {
      var content;
      if ( this.props.model.get('statusCode') === 4 ) {
        content = (
          <div>
            <h2>Sorry, but this payment has expired.</h2>
            <p>This payment was expired because it was not claimed within 30 days.</p>
          </div>
        );
      } else if ( this.props.model.get('statusCode') === 2 ) {
        content = (
          <div>
            <h2>Sorry, but this payment has been canceled by the sender.</h2>
          </div>
        );
      } else {
        content = (
          <h2>Sorry! An unexpected error occured.</h2>
        );
      }
      return (
        <div className="error-page">
          <div className="claim-index">
            <div className="header row">
              <div className="venmo"></div>
            </div>

            <div className="container">
              {content}
              <p>
                For further assistance, please feel free to <a href="https://help.venmo.com/customer/portal/emails/new?ticket[labels_new]=500_page">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return ClaimErrorComponent;
});
