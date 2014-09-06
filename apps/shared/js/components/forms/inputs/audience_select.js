/** @jsx React.DOM */

define([
  'react',
  'react.backbone'
], function(React) {

  return React.createClass({
    displayName: 'AudienceSelect',

    mixins: [ React.BackboneMixin('transaction') ],

    propTypes: {
      transaction: React.PropTypes.object.isRequired
    },

    onChange: function(e) {
      this.props.transaction.set({
        audience: e.target.value
      });
    },

    render: function() {
      var currentAudience = this.props.transaction.get('audience');
      var currentLabel = currentAudience[0].toUpperCase() + currentAudience.slice(1);
      var iconClass = 'icon-audience-' + currentAudience + ' button-label';

      return (
        <div className="audience-select select-box">
          <div className="select-button">
            <span className={iconClass}>
              {currentLabel}
            </span>

            <span className="icon-arrow-down"></span>

            <select value={currentAudience} onChange={this.onChange}>
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      );
    }
  });

});
