import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/api';

const getLeaderboardUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/leaderboard/`;
  }
  return 'http://localhost:8000/api/leaderboard/';
};

function Leaderboards() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getLeaderboardUrl());
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const data = await response.json();
        setEntries(parseApiResponse(data));
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.rank || entry.name}>
            <strong>#{entry.rank || 0}</strong> · {entry.name} · {entry.points || 0} pts
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Leaderboards;
