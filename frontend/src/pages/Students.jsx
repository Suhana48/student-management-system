import { useEffect, useState } from "react";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

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

  useEffect(() => {
    fetchStudents();
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

  return (
    <main className="dashboard">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>View and manage all students.</p>
        </div>

        <button
          className="add-student-btn"
          onClick={handleAddStudent}
        >
          + Add Student
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>
            {editingStudentId ? "Edit Student" : "Add New Student"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={studentData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={studentData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={studentData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Enter year"
            value={studentData.year}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="cgpa"
            placeholder="Enter CGPA"
            value={studentData.cgpa}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="attendance"
            placeholder="Enter attendance"
            value={studentData.attendance}
            onChange={handleChange}
            required
          />

          <select
            name="departmentId"
            value={studentData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="1">Computer Science Engineering</option>
            <option value="2">Information Technology</option>
            <option value="3">Electronics Engineering</option>
          </select>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingStudentId ? "Save Changes" : "Save Student"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Attendance</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.year}</td>
                <td>{student.cgpa}</td>
                <td>{student.attendance}%</td>
                <td>{student.department?.name}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Students;