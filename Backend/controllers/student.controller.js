const db = require("../config/db");


// ================= GET ALL STUDENTS =================
exports.getStudents = (req, res) => {
  const sql = "SELECT * FROM students ORDER BY roll ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("GET Students Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
};



// ================= ADD STUDENT =================
exports.addStudent = (req, res) => {
  const { roll, name } = req.body;

  // Basic validation
  if (!roll || !name) {
    return res.status(400).json({
      message: "Roll and Name are required",
    });
  }

  const sql = "INSERT INTO students (roll, name) VALUES (?, ?)";

  db.query(sql, [roll, name], (err, result) => {
    if (err) {
      console.error("Add Student Error:", err);

      // Duplicate roll handling
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "Roll number already exists",
        });
      }

      return res.status(500).json({
        message: "Failed to add student",
      });
    }

    res.status(201).json({
      message: "Student added successfully",
      studentId: result.insertId,
    });
  });
};



// ================= DELETE STUDENT =================
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Student ID is required",
    });
  }

  // Step 1: Delete attendance records first
  db.query(
    "DELETE FROM attendance WHERE student_id = ?",
    [id],
    (err) => {
      if (err) {
        console.error("Delete Attendance Error:", err);
        return res.status(500).json({
          message: "Failed to delete attendance",
        });
      }

      // Step 2: Delete student
      db.query(
        "DELETE FROM students WHERE id = ?",
        [id],
        (err2, result) => {
          if (err2) {
            console.error("Delete Student Error:", err2);
            return res.status(500).json({
              message: "Failed to delete student",
            });
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({
              message: "Student not found",
            });
          }

          res.status(200).json({
            message: "Student deleted successfully",
          });
        }
      );
    }
  );
};
