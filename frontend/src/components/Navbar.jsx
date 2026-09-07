function Navbar({ setCurrentPage }) {
  return (
    <nav className="navbar">
      <div
        className="navbar-brand"
        onClick={() => setCurrentPage("dashboard")}
      >
        Student Management System
      </div>

      <div className="navbar-links">
        <button onClick={() => setCurrentPage("dashboard")}>
          Dashboard
        </button>

        <button onClick={() => setCurrentPage("students")}>
          Students
        </button>

        <button onClick={() => setCurrentPage("departments")}>
          Departments
        </button>
      </div>
    </nav>
  );
}

export default Navbar;