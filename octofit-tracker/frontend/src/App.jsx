import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboards from './components/Leaderboards';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboards', label: 'Leaderboards' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <section>
      <h2 className="h4 mb-3">Octofit Tracker</h2>
      <p className="text-muted">
        Use the navigation above to inspect users, teams, activities, leaderboard data, and workouts.
      </p>
      <div className="alert alert-info">
        Set VITE_CODESPACE_NAME in .env.local when running in Codespaces to target
        https://{your-codespace-name}-8000.app.github.dev/api/....
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="container py-4">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h1 className="h3 mb-1">Octofit Tracker</h1>
          <p className="text-muted mb-0">React presentation layer for the Octofit API</p>
        </div>
        <nav className="nav nav-pills mt-3 mt-md-0">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboards" element={<Leaderboards />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App
