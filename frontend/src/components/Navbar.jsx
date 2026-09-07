function Navbar({ currentPage, setCurrentPage }) {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", symbol: "01" },
    { id: "students", label: "Students", symbol: "02" },
    { id: "departments", label: "Departments", symbol: "03" },
  ];

  return (
    <aside className="navigation-rail">
      <div className="rail-brand">
        <button
          className="brand-mark"
          onClick={() => setCurrentPage("dashboard")}
        >
          SC
        </button>

        <span className="brand-line"></span>

        <p className="brand-text">
          STUDENT
          <br />
          CONSOLE
        </p>
      </div>

      <nav className="rail-navigation">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`rail-item ${
              currentPage === item.id ? "active" : ""
            }`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="rail-number">{item.symbol}</span>
            <span className="rail-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="rail-footer">
        <span>ACADEMIC</span>
        <span>2026</span>
      </div>
    </aside>
  );
}

export default Navbar;