import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddContact from './AddContact';
import ManageContacts from './ManageContacts';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <header className="navbar">
          <h1>Elite Contact Manager</h1>
          <nav>
            <Link to="/">Add Contact</Link>
            <Link to="/manage">Manage Contacts</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<AddContact />} />
          <Route path="/manage" element={<ManageContacts />} />
        </Routes>
      </div>
    </Router>
  );
}



