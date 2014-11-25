/** @jsx React.DOM */

define([
  'bluebird',
  'react',
  'underscore',

  'jsx!webapp/public/js/components/images',
  'jsx!webapp/public/js/components/submit_image',

  'webapp/public/js/models/user'
], function(Promise, React, _, Images, SubmitImage, User) {

  var user = new User(window.jaded.user);

  var HomeView = React.createClass({

    render: function() {
      return (
        <div>
          <h1>Submitted Images</h1>
          <Images />
          <h1>Submit an Image</h1>
          <SubmitImage />
        </div>
      );
    }
  });

  return HomeView;

});
