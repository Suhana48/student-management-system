import { useEffect, useState } from "react";
import { getAllStudents } from "../api/studentApi";
import { getAllDepartments } from "../api/departmentApi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });

    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  // Statistics
  const totalStudents = students.length;
  const totalDepartments = departments.length;

  const lowAttendanceStudents = students.filter(
    (student) => student.attendance < 75
  ).length;

  const averageCgpa =
    students.length > 0
      ? (
          students.reduce((total, student) => total + student.cgpa, 0) /
          students.length
        ).toFixed(2)
      : 0;

  // Students by Department
  const studentsByDepartment = departments.map((department) => ({
    name: department.name,
    students: students.filter(
      (student) => student.department?.id === department.id
    ).length,
  }));

  // Students by Year
  const studentsByYear = [1, 2, 3, 4].map((year) => ({
    year: `Year ${year}`,
    students: students.filter((student) => student.year === year).length,
  }));

  // Attendance Data
  const attendanceData = [
    {
      name: "Good Attendance",
      value: students.filter((student) => student.attendance >= 75).length,
    },
    {
      name: "Low Attendance",
      value: students.filter((student) => student.attendance < 75).length,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of the student management system.</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="stat-card">
          <h3>Total Departments</h3>
          <p>{totalDepartments}</p>
        </div>

        <div className="stat-card">
          <h3>Average CGPA</h3>
          <p>{averageCgpa}</p>
        </div>

        <div className="stat-card">
          <h3>Low Attendance</h3>
          <p>{lowAttendanceStudents}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Students by Department */}
        <div className="chart-card full-width-chart">
          <h2>Students by Department</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentsByDepartment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" name="Students" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Students by Year */}
        <div className="chart-card">
          <h2>Students by Year</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentsByYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" name="Students" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Overview */}
        <div className="chart-card">
          <h2>Attendance Overview</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;