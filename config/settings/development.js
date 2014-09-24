module.exports = {
  redis: {
    host: '127.0.0.1',
    port: '6379'
  },
  session: {
    secret: 'testingonetwothree'
  },
  host: 'http://dev.jaded.red',

  oauth: {
    facebook: {
      clientID: '802169183181048',
      clientSecret: 'f2acfafa89a867dc7740d9a05ceaa5d9',
      callbackURL: 'http://localhost:9001/auth/facebook/callback'
    },
    instagram: {
      clientID: '215885fd870444219af2ef539a4cfb57',
      clientSecret: '2642b11eaffa4ad4b85ee238cae6c129',
      callbackURL: 'http://localhost:9001/auth/instagram/callback'
    }
  }
};
