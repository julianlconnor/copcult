/** @jsx React.DOM */

define([
  'react'
], function(React) {

  var SignupView = React.createClass({

    getInitialState: function() {
      return {
        signupSuccess: false
      };
    },

    signup: function(event) {
      event.preventDefault();

      this.setState({
        signupSuccess: true
      });
    },

    render: function() {
      var signupForm = (
        <form onSubmit={this.signup}>
          <h3>Signup</h3>
          <fieldset>
            <input type="text" name="username" ref="username" placeholder="username" />
            <input type="text" name="email" ref="email" placeholder="email" />
            <input type="password" name="password" ref="password" placeholder="password" />
          </fieldset>
          <button>Signup</button>
        </form>
      );
      var success = (
        <div className="success-wrapper">
          <h1>Success</h1>
          <p>Your store url: 
            <a href="https://localhost/muffs">arbiter.com/muffs</a>
          </p>
        </div>
      );

      return this.state.signupSuccess ? success : signupForm;
    }

  });

  return SignupView;
});

