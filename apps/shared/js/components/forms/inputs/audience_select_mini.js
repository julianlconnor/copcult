/** @jsx React.DOM */

define([
  'react',
  'shared/js/helpers/constants',
  'react.backbone'
], function(React, constants) {

  var STORY_AUDIENCES = constants.STORY_AUDIENCES;

  var cx = React.addons.classSet;

  var AudienceSelectMini = React.createClass({
    mixins: [ React.BackboneMixin('story') ],

    propTypes: {
      story: React.PropTypes.object.isRequired,
      currentUser: React.PropTypes.object
    },

    statics: {
      canBeUpdated: function(story, user) {
        return story.hasUser(user);
      }
    },

    onChange: function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.props.story.setPrivacy(e.target.value);
    },

    getCurrentAudience: function() {
      var currentAudience = this.props.story.getAudience();
      return currentAudience.charAt(0).toUpperCase() + currentAudience.slice(1);
    },

    renderSelect: function() {
      if ( this.type.canBeUpdated(this.props.story, this.props.currentUser) ) {
        var currentAudience = this.getCurrentAudience();
        return (
          <select value={currentAudience.toLowerCase()} onChange={this.onChange}>
            <option value={STORY_AUDIENCES.PUBLIC}>Public</option>
            <option value={STORY_AUDIENCES.FRIENDS}>Friends</option>
            <option value={STORY_AUDIENCES.PRIVATE}>Private</option>
          </select>
        );
      }
    },

    render: function() {
      var currentAudience = this.getCurrentAudience();

      var iconClasses = cx({
        'icon-lock': /Private/.test(currentAudience),
        'icon-nav-people': /Friends/.test(currentAudience),
        'icon-audience-public': !/Private|Friends/.test(currentAudience),
        'audience': true,
        'status-icon': true
      });

      var liClasses = cx({
        clickable: this.type.canBeUpdated(this.props.story, this.props.currentUser)
      });

      var stopPropagation = function(e) {
        e.preventDefault();
        e.stopPropagation();
      };

      return (
        <li className={liClasses} onClick={stopPropagation}>
          <div className={iconClasses} />
          <span>{currentAudience}</span>
          {this.renderSelect()}
        </li>
      );
    }
  });

  return AudienceSelectMini;

});
