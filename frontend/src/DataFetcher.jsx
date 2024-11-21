// src/DataFetcher.js
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the Express API
  useEffect(() => {
    fetch('http://localhost:3000/test-db') // Adjust the endpoint to your server's endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
    </div>
  );
};

export default DataFetcher;

