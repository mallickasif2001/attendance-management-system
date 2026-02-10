import { useState, useEffect } from "react"
import Login from "./components/Login"
import Header from "./components/Header"
import StatsCard from "./components/StatsCard"
import StudentItem from "./components/StudentItem"
import MonthlyAttendance from "./components/MonthlyAttendance"
import { students as initialStudents } from "./data/students"

export default function App() {
  // ================= AUTH =================
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  )

  // ================= VIEW & DATE =================
  const [view, setView] = useState("daily")

  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  // ================= ATTENDANCE STATE =================
  const [attendanceByDate, setAttendanceByDate] = useState(() => {
    const saved = localStorage.getItem("attendanceByDate")
    if (saved) return JSON.parse(saved)

    return {
      [today]: initialStudents.map(s => ({ ...s })),
    }
  })

  // ================= PERSIST TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem(
      "attendanceByDate",
      JSON.stringify(attendanceByDate)
    )
  }, [attendanceByDate])

  // ================= DERIVED DATA =================
  const students = attendanceByDate[selectedDate] || []

  const present = students.filter(s => s.status === "Present").length
  const absent = students.filter(s => s.status === "Absent").length
  const late = students.filter(s => s.status === "Late").length

  // ================= HANDLERS =================
  const handleChange = (roll, status) => {
    setAttendanceByDate(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map(s =>
        s.roll === roll ? { ...s, status } : s
      ),
    }))
  }

  const markAllPresent = () => {
    setAttendanceByDate(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].map(s => ({
        ...s,
        status: "Present",
      })),
    }))
  }

  const showTodayAttendance = () => {
    alert(
      `Date: ${selectedDate}\n` +
      `Total Students: ${students.length}\n` +
      `Present: ${present}\n` +
      `Absent: ${absent}\n` +
      `Late: ${late}`
    )
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)

    setAttendanceByDate(prev => {
      if (prev[newDate]) return prev

      return {
        ...prev,
        [newDate]: initialStudents.map(s => ({ ...s })),
      }
    })
  }

  // ================= LOGIN CHECK =================
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  // ================= MONTHLY VIEW =================
  if (view === "monthly") {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Monthly Attendance – February 2026
          </h1>

          <button
            onClick={() => setView("daily")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Daily View
          </button>
        </div>

        <MonthlyAttendance
          month={2}
          year={2026}
          attendanceByDate={attendanceByDate}
        />
      </div>
    )
  }

  // ================= DAILY VIEW =================
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <Header />

      <div className="grid grid-cols-4 gap-4 p-4">
        <StatsCard title="Total Students" count={students.length} borderColor="#3b82f6" />
        <StatsCard title="Present" count={present} borderColor="#22c55e" />
        <StatsCard title="Absent" count={absent} borderColor="#ef4444" />
        <StatsCard title="Late" count={late} borderColor="#f59e0b" />
      </div>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        <div className="w-1/3 bg-white p-4 rounded-xl shadow space-y-4 h-fit">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => handleDateChange(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            onClick={markAllPresent}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            All Present
          </button>

          <button
            onClick={showTodayAttendance}
            className="w-full bg-gray-800 text-white py-2 rounded"
          >
            Today Attendance
          </button>

          <button
            onClick={() => setView("monthly")}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Monthly Attendance
          </button>
        </div>

        <div className="w-2/3 h-full overflow-y-auto pr-2">
          {students.map(student => (
            <StudentItem
              key={student.roll}
              student={student}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
