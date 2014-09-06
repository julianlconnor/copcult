/** @jsx React.DOM */
define([
  'react',
  'underscore',
  'jsx!shared/js/components/forms/inputs/mixin',
  'jsx!shared/js/components/spinner'
], function(React, _, InputMixin, Spinner) {
  var cx = React.addons.classSet;

  /*
   * This input adds mailgun validation to emails by adding a separate "mailgun validity"
   * state, which works outside of the regular validation system.
   */
  var EmailInput = React.createClass({
    mixins: [_.omit(InputMixin, 'getValidationErrorClasses')],

    getInitialState: function() {
      return {
        spinning: false,
        mailgunError: null,
        mailgunValid: true
      };
    },

    verify: function(email) {
      this.setState({spinning: true});

      this.context.model.verifyEmailViaMailgun(email)
        .then(this.updateMailgunValidity)
        .finally(this.setState.bind(this, {spinning: false}));
    },

    updateMailgunValidity: function(payload) {
      var msg;
      if ( payload.is_valid === false ) {
        msg = this.EMAIL_ERROR;
        if ( payload.did_you_mean ) {
          msg = 'Did you mean ' + payload.did_you_mean + '?';
        } else {
          msg = 'Please check your email address';
        }

        this.setState({
          mailgunValid: false,
          mailgunError: msg
        });
      } else {
        this.setState({
          mailgunValid: true,
          mailgunError: null
        });
      }
    },

    getValidationErrorClasses: function() {
      return cx({
        'validation-error': true,
        'show-validation': !this.state.mailgunValid || this.displayErrorMessage()
      });
    },

    renderInput: function(input) {
      input.props.onBlur = function(e) {
        this.handleBlur(e);
        this.verify(e.target.value);
      }.bind(this);

      var options = {
        left: '0',
        top: '0',
        color: '#6e787f',
        radius: 5,
        length: 5,
        width: 2,
        lines: 10
      };

      if ( this.props.label ) {
        var labelClass = cx({
          'active': this.state.isFocused,
          'is-spinning': this.state.spinning
        });

        input = (
          <label className={labelClass} ref="label">
            <div className="label-text">{this.props.label}</div>
            {input}
            <Spinner show={this.state.spinning} options={options} />
          </label>
        );
      }

      var error = this.props.hideError ? (<noscript />) : (
        <div className={this.getValidationErrorClasses()} ref="validationError">
        {this.state.mailgunError || this.state.errorText}
        </div>
      );

      return (
        <div className={this.getWrapperClasses()}>
          {input}
          {error}
        </div>
      );
    }
  });

  return EmailInput;
});
