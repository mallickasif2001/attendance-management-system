const db = require("../config/db");

// GET attendance by date
const getAttendanceByDate = (req, res) => {
  const { date } = req.params;

  const sql = `
    SELECT s.id, s.roll, s.name,
    COALESCE(a.status, 'Absent') as status
    FROM students s
    LEFT JOIN attendance a
    ON s.id = a.student_id AND a.date = ?
  `;

  db.query(sql, [date], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// SAVE attendance
const saveAttendance = (req, res) => {
  const { date, records } = req.body;

  if (!records) {
    return res.status(400).json({ message: "Records missing" });
  }

  const deleteSql = "DELETE FROM attendance WHERE date = ?";

  db.query(deleteSql, [date], (err) => {
    if (err) return res.status(500).json(err);

    records.forEach((student) => {
      const insertSql =
        "INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)";

      db.query(insertSql, [
        student.id,
        date,
        student.status,
      ]);
    });

    res.json({ message: "Attendance saved" });
  });
};

module.exports = {
  getAttendanceByDate,
  saveAttendance,
};
