/** @jsx React.DOM */
define([
  'react',
  'jsx!shared/js/components/forms/inputs/mixin'
], function(React, InputMixin) {
  var cx = React.addons.classSet;

   /**
   * A wrapper for an input tag in a Backbone.Model-backed form.
   *
   * @class FormInput
   * @uses InputMixin
   */
  var FormInput = React.createClass({
    mixins: [InputMixin],

    renderInput: function(input) {
      if ( this.props.label ) {
        var labelClass = cx({
          'active': this.state.isFocused
        });
        input = (
          <label className={labelClass}>
            <div className="label-text">{this.props.label}</div>
            {input}
          </label>
        );
      }

      var error = this.props.hideError ? (<noscript />) : (
        <div className={this.getValidationErrorClasses()} ref="validationError">
        {this.state.errorText}
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

  return FormInput;
});
