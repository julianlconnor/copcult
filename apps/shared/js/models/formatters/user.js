define([
  'shared/js/helpers/format',
  'shared/js/helpers/constants'
], function(format, constants) {

  return {

    getProfileURL: function() {
      if ( this.getId() ) {
        return '/users/' + this.get('username');
      } else {
        // TODO: should we return something for new users?
      }
    },

    getFormattedBalance: function() {
      return '$' + format.moneyAmount(this.get('balance'));
    },
    
    getProfilePictureURL: function() {
      return this.get('picture') || this.get('profilePictureUrl') || constants.DEFAULT_AVATAR;
    },

    getProfilePicture: function() {
      /**
      * Defaults to small pic.
      */
      var url = this.getProfilePictureURL();

      if ( url.indexOf('graph.facebook.com') !== -1 ) {
        /**
        * If facebook resource, replace suffix.
        */
        url = url.replace('?type=large', '').replace('?type=square', '');
      }

      return url;
    },

    getProfilePictureLarge: function() {
      var url = this.getProfilePictureURL();

      if ( url.indexOf('venmopics.appspot.com') !== -1 ) {
        /**
        * If given a venmopics.appspot resource, regex replace /s/ with /l/.
        * Different versions of venmo pics have different retu
        */
        if ( /\/(s|m)\//.test(url) ) {
          // use 'l' for large instead of 'm' or 's' in appspot urls
          url = url.replace('/s/', '/l/').replace('/m/', '/l/');
        } else if ( /\/(f)\//.test(url) ) {
          // use 'f' for facebook large instead of 'n'
          url = url.replace('/f/', '/n/');
        }
      } else if ( url.indexOf('graph.facebook.com') !== -1 ) {
        url = url.replace('?type=square', '?type=large');
      }

      return url;
    },

    getDisplayName: function() {
      if ( this.has('name') ) {
        return this.get('name');
      } else if ( this.has('firstName') || this.has('lastName') ) {
        return [this.get('firstName'), this.get('lastName')].join(' ');
      } else if ( this.has('username') ) {
        return this.get('username');
      } else if ( this.has('email') ) {
        return this.get('email');
      } else if ( this.has('phone') ) {
        return this.get('phone');
      } else {
        return 'a new user';
      }
    },

    getAcronym: function() {
      var acronym = '';

      if ( !this.get('firstName') &&
           !this.get('lastName') ) {
        return acronym;
      }

      acronym = this.get('firstName').charAt(0);
      acronym += this.get('lastName').charAt(0);
      acronym = acronym.toUpperCase();

      return acronym;
    },

    getId: function() {
      return this.get('externalId') || this.get('id');
    }
  };

});

