const mysql = require("mysql2")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_MYSQL_PASSWORD",
  database: "attendance_db",
})

db.connect(err => {
  if (err) {
    console.error("❌ MySQL Error:", err)
    return
  }
  console.log("✅ MySQL Connected")
})

module.exports = db
