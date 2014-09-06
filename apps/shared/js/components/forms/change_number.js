/** @jsx React.DOM */

define([
  'react',
  'jsx!shared/js/components/ladda'
], function(React, LaddaButton) {

  var cx = React.addons.classSet;

  var ChangeNumber = React.createClass({
    propTypes: {
      model: React.PropTypes.object.isRequired,
      onChangeNumber: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return {
        spinning: false
      };
    },

    handleSubmit: function(e) {
      e.preventDefault();

      var phone = this.refs.phone.getDOMNode().value;
      var errorMessage = this.props.model.preValidate('phone', phone);

      if ( errorMessage ) {
        this.setState({
          phoneError: errorMessage
        });

        return;
      }

      this.setState({
        spinning: true,
        phoneError: null  // clear previous errors
      });

      this.props.model.savePhone(phone)
        .finally(function() {
          this.setState({ spinning: false });
        }.bind(this))
        .done(this.didSavePhone, this.didError);
    },

    didSavePhone: function() {
      this.setState({
        didSavePhone: true
      });

      this.props.onChangeNumber();
    },

    didError: function(error) {
      if ( error.responseJSON ) {
        var code = error.responseJSON.data.error.code;

        if ( code === 1109 || code === 1107 ) {
          // duplicate or invalid phone
          this.setState({
            phoneError: error.responseJSON.data.error.message
          });
        }
      } else {
        this.setState({
          didError: true,
          errorMessage: 'An unknown error occurred'
        });
      }
    },

    render: function() {

      var validationClass = cx({
        'validation-error': true,
        'show-validation': !!this.state.phoneError
      });

      var catchAllClass = cx({
        'catch-all': true,
        'validation-error': true,
        'show-validation': this.state.didError
      });

      return (
        <form ref="changeNumberForm" onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="input-field-wrapper">
              <input ref="phone" placeholder="phone number" aria-label="phone number" type="tel" />
              <div className={validationClass} ref="phoneError">
                {this.state.phoneError}
              </div>
            </div>
          </fieldset>

          <div className={catchAllClass} ref="submitError">
            {this.state.errorMessage}
          </div>

          <LaddaButton buttonClasses="submit button blue cta"
            data-style="slide-right"
            spinning={this.state.spinning}>
            Change number
          </LaddaButton>
        </form>
      );
    }
  });

  return ChangeNumber;
});
