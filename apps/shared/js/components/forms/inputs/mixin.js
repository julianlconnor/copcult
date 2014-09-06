/** @jsx React.DOM */
define([
  'react'
], function(React) {
  var cx = React.addons.classSet;

  /**
   * @class InputMixin
   */
  var InputMixin = {

    propTypes: {
      inputClass: React.PropTypes.string,
      wrapperClass: React.PropTypes.string,
      label: React.PropTypes.string,
      attr: React.PropTypes.string.isRequired,
      hideError: React.PropTypes.bool
      // other props passed are passed to inner <input>
    },

    contextTypes: {
      model: React.PropTypes.object,
      handleUpdate: React.PropTypes.func,
      submitting: React.PropTypes.bool,
      noValidate: React.PropTypes.bool
    },

    getInitialState: function() {
      var state = {
        isValid: undefined,

        // show the validation error
        displayValidationError: false,

        // the current error message
        errorText: undefined
      };

      return state;
    },


    /*
     * Lifecycle methods
     */
    componentDidMount: function() {
      this._subscribe();
    },

    _subscribe: function() {

      if ( this.context.noValidate !== true) {
        this._validatedCb = function(isValid, model, errors) {
          this._updateValidState(errors);
        }.bind(this);
      }

      // Bind to validation event (regardless of where fired)
      this.context.model.on('validated', this._validatedCb);

      this._changeCb = function() {
        this.forceUpdate();
      }.bind(this);

      // Bind to incoming attr value changes (i.e. form prefill through FB
      // connect)
      this.context.model.on('change:' + this.props.attr, this._changeCb);

      this._subscribedModel = this.context.model;
    },

    componentWillUnmount: function() {
      this._unsubscribe();
    },

    _unsubscribe: function() {
      this._subscribedModel.off('validated', this._validatedCb);
      this._subscribedModel.off('change:' + this.props.attr, this._changeCb);
    },

    componentDidUpdate: function() {
      if ( this.context.model === this._subscribedModel ) {
        return;
      }

      this._unsubscribe();
      this._subscribe();

      this.forceUpdate();
    },


    /*
     * Computed properties for displaying valid/invalid states & the validation error box
     */
    displayValid: function() {
      return this.state.isValid === true;
    },

    displayInvalid: function() {
      return this.state.isValid === false && this.state.displayValidationError === true;
    },

    displayErrorMessage: function() {
      if ( this.props.hideError ) {
        return false;
      } else {
        /**
        * Show message if we have an error message and we are set to display it
        * and we are not submitting.
        */
        return !!this.state.errorText && 
               this.state.displayValidationError && 
               !this.context.submitting;
      }
    },


    /*
     * Event handlers
     */
    handleChange: function(e) {
      this.context.handleUpdate(this.props.attr, e.target.value);
    },

    handleBlur: function(e) {
      this.setState({
        displayValidationError: false
      });
    },

    _updateValidState: function(errors) {
      errors = errors || {};

      var attrError = errors[this.props.attr];

      this.setState({
        isValid: !attrError
      });

      if ( attrError ) {
        this.setState({
          errorText: attrError,
          displayValidationError: true
        });
      }

    },


    /*
     * Utilities used by renderInput hook
     */
    getWrapperClasses: function() {
      return 'input-field-wrapper ' + (this.props.wrapperClass || '');
    },

    getValidationErrorClasses: function() {
      return cx({
        'validation-error': true,
        'show-validation': this.displayErrorMessage()
      });
    },

    render: function() {
      var input;
      var val;

      var inputClasses = {
        'valid': this.displayValid(),
        'invalid': this.displayInvalid()
      };

      val = this.context.model.get(this.props.attr) || '';

      if ( this.props.type === 'selectGroup' ) {
        if ( ! this.props.options ) {
          throw new Error('A select group must be provided options');
        } else {
          var buttonClick = function(e) {
            this.context.model.set(this.props.attr, e.target.value);
          }.bind(this);

          inputClasses['btn-group'] = true;

          var buttons = this.props.options.map(function(option) {
            var selected = (val === option) ? "selected" : "";
            return <button value={option} onClick={buttonClick} type="button" className={"btn " + selected}>{option}</button>
          });

          input = (
            <div
              ref="fieldInput"
              disabled={this.props.disabled || this.context.submitting}
              onChange={this.handleChange}
              className={cx(inputClasses)}>
              {buttons}
            </div>
          );
        }
      } else if ( this.props.type === 'textarea' ) {
          input = (
            <textarea ref="fieldInput"
            disabled={this.props.disabled || this.context.submitting}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className={cx(inputClasses)}>
            {val}
            </textarea>
          );
      } else {
        input = (
          <input ref="fieldInput"
          className={cx(inputClasses)}
          value={val}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          disabled={this.props.disabled || this.context.submitting}
          />
        );
      }

      // TODO: this needs some sort of whitelist/blacklist ability
      this.transferPropsTo(input);

      return this.renderInput(input);
    }
  };

  return InputMixin;
});
