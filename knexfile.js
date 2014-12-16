var path = require('path');

module.exports = {

  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'julianconnor',
      password: '',
      database: 'jaded_test'
    },
    directory: path.join(__dirname, 'migrations')
  },

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'julianconnor',
      password: '',
      database: 'postgres'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
    }
  }

};
