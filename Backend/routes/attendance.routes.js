const express = require("express");
const router = express.Router();

const {
  getAttendanceByDate,
  saveAttendance,
} = require("../controllers/attendance.controller");

router.get("/:date", getAttendanceByDate);
router.post("/", saveAttendance);

module.exports = router;
