import React, { useState, useEffect } from 'react';
import './ManageContacts.css';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:3000/api/data';

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete contact');
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id) => {
    const updatedName = prompt('Enter new name:');
    const updatedEmail = prompt('Enter new email:');
    if (!updatedName || !updatedEmail) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, email: updatedEmail }),
      });

      if (!response.ok) throw new Error('Failed to update contact');

      const updatedContact = await response.json();
      setContacts(
        contacts.map((contact) => (contact.id === id ? updatedContact : contact))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Manage Contacts</h2>
      {error && <div className="error-message">{error}</div>}
      {contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-item">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <button onClick={() => handleUpdate(contact.id)}>Update</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No contacts available!</p>
      )}
    </div>
  );
}

