// Update with your config settings.
const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {
  production: {
    ...sharedConfig,
    client : 'sqlite3',
    connection: process.env.DATABASE_URL,
  },
  development: {
    ...sharedConfig,
    connection: { filename: './data/auth.db3' },
    seeds: { directory: './data/seeds' },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/test.db3' },
  },
};