/** @jsx React.DOM */
define([
  'react'
], function(React) {

  var BaseFormMixin = {
    propTypes: {
      model: React.PropTypes.object.isRequired,
      noValidate: React.PropTypes.bool
    },

    render: function() {
      // Allow <FormInput> to access model & a global handleUpdate
      var context = {
        model: this.props.model,
        noValidate: this.props.noValidate,
        submitting: this.props.submitting,
        handleUpdate: function(attr, value) {
          var model = this.props.model;
          model.set(attr, value);
        }.bind(this)
      };

      var children = React.withContext(context, this.renderForm);

      return children;
    },
  };

  return BaseFormMixin;
});
