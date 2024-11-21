require('dotenv').config()
const connectionString = process.env.DB_CONNECTION_STRING;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: connectionString
  },
}

