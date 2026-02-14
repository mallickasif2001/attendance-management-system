export default function StudentItem({ student, onChange }) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-3 border-l-4 border-blue-400">
      <div>
        <p className="text-blue-500 font-semibold">Roll {student.roll}</p>
        <p className="font-medium">{student.name}</p>
      </div>

      <select
        value={student.status || "Present"}
        onChange={(e) => onChange(student.roll, e.target.value)}
        className={`px-4 py-2 rounded-lg border font-medium
          ${
            student.status === "Present"
              ? "border-green-400 text-green-600"
              : student.status === "Absent"
              ? "border-red-400 text-red-500"
              : "border-yellow-400 text-yellow-600"
          }`}
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
        <option value="Late">Late</option>
      </select>
    </div>
  )
}
