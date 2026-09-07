import { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentApi";

function Departments() {
  const [departments, setDepartments] = useState([]);
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

  useEffect(() => {
    fetchDepartments();
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

  return (
    <main className="dashboard">
      <div className="page-header">
        <div>
          <h1>Departments</h1>
          <p>View and manage all departments.</p>
        </div>

        <button
          className="add-student-btn"
          onClick={handleAddDepartment}
        >
          + Add Department
        </button>
      </div>

      {showForm && (
        <form className="student-form" onSubmit={handleSubmit}>
          <h2>
            {editingDepartmentId
              ? "Edit Department"
              : "Add New Department"}
          </h2>

          <input
            type="text"
            placeholder="Enter department name"
            value={departmentName}
            onChange={(event) => setDepartmentName(event.target.value)}
            required
          />

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {editingDepartmentId ? "Save Changes" : "Save Department"}
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
              <th>ID</th>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(department.id)}
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

export default Departments;