import { useEffect, useState } from "react";
import { getAllStudents } from "../api/studentApi";
import { getAllDepartments } from "../api/departmentApi";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((response) => setStudents(response.data))
      .catch((error) =>
        console.error("Error fetching students:", error)
      );

    getAllDepartments()
      .then((response) => setDepartments(response.data))
      .catch((error) =>
        console.error("Error fetching departments:", error)
      );
  }, []);

  const averageCgpa =
    students.length > 0
      ? (
          students.reduce(
            (total, student) => total + Number(student.cgpa),
            0
          ) / students.length
        ).toFixed(2)
      : "0.00";

  const averageAttendance =
    students.length > 0
      ? (
          students.reduce(
            (total, student) =>
              total + Number(student.attendance),
            0
          ) / students.length
        ).toFixed(1)
      : "0";

  const lowAttendanceStudents = students.filter(
    (student) => Number(student.attendance) < 75
  ).length;

  const departmentData = departments.map((department) => ({
    name: department.name,
    students: students.filter(
      (student) => student.department?.id === department.id
    ).length,
  }));

  const yearData = [1, 2, 3, 4].map((year) => ({
    year,
    students: students.filter(
      (student) => Number(student.year) === year
    ).length,
  }));

  const maxDepartmentStudents = Math.max(
    ...departmentData.map((item) => item.students),
    1
  );

  const maxYearStudents = Math.max(
    ...yearData.map((item) => item.students),
    1
  );

  return (
    <main className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-header">
          <span className="section-label">OVERVIEW</span>
          <h1>Academic snapshot.</h1>
          <p>
            A quick overview of students, departments, and
            academic performance.
          </p>
        </div>

        <div className="dashboard-date">
          STUDENT MANAGEMENT
          <strong>2026</strong>
        </div>
      </div>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-block">
          <span>Total Students</span>
          <strong>{students.length}</strong>
          <small>Registered students</small>
        </div>

        <div className="stat-block">
          <span>Departments</span>
          <strong>{departments.length}</strong>
          <small>Academic departments</small>
        </div>

        <div className="stat-block">
          <span>Average CGPA</span>
          <strong>{averageCgpa}</strong>
          <small>Overall performance</small>
        </div>

        <div className="stat-block warning">
          <span>Low Attendance</span>
          <strong>{lowAttendanceStudents}</strong>
          <small>Below 75% attendance</small>
        </div>
      </section>

      {/* Charts Row */}
      <section className="dashboard-grid">
        {/* Department Distribution */}
        <div className="chart-panel department-panel">
          <div className="panel-header">
            <div>
              <span className="section-label">
                DISTRIBUTION
              </span>
              <h2>Students by department</h2>
            </div>

            <span className="panel-value">
              {students.length} total
            </span>
          </div>

          <div className="bar-chart">
            {departmentData.map((item) => (
              <div className="bar-item" key={item.name}>
                <div className="bar-info">
                  <span>{item.name}</span>
                  <strong>{item.students}</strong>
                </div>

                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${
                        (item.students /
                          maxDepartmentStudents) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance */}
        <div className="chart-panel attendance-panel">
          <div className="panel-header">
            <div>
              <span className="section-label">
                ATTENDANCE
              </span>
              <h2>Overall attendance</h2>
            </div>
          </div>

          <div className="attendance-display">
            <div className="attendance-circle">
              <span>{averageAttendance}%</span>
            </div>

            <div className="attendance-details">
              <strong>
                {Number(averageAttendance) >= 75
                  ? "Healthy"
                  : "Needs attention"}
              </strong>

              <p>
                Average attendance across all registered
                students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Year Distribution */}
      <section className="chart-panel year-panel">
        <div className="panel-header">
          <div>
            <span className="section-label">
              ACADEMIC YEAR
            </span>
            <h2>Student distribution by year</h2>
          </div>
        </div>

        <div className="year-chart">
          {yearData.map((item) => (
            <div className="year-item" key={item.year}>
              <div className="year-top">
                <span>Year {item.year}</span>
                <strong>{item.students} students</strong>
              </div>

              <div className="year-track">
                <div
                  className="year-fill"
                  style={{
                    width: `${
                      (item.students / maxYearStudents) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;