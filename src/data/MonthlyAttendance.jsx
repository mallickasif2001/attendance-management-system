import { students } from "../data/students"
import { attendanceData } from "../data/monthlyData"

export default function MonthlyAttendance({ month }) {
  const daysInMonth = new Date(2026, month, 0).getDate()

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="border-collapse w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Roll</th>
            <th className="border p-2 bg-gray-100">Name</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th key={i} className="border p-2 bg-gray-100">
                {i + 1}
              </th>
            ))}
            <th className="border p-2 bg-gray-100">P</th>
            <th className="border p-2 bg-gray-100">A</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => {
            let present = 0
            let absent = 0

            return (
              <tr key={student.roll}>
                <td className="border p-2">{student.roll}</td>
                <td className="border p-2">{student.name}</td>

                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = String(i + 1).padStart(2, "0")
                  const date = `2026-02-${day}`
                  const status = attendanceData[date]?.[student.roll]

                  if (status === "Present") present++
                  if (status === "Absent") absent++

                  return (
                    <td
                      key={date}
                      className={`border p-2 text-center ${
                        status === "Present"
                          ? "text-green-600"
                          : status === "Absent"
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    >
                      {status ? status[0] : "-"}
                    </td>
                  )
                })}

                <td className="border p-2 text-green-600 font-semibold">
                  {present}
                </td>
                <td className="border p-2 text-red-500 font-semibold">
                  {absent}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
