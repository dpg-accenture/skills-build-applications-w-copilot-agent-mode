import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">Octofit Tracker</h1>
          <p className="lead text-muted">
            Track workouts, build teams, and stay motivated with a connected fitness experience.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              Check API Health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://react.dev/">
              React 19 Docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Application stack</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Frontend: React 19 + Vite</li>
                <li className="list-group-item">Backend: Node.js + Express + TypeScript</li>
                <li className="list-group-item">Database: MongoDB + Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
