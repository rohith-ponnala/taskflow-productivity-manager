import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo-section">
          <div className="logo-circle">✓</div>

          <div>
            <h1 className="brand-name">TodoMaster</h1>
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="nav-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="nav-btn primary-btn">
              Register
            </button>
          </Link>
        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <h1>
          Organize Your Tasks.
          <br />
          Achieve More Every Day.
        </h1>

        <p>
          Manage daily work, track progress,
          stay productive, and complete goals
          from anywhere and on any device.
        </p>

        <div className="hero-buttons">

          <Link to="/register">
            <button className="hero-btn">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="hero-btn secondary-btn">
              Login
            </button>
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Create Tasks</h3>
          <p>
            Organize everything in one place.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Track Progress</h3>
          <p>
            Monitor completed and pending work.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Search Quickly</h3>
          <p>
            Find any task instantly.
          </p>
        </div>

      </section>

      {/* WHY SECTION */}

      <section className="why-section">

        <h2>
          Why Choose TodoMaster?
        </h2>

        <div className="why-grid">

          <div className="why-card">
            ✔ Easy Task Management
          </div>

          <div className="why-card">
            ✔ Progress Tracking
          </div>

          <div className="why-card">
            ✔ Secure Accounts
          </div>

          <div className="why-card">
            ✔ Mobile Friendly
          </div>

          <div className="why-card">
            ✔ Fast Search Filters
          </div>

          <div className="why-card">
            ✔ Modern Dashboard
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats">

        <div className="stat-card">
          <h2>10K+</h2>
          <p>Tasks Managed</p>
        </div>

        <div className="stat-card">
          <h2>500+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>Productivity Tracking</p>
        </div>

      </section>

      {/* FOOTER */}

      <footer>

        <h3>TodoMaster</h3>

        <p>
          Organize smarter. Work faster.
        </p>

        <p>
          © 2026 TodoMaster. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;