import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  deleteStudent
} from "../api/student.api";

export default function StudentPanel() {
  const [students, setStudents] = useState([]);
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");

  // LOAD STUDENTS
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    getStudents()
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  };

  // ADD STUDENT
  const handleAdd = () => {
    if (!roll || !name) return;

    addStudent({ roll, name })
      .then(() => {
        setRoll("");
        setName("");
        loadStudents();
      })
      .catch(err => console.log(err));
  };

  // DELETE STUDENT
  const handleDelete = (id) => {
    deleteStudent(id)
      .then(() => {
        loadStudents();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Student Management
      </h2>

      {/* Add Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Roll"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="w-20 border rounded px-2 py-1"
        />

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Student List */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>
              {student.roll} - {student.name}
            </span>

            <button
              onClick={() => handleDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
