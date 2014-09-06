/** @jsx React.DOM */

define([
  'react',
  'jquery'
], function(React, $) {

  var Modal = React.createClass({

    propTypes: {
      onRequestClose: React.PropTypes.func.isRequired,
      title: React.PropTypes.string,
      modalClass: React.PropTypes.string
    },

    componentDidMount: function() {
      // the things we do for CSS
      $('.add-frosted').addClass('frosted');
    },

    componentWillUnmount: function() {
      $('.add-frosted').removeClass('frosted');
    },

    killClick: function(e) {
      // clicks on the content shouldn't close the modal
      e.stopPropagation();
    },

    render: function() {
      var modalClass = "modal-container ";
      if ( this.props.modalClass ) {
        modalClass += this.props.modalClass;
      }
      return this.transferPropsTo(
        <div className="modal-overlay" onClick={this.props.onRequestClose}>
          <div className={modalClass} onClick={this.killClick}>
            <div className="modal-header">
              <a className="icon-modal-close" onClick={this.props.onRequestClose}></a>
              <div className="modal-title">
                <h3>{this.props.title}</h3>
              </div>
            </div>
            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  });

  return Modal;
});
