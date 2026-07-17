import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/api';

const getTeamsUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/teams/`;
  }
  return 'http://localhost:8000/api/teams/';
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(getTeamsUrl());
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }
        const data = await response.json();
        setTeams(parseApiResponse(data));
      } catch (err) {
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name}</strong>
            {team.members ? <span className="text-muted"> · {team.members} members</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
