import { useState, useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import StudentItem from "./components/StudentItem";
import MonthlyAttendance from "./components/MonthlyAttendance";
import StudentPanel from "./components/StudentPanel";

import { students as initialStudents } from "./data/students";
import { getAttendanceByDate, saveAttendance } from "./api/attendance.api";

export default function App() {

  // ================= AUTH =================
  const [isLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  // ================= VIEW =================
  const [view, setView] = useState("daily");

  // ================= DATE =================
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  // ================= ATTENDANCE =================
  const [attendanceByDate, setAttendanceByDate] = useState({});
  const students = attendanceByDate[selectedDate] ?? [];

  // ================= LOAD ATTENDANCE =================
  useEffect(() => {
    getAttendanceByDate(selectedDate)
      .then((res) => {
        setAttendanceByDate((prev) => ({
          ...prev,
          [selectedDate]: res.data,
        }));
      })
      .catch(() => {
        setAttendanceByDate((prev) => ({
          ...prev,
          [selectedDate]: initialStudents.map((s) => ({ ...s })),
        }));
      });
  }, [selectedDate]);

  // ================= HANDLERS =================
  const handleChange = (roll, status) => {
    const updated = students.map((s) =>
      s.roll === roll ? { ...s, status } : s
    );

    setAttendanceByDate((prev) => ({
      ...prev,
      [selectedDate]: updated,
    }));

    saveAttendance(selectedDate, updated);
  };

  const markAllPresent = () => {
    const updated = students.map((s) => ({
      ...s,
      status: "Present",
    }));

    setAttendanceByDate((prev) => ({
      ...prev,
      [selectedDate]: updated,
    }));

    saveAttendance(selectedDate, updated);
  };

  // ================= STATS =================
  const present = students.filter((s) => s.status === "Present").length;
  const absent = students.filter((s) => s.status === "Absent").length;
  const late = students.filter((s) => s.status === "Late").length;

  // ================= LOGIN CHECK =================
  if (!isLoggedIn) {
    return <Login />;
  }

  // ================= MONTHLY VIEW =================
  if (view === "monthly") {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Monthly Attendance</h1>

          <button
            onClick={() => setView("daily")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Daily
          </button>
        </div>

        <MonthlyAttendance
          month={new Date(selectedDate).getMonth() + 1}
          year={new Date(selectedDate).getFullYear()}
          attendanceByDate={attendanceByDate}
        />
      </div>
    );
  }

  // ================= DAILY VIEW =================
  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <Header />

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 p-4">
        <StatsCard title="Total Students" count={students.length} borderColor="#3b82f6" />
        <StatsCard title="Present" count={present} borderColor="#22c55e" />
        <StatsCard title="Absent" count={absent} borderColor="#ef4444" />
        <StatsCard title="Late" count={late} borderColor="#f59e0b" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 gap-4 px-4 pb-4 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-1/3 space-y-4">

          <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            <button
              onClick={markAllPresent}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Mark All Present
            </button>

            <button
              onClick={() => setView("monthly")}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Monthly Attendance
            </button>
          </div>

          <StudentPanel />
        </div>

        {/* RIGHT PANEL — SCROLL ENABLED */}
        <div className="w-2/3 bg-white rounded-xl shadow p-4 overflow-y-auto">

          {students.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No students found
            </p>
          ) : (
            students.map((student) => (
              <StudentItem
                key={student.roll}
                student={student}
                onChange={handleChange}
              />
            ))
          )}

        </div>

      </div>
    </div>
  );
}
