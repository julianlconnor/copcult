/** @jsx React.DOM */

define([
  'react',
  'react.backbone'
], function(React) {

  /**
   * Input field for a user
   *
   * Currently, this is entirely static and just renders a user from the given model.
   * Long-term, this should be a badass autocomplete form with room to build on for multipay, etc.
   */

  var UserInput = React.createBackboneClass({

    getInitialState: function() {
      return {};
    },

    render: function() {
      var inputClasses = this.props.inputClass || '';

      var wrapperClasses = 'input-field-wrapper user-input-wrapper ' + (this.props.wrapperClass || '');

      var input = (
        <input ref="fieldInput"
          className={inputClasses}
          value={this.props.model.get('displayName')}
          type="text"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      );

      // TODO: this needs some sort of whitelist/blacklist ability
      this.transferPropsTo(input);

      return (
        <div className={wrapperClasses}>
          <label>
            <div className="label-text">{this.props.label}</div>
            {input}
            <img src={this.props.model.get('profilePictureUrl')} />
          </label>
        </div>
      );
    }
  });

  return UserInput;

});
