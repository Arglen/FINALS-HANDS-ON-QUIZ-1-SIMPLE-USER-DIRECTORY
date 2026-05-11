import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Display only the first 5 users
        setUsers(data.slice(0, 5));
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="status-message">Loading users...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  return (
    <div className="app">
      <h1>User List</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p><span className="label">Email:</span> {user.email}</p>
            <p><span className="label">Company:</span> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
