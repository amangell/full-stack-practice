import React, { useState, useEffect } from 'react';
import './DataFetcher.css';

export default function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Backend URL (adjust if the server runs on a different port or URL)
  const API_URL = 'http://localhost:3000/api/data';

  // Fetch existing contacts from the database
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch contacts');
        return response.json();
      })
      .then((data) => setPeople(data))
      .catch((err) => setError(err.message));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerson = { name, email };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact');
      }

      const addedPerson = await response.json();

      // Dynamically update the contact list with the new person
      setPeople([...people, addedPerson]);
      setName('');
      setEmail('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Contact List</h1>
        <p>Manage and view your contacts easily.</p>
      </div>

      {/* Display Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* List of Contacts */}
      <div className="list">
        {people.length > 0 ? (
          people.map((person) => (
            <div key={person.id} className="list-item">
              <span className="name">{person.name}</span>
              <span className="email">{person.email}</span>
            </div>
          ))
        ) : (
          <p>No contacts available. Add one below!</p>
        )}
      </div>

      {/* Add Contact Form */}
      <div className="form-container">
        <h2>Add a Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
}
