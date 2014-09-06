/** @jsx React.DOM */

define([
  'react',
], function(React) {

  var OldBrowserError = React.createClass({
    render: function() {
      // this purposely doesn't have a support link because support really doesn't
      // want to help people upgrade their browsers
      return (
        <div className="error-page">
          <div className="claim-index">
            <div className="header row">
              <div className="venmo"></div>
            </div>

            <div className="container">
              <h2>Your browser is out of date</h2>
              <p>
                To bring you the best possible user experience, Venmo uses features only available in newer browsers.
              </p>
              <p>
                Updating your browser is free and easy. <a href="http://whatbrowser.org/">Click here</a> to learn more.
              </p>
            </div>
          </div>
        </div>
      );
    }
  });

  return OldBrowserError;
});

