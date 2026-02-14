const mysql = require("mysql2")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "asif2001",         
  database: "attendance_db",
})

db.connect(err => {
  if (err) {
    console.error("❌ MySQL connection error:", err)
  } else {
    console.log("✅ MySQL Connected")
  }
})

module.exports = db
