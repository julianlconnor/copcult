/** @jsx React.DOM */

define([
  'react',
  'jsx!shabu/public/js/components/users/avatar',
  'jquery'
], function(React, Avatar, $) {

  var BubbleInput = React.createClass({

    propTypes: {
      user: React.PropTypes.object.isRequired,
      model: React.PropTypes.object.isRequired,
      attr: React.PropTypes.string.isRequired,
      onSubmit: React.PropTypes.func,
      disabled: React.PropTypes.bool
    },

    getDefaultProps: function() {
      return {
        onSubmit: function() {},
        disabled: false
      };
    },

    getInitialState: function() {
      return {
        isValid: true,
        value: ''
      };
    },

    componentDidMount: function() {
      // override the default append: '\n' in autosize
      $('.new-note', this.getDOMNode()).autosize({ append: '' });
    },

    componentWillReceiveProps: function(nextProps) {
      this.setState({
        value: nextProps.model.get(nextProps.attr)
      });
    },

    handleSubmit: function(e) {
      e.preventDefault();

      /**
      * Prevalidate is funky, it returns an error message if invalid, empty
      * string if valid.
      */
      var value = this.refs.input.getDOMNode().value;
      if ( !this.props.model.preValidate(this.props.attr, value).length ) {
        this.props.model.set(this.props.attr, value);
        this.props.onSubmit(e).then(function() {
          $('.new-note', this.getDOMNode()).trigger('autosize.resize');
        }.bind(this));
      } else {
        this.setState({ isValid: false });
      }
    },

    onEnter: function(e) {
      if ( event.keyCode === 13 && !event.shiftKey ) {
        this.handleSubmit(e);
      }
    },

    handleChange: function(e) {
      this.setState({
        value: e.target.value
      });
    },

    render: function() {
      return (
        <form className={this.props.disabled ? "submitting" : null} 
              onSubmit={this.handleSubmit} ref="form">
          <Avatar user={this.props.user} />
          <label className="bubble new-note-bubble">
            <div className="asset-speech-bubble-indicator" />
            <textarea
              className="new-note"
              ref="input"
              type="text"
              disabled={this.props.disabled}
              value={this.state.value}
              onChange={this.handleChange}
              onKeyUp={this.onEnter}
              placeholder={this.props.placeholder}/>
          </label>
        </form>
      );
    }
  });

  return BubbleInput;
});
