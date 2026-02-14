const db = require("../config/db");
const bcrypt = require("bcrypt");

// ================= LOGIN CONTROLLER =================
exports.login = (req, res) => {
  const { username, password } = req.body;

  // 1️⃣ Validation
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password required",
    });
  }

  // 2️⃣ Check user
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const user = results[0];

    try {
      // 3️⃣ Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      // 4️⃣ Success
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });

    } catch (compareError) {
      console.error("Bcrypt Error:", compareError);
      return res.status(500).json({
        message: "Password compare error",
      });
    }
  });
};
