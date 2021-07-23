// // Update with your config settings.
// require('dotenv').config();
// if (process.env.DATABASE_URL) {
//   pg.defaults.ssl = { rejectUnauthorized: false }
// }

// const sharedConfig = {
//   client: 'pg',
  
//   migrations: { directory: './data/migrations' },
//   seeds: { directory: './data/seeds' },
// }

// module.exports = {
//   development: {
//       client: 'sqlite3',
//       migrations: { directory: './data/migrations' },
//       seeds: { directory: './data/seeds' },
//       connection: {
//         filename: "./data/development.db3"
//       },
//       useNullAsDefault: true,
//       pool: {
//           afterCreate: (conn, done) => {
//             conn.run("PRAGMA foreign_keys=ON", done);
//           },
//         },
//   },
//   testing: {
//     ...sharedConfig,
//     connection: process.env.TESTING_DATABASE_URL,
//   },
//   production: {
//     ...sharedConfig,
//     connection: process.env.DATABASE_URL,
//     pool: { min: 2, max: 10 },
//   },
// }
//require('dotenv').config()
/*
  PORT=5000
  NODE_ENV=development
  DEV_DATABASE_URL='postgresql://postgres:password@localhost:5432/database_name'
  TESTING_DATABASE_URL='postgresql://postgres:password@localhost:5432/testing_database_name'
  Put the above in your .env file. Some adjustments in the connection URLs will be needed:
    - 5432 (this is the default TCP port for PostgreSQL, should work as is and can be omitted)
    - postgres (in postgres:password, this is the default superadmin user, might work as is)
    - password (in postgres:password, replace wnpith the actual password set in pgAdmin 4)
    - database_name (use the real name of the development database you created in pgAdmin 4)
    - testing_database_name (use the real name of the testing database you created in pgAdmin 4)
*/
const pg = require('pg')
//const parse = require("pg-connection-string").parse;

// // Parse the environment variable into an object containing User, Password, Host, Port etc at separate key-value pairs
//const pgconfig = parse(process.env.DATABASE_URL);

// // Add SSL setting to default environment variable on a new key-value pair (the value itself is an object)
//pgconfig.ssl = { rejectUnauthorized: false };

// if (process.env.DATABASE_URL) {
//   pg.defaults.ssl = { rejectUnauthorized: false }
// }
console.log(">>>>>>>>>>>>>>> process.env.DATABASE_URL: ", process.env.DATABASE_URL);
const sharedConfig = {
  client: 'pg',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
}

module.exports = {
  development: {
      client: 'sqlite3',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
  connection: {
    filename: "./data/development.db3"
  },
  useNullAsDefault: true,
  pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys=ON", done);
      },
    },

  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
     },
     pool: { min: 2, max: 10 },
  },
}

// production: {
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
//   pool: {
//     min: 2,
//     max: 10,
//   },
//   migrations: {
//     directory: "./data/migrations",
//   },
//   seeds: {
//     directory: "./data/seeds",
//   },
// },

// const knex = require("knex");
// const parse = require("pg-connection-string").parse;

// // Parse the environment variable into an object containing User, Password, Host, Port etc at separate key-value pairs
// const pgconfig = parse(process.env.DATABASE_URL);

// // Add SSL setting to default environment variable on a new key-value pair (the value itself is an object)
// pgconfig.ssl = { rejectUnauthorized: false };

// const db = knex({
//   client: "pg",
//   connection: pgconfig,
// });
