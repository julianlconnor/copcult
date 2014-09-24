module.exports = {
  redis: {
    host: '', // production redis host
    port: '6379'
  },
  session: {
    secret: 'imjaded'
  },
  host: 'https://jaded.red',
  oauth: {
    instagram: {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: process.env.INSTAGRAM_CALLBACK_URL
    }
  }
};
