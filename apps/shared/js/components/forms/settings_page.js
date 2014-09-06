/** @jsx React.DOM */

define([
  'react',
  'underscore',
  'backbone',
], function(React, _, Backbone) {
  var cx = React.addons.classSet;

  var SettingsPage = {

    propTypes: {
      model: React.PropTypes.object
    },

    closePage: function() {
      Backbone.history.navigate('/settings', { trigger: true });
    },

    renderForm: function() {
      var title = this.title;
      var helper = this.helper ? <p>{this.helper}</p> : '';
      var saveButton = <span />;

      if ( this.showSaveButton ) {
        saveButton = (
          <footer>
            <button ref='saveButton' className='btn'>Save Changes</button>
          </footer>
        );
      }

      var classNames = cx({
        'settings-page': true
      });

      return (
        <div className={classNames}>
          <header className="page-header">
            <h3>{title}</h3>
            {helper}
            <a ref="close" className="icon-close close" onClick={this.closePage}>Close</a>
          </header>
          {this.renderContents()}

          {saveButton}
        </div>
      );
    }
  };

  return SettingsPage;

});
