define({
  /**
  * User profiles.
  */
  DEFAULT_AVATAR: '/w/shared/images/no-image.gif',
  S3_DEFAULT_AVATAR: 'https://s3.amazonaws.com/venmo/no-image.gif',

  /**
  * Logos.
  */
  VENMO_LOGO_BLUE: '/w/shared/images/venmo_blue.png',


  /**
   * Story Audiences, see api/story model
   */
  STORY_AUDIENCES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    FRIENDS: 'friends'
  },

  /**
   * Filter the feed by segment, see api/stories collection
   */
  FEED_FILTERS: {
    ME: 'me',
    FRIENDS: 'friends',
    PUBLIC: 'public'
  },

  /**
   * Friend Requests, see api/user model
   */
  FRIEND_REQUEST_STATUSES: {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing',
    COMPLETED: 'completed'
  },

  FRIEND_REQUEST_ACTIONS: {
    ACCEPT: 'accept',
    IGNORE: 'ignore',
    CANCEL: 'cancel'
  },

  /**
   * Trust Requests, see api/user model
   */
  TRUST_REQUEST_STATUSES: {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing',
    COMPLETED: 'completed'
  },

  TRUST_REQUEST_ACTIONS: {
    ACCEPT: 'accept',
    IGNOTE: 'ignore',
    CANCEL: 'cancel'
  },

  CDN_URL: 'https://shabu.s3.amazonaws.com/'
});
