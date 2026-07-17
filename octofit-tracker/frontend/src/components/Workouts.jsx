import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/api';

const getWorkoutsUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName && typeof codespaceName === 'string' && codespaceName.trim()) {
    return `https://${codespaceName.trim()}-8000.app.github.dev/api/workouts/`;
  }
  return 'http://localhost:8000/api/workouts/';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getWorkoutsUrl());
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }
        const data = await response.json();
        setWorkouts(parseApiResponse(data));
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.title}>
            <strong>{workout.title}</strong>
            {workout.difficulty ? <span className="text-muted"> · {workout.difficulty}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
