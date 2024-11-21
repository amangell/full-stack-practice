const express = require('express');
const knexConfig = require('./knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexConfig[environment]);
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json());  // Middleware to parse incoming JSON data

// Example API route to get data from the database
app.get('/api/data', async (req, res) => {
  try {
    const data = await knex('contacts'); // Fetch data from 'contacts' table
    res.json(data); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from database', error });
  }
});

// POST route to add a new person to the database
app.post('/api/data', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Insert the new person into the 'contacts' table
    const newPerson = await knex('contacts').insert({ name, email });

    // Respond with the new person data
    res.status(201).json({ id: newPerson[0], name, email });
  } catch (error) {
    res.status(500).json({ message: 'Error adding data to database', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

