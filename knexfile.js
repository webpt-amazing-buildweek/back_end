// Update with your config settings.

const pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false }
}

const sharedConfig = {
  client: 'pg',
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
}

module.exports = {
  production: {
    ...sharedConfig,
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    
  },
  development: {
    client: 'sqlite3',
    migrations: { directory: './data/migrations'},
    connection: { filename: './data/auth.db3' },
    seeds: { directory: './data/seeds' },
    useNullAsDefault: true,
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
};


// useNullAsDefault: true,
//   migrations: { directory: './data/migrations' },
//   pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },