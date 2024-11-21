// src/DataFetcher.js
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch data from the Express API
  useEffect(() => {
    fetch('http://localhost:3000/api/data') // Adjust the endpoint to your server's endpoint
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = { name, email };

    // Send POST request to the server to add new person
    fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((newPersonData) => {
        // After successfully adding the person, update the data state
        setData([...data, newPersonData]);
        // Clear the form fields
        setName('');
        setEmail('');
      })
      .catch((error) => {
        setError('Error adding person to the database');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>People List</h1>
      <ul>
        {data.map((person) => (
          <li key={person.id}>
            <p>ID: {person.id}</p>
            <p>Name: {person.name}</p>
            <p>Email: {person.email}</p>
          </li>
        ))}
      </ul>

      <h2>Add a New Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
};

export default DataFetcher;


