// server.js
const express = require('express');
const knexConfig = require('./knexfile'); // Import your knex configuration
const knex = require('knex')(knexConfig); // Initialize knex with the configuration from knexfile.js
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Example route to test your knex connection
app.get('/test-db', async (req, res) => {
  try {
    // Test a query to check if the database is working
    const result = await knex('contacts').select('*'); // Replace with your table name
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
