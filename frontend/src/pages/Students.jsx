import { useEffect, useState } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";
import { getAllDepartments } from "../api/departmentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const initialStudentData = {
    name: "",
    email: "",
    phone: "",
    year: "",
    cgpa: "",
    attendance: "",
    departmentId: "",
  };

  const [studentData, setStudentData] = useState(initialStudentData);

  const fetchStudents = () => {
    getAllStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const fetchDepartments = () => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    setEditingStudentId(null);
    setStudentData(initialStudentData);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setEditingStudentId(student.id);

    setStudentData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      year: student.year,
      cgpa: student.cgpa,
      attendance: student.attendance,
      departmentId: student.department?.id || "",
    });

    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { departmentId, ...student } = studentData;

    const request = editingStudentId
      ? updateStudent(editingStudentId, student, departmentId)
      : createStudent(student, departmentId);

    request
      .then(() => {
        fetchStudents();
        setStudentData(initialStudentData);
        setEditingStudentId(null);
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error saving student:", error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteStudent(id)
      .then(() => {
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudentId(null);
    setStudentData(initialStudentData);
  };

  const filteredStudents = students.filter((student) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue) ||
      student.department?.name
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <main className="students-page">
      {/* Header */}

      <div className="students-header">
        <div>
          <span className="section-label">STUDENT DIRECTORY</span>

          <h1>Students</h1>

          <p>
            Manage student records, academic performance, and
            department information.
          </p>
        </div>

        <button
          className="primary-action-btn"
          onClick={handleAddStudent}
        >
          <span>+</span> Add Student
        </button>
      </div>

      {/* Toolbar */}

      <div className="students-toolbar">
        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search by name, email or department..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="students-count">
          <strong>{filteredStudents.length}</strong>
          <span>
            {filteredStudents.length === 1
              ? "student"
              : "students"}
          </span>
        </div>
      </div>

      {/* Student Directory */}

      <div className="student-directory">
        <div className="directory-head">
          <span>STUDENT</span>
          <span>ACADEMIC PROFILE</span>
          <span>DEPARTMENT</span>
          <span>ATTENDANCE</span>
          <span></span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-students">
            <strong>No students found</strong>
            <p>Try changing your search.</p>
          </div>
        ) : (
          filteredStudents.map((student) => (
            <div className="student-row" key={student.id}>
              {/* Student */}

              <div className="student-identity">
                <div className="student-avatar">
                  {getInitials(student.name)}
                </div>

                <div>
                  <strong>{student.name}</strong>
                  <span>{student.email}</span>
                </div>
              </div>

              {/* Academic */}

              <div className="academic-profile">
                <div>
                  <span>YEAR</span>
                  <strong>{student.year}</strong>
                </div>

                <div>
                  <span>CGPA</span>
                  <strong>{student.cgpa}</strong>
                </div>
              </div>

              {/* Department */}

              <div className="department-name">
                {student.department?.name || "Not assigned"}
              </div>

              {/* Attendance */}

              <div className="attendance-cell">
                <div className="attendance-top">
                  <strong>{student.attendance}%</strong>

                  <span
                    className={
                      Number(student.attendance) < 75
                        ? "attendance-status low"
                        : "attendance-status good"
                    }
                  >
                    {Number(student.attendance) < 75
                      ? "Low"
                      : "Good"}
                  </span>
                </div>

                <div className="mini-progress">
                  <div
                    className="mini-progress-fill"
                    style={{
                      width: `${student.attendance}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Actions */}

              <div className="student-actions">
                <button
                  className="action-edit"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>

                <button
                  className="action-delete"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Form — keeping functionality for now */}

      {showForm && (
        <div className="student-form-overlay">
          <div className="student-form-modal">
            <div className="form-modal-header">
              <div>
                <span className="section-label">
                  {editingStudentId
                    ? "UPDATE RECORD"
                    : "NEW STUDENT"}
                </span>

                <h2>
                  {editingStudentId
                    ? "Edit student"
                    : "Add a student"}
                </h2>
              </div>

              <button
                className="close-form-btn"
                onClick={handleCancel}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <p className="form-section-title">
                  PERSONAL INFORMATION
                </p>

                <div className="form-grid">
                  <div className="form-field full">
                    <label>Name</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter student's name"
                      value={studentData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field full">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="student@example.com"
                      value={studentData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field full">
                    <label>Phone</label>

                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                      value={studentData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <p className="form-section-title">
                  ACADEMIC INFORMATION
                </p>

                <div className="form-grid two-column">
                  <div className="form-field">
                    <label>Year</label>

                    <input
                      type="number"
                      name="year"
                      min="1"
                      max="4"
                      value={studentData.year}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>CGPA</label>

                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      name="cgpa"
                      value={studentData.cgpa}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Attendance (%)</label>

                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      name="attendance"
                      value={studentData.attendance}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Department</label>

                    <select
                      name="departmentId"
                      value={studentData.departmentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select Department
                      </option>

                      {departments.map((department) => (
                        <option
                          key={department.id}
                          value={department.id}
                        >
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-modal-actions">
                <button
                  type="button"
                  className="secondary-action-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-action-btn"
                >
                  {editingStudentId
                    ? "Save Changes"
                    : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Students;