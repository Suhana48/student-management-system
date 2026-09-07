import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Departments from "./pages/Departments";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} />

      {currentPage === "dashboard" && <Dashboard />}
      {currentPage === "students" && <Students />}
      {currentPage === "departments" && <Departments />}
    </div>
  );
}

export default App;