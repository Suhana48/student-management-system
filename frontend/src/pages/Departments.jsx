import { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";
import { getAllStudents } from "../api/studentApi";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");

  const fetchDepartments = () => {
    getAllDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  };

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
    fetchDepartments();
    fetchStudents();
  }, []);

  const handleAddDepartment = () => {
    setEditingDepartmentId(null);
    setDepartmentName("");
    setShowForm(true);
  };

  const handleEdit = (department) => {
    setEditingDepartmentId(department.id);
    setDepartmentName(department.name);
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const department = {
      name: departmentName,
    };

    const request = editingDepartmentId
      ? updateDepartment(editingDepartmentId, department)
      : createDepartment(department);

    request
      .then(() => {
        fetchDepartments();
        setDepartmentName("");
        setEditingDepartmentId(null);
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error saving department:", error);
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteDepartment(id)
      .then(() => {
        fetchDepartments();
        fetchStudents();
      })
      .catch((error) => {
        console.error("Error deleting department:", error);
      });
  };

  const handleCancel = () => {
    setDepartmentName("");
    setEditingDepartmentId(null);
    setShowForm(false);
  };

  const getStudentCount = (departmentId) => {
    return students.filter(
      (student) => student.department?.id === departmentId
    ).length;
  };

  return (
    <main className="departments-page">
      {/* Header */}

      <div className="departments-header">
        <div>
          <span className="section-label">ACADEMIC STRUCTURE</span>

          <h1>Departments</h1>

          <p>
            Organize and manage the academic departments in your
            institution.
          </p>
        </div>

        <button
          className="primary-action-btn"
          onClick={handleAddDepartment}
        >
          <span>+</span> Add Department
        </button>
      </div>

      {/* Overview */}

      <div className="departments-overview">
        <div>
          <strong>{departments.length}</strong>
          <span>
            {departments.length === 1
              ? "Department"
              : "Departments"}
          </span>
        </div>

        <p>
          {students.length} students distributed across your
          academic departments.
        </p>
      </div>

      {/* Department Grid */}

      <div className="departments-grid">
        {departments.length === 0 ? (
          <div className="empty-departments">
            <strong>No departments yet</strong>

            <p>
              Create your first department to start organizing
              students.
            </p>

            <button
              className="primary-action-btn"
              onClick={handleAddDepartment}
            >
              <span>+</span> Add Department
            </button>
          </div>
        ) : (
          departments.map((department, index) => {
            const studentCount = getStudentCount(department.id);

            return (
              <div
                className="department-card"
                key={department.id}
              >
                <div className="department-card-top">
                  <span className="department-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="department-actions">
                    <button
                      onClick={() => handleEdit(department)}
                    >
                      Edit
                    </button>

                    <button
                      className="department-delete-btn"
                      onClick={() =>
                        handleDelete(department.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="department-card-content">
                  <h2>{department.name}</h2>

                  <div className="department-student-count">
                    <strong>{studentCount}</strong>

                    <span>
                      {studentCount === 1
                        ? "student"
                        : "students"}
                    </span>
                  </div>
                </div>

                <div className="department-card-footer">
                  <span>ACTIVE DEPARTMENT</span>

                  <span className="department-dot"></span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}

      {showForm && (
        <div className="department-form-overlay">
          <div className="department-form-modal">
            <div className="form-modal-header">
              <div>
                <span className="section-label">
                  {editingDepartmentId
                    ? "UPDATE DEPARTMENT"
                    : "NEW DEPARTMENT"}
                </span>

                <h2>
                  {editingDepartmentId
                    ? "Edit department"
                    : "Add a department"}
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
              <div className="department-form-field">
                <label>Department Name</label>

                <input
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={departmentName}
                  onChange={(event) =>
                    setDepartmentName(event.target.value)
                  }
                  required
                  autoFocus
                />
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
                  {editingDepartmentId
                    ? "Save Changes"
                    : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Departments;