function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of the student management system.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>5</p>
        </div>

        <div className="stat-card">
          <h3>Total Departments</h3>
          <p>3</p>
        </div>

        <div className="stat-card">
          <h3>Low Attendance</h3>
          <p>1</p>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;