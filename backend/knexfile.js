// knexfile.js (or in your knex setup)
module.exports = {
  client: 'pg', // Ensure you're using the 'pg' client for PostgreSQL
  connection: {
    host: 'localhost', // your PostgreSQL host
    user: 'postgres', // your PostgreSQL username
    password: 'docker', // your PostgreSQL password
    database: 'test' // your PostgreSQL database name
  }
};

