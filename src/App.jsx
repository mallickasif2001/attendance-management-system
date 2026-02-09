import { useState } from "react"
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

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  // ================= DATE & VIEW =================
  const [view, setView] = useState("daily")

  const today = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState(today)

  // ================= ATTENDANCE STATE =================
  const [attendanceByDate, setAttendanceByDate] = useState({
    [today]: initialStudents.map(s => ({ ...s })),
  })

  const students = attendanceByDate[selectedDate] || []

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

  // ================= STATS =================
  const present = students.filter(s => s.status === "Present").length
  const absent = students.filter(s => s.status === "Absent").length
  const late = students.filter(s => s.status === "Late").length

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
      {/* Header */}
      <Header />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 p-4">
        <StatsCard title="Total Students" count={students.length} borderColor="#3b82f6" />
        <StatsCard title="Present" count={present} borderColor="#22c55e" />
        <StatsCard title="Absent" count={absent} borderColor="#ef4444" />
        <StatsCard title="Late" count={late} borderColor="#f59e0b" />
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Left panel */}
        <div className="w-1/3 bg-white p-4 rounded-xl shadow space-y-4 h-fit">

          {/* Calendar */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const date = e.target.value
                setSelectedDate(date)

                setAttendanceByDate(prev => ({
                  ...prev,
                  [date]: prev[date] || initialStudents.map(s => ({ ...s })),
                }))
              }}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* All Present */}
          <button
            onClick={markAllPresent}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            All Present
          </button>

          {/* Monthly */}
          <button
            onClick={() => setView("monthly")}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Monthly Attendance
          </button>
        </div>

        {/* Right panel – ONLY THIS SCROLLS */}
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
