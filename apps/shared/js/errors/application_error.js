/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var ApplicationErrorView = React.createClass({
    render: function() {
      return (
        <div className="error-page">
          <div className="claim-index">
            <div className="header row">
              <div className="venmo"></div>
            </div>

            <div className="container">
              <h2>Sorry, an error occurred.</h2>
              <p>
                Our development team has been alerted and is working hard to fix this issue.
              </p>
              <p>
                For further assistance, please feel free to <a href="https://help.venmo.com/customer/portal/emails/new?ticket[labels_new]=500_page">contact us</a>.
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return ApplicationErrorView;
});
