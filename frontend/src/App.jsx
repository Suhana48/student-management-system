import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Departments from "./pages/Departments";

const ADMIN_EMAIL = "admin@student.com";
const ADMIN_PASSWORD = "admin123";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      email.trim() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid email or password.");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-brand">
            <div className="login-brand-mark">SM</div>

            <div>
              <p>STUDENT MANAGEMENT</p>
              <span>ADMIN PORTAL</span>
            </div>
          </div>

          <div className="login-heading">
            <span>WELCOME BACK</span>
            <h1>Sign in to continue.</h1>
            <p>
              Enter your admin credentials to access
              the student management system.
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>

            <div className="login-field">
              <label htmlFor="email">EMAIL</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setLoginError("");
                }}
                placeholder="Enter admin email"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">PASSWORD</label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setLoginError("");
                }}
                placeholder="Enter password"
                required
              />
            </div>

            {loginError && (
              <p className="login-error">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          <div className="login-footer">
            <span>ADMIN ACCESS ONLY</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="main-content">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "students" && <Students />}
        {currentPage === "departments" && <Departments />}
      </main>
    </div>
  );
}

export default App;