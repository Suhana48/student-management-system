import { useEffect, useState } from "react";
import { getAllStudents } from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getAllStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <main className="dashboard">
      <h1>Students</h1>
      <p>View and manage all students.</p>

      <div>
        {students.map((student) => (
          <p key={student.id}>
            {student.name} - {student.email}
          </p>
        ))}
      </div>
    </main>
  );
}

export default Students;