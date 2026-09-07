import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Departments from "./pages/Departments";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

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