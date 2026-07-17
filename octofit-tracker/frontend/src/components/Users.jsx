import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name || user.email}</strong>
            {user.role ? <span className="text-muted"> · {user.role}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
