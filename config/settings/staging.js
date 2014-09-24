module.exports = {
  redis: {
    host: '', // production redis
    port: '6379'
  },
  session: {
    secret: 'imjaded'
  },
  host: 'https://staging.jaded.red',
  oauth: {
    instagram: {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL
    }
  }
};
