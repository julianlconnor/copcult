/** @jsx React.DOM */

define([
  'bluebird',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/submit_image',

  'webapp/public/js/models/user'
], function(Promise, React, _, SubmitImage, User) {

  var user = new User(window.jaded.user);

  var HomeView = React.createClass({

    render: function() {
      return (
        <SubmitImage />
      );
    }
  });

  return HomeView;

});
