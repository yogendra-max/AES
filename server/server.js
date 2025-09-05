const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
let pool;

// Middleware
app.use(express.json());
app.use(cors());

// Initialize database connection
async function initDB() {
  try {
    pool = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "SGDC",
    });
    console.log("✅ Connected to MySQL");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
}
initDB();

// Helper function to calculate age
function calculateAge(dob) {
  const birthDate = new Date(dob); // dob in YYYY-MM-DD
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Number(age);
}

// ------------------- CREATE -------------------
app.post("/addstudent", async (req, res) => {
  const Data = req.body;
  try {
    const sql = `
      INSERT INTO students
      (name, age, mothername, fathername, gender, I_hallticket, adhar, mobile, branch, email, dob,semester)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [
      `${Data.firstName} ${Data.lastName}`, // full name
      calculateAge(Data.dob),              // age
      Data.motherName,
      Data.fatherName,
      Data.gender,
      Data.interHallticket,
      Data.adharNo,
      Data.mobileNo,
      Data.group,
      Data.email,
      Data.dob,
      Data.semester
    ]);

    res.json({ message: "✅ Student added successfully", studentId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error adding student", error: err });
  }
});

// ------------------- READ ALL -------------------
app.get("/viewstudents", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
    console.log("📌 Fetched all students");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error fetching students", error: err });
  }
});

// ------------------- READ ONE (for Edit Page) -------------------
app.get("/student/:hallticket_no", async (req, res) => {
  const hallticket_no = req.params.hallticket_no;
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM students WHERE I_hallticket = ?",
      [hallticket_no]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "⚠️ Student not found" });
    }

    res.json(rows[0]); // return single student
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error fetching student", error: err });
  }
});


app.get("/viewstudent/:hallticket_no", async (req, res) => {
  const hallticket_no = req.params.hallticket_no;

  try {
    const [rows] = await pool.query("SELECT * FROM students WHERE hallticket_no = ?", [hallticket_no]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "❌ Student not found" });
    }

    res.json(rows[0]); // return single student
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error fetching student details", error: err });
  }
});

// ------------------- UPDATE -------------------
app.put("/updatestudent/:hallticket_no", async (req, res) => {
  const hallticket_no = req.params.hallticket_no;
  const Data = req.body;

  try {
    const sql = `
      UPDATE students
      SET name = ?, age = ?, mothername = ?, fathername = ?, gender = ?, adhar = ?, mobile = ?, branch = ?, email = ?, dob = ?
      WHERE hallticket_no = ?
    `;

    const [result] = await pool.execute(sql, [
      `${Data.firstName} ${Data.lastName}`,
      calculateAge(Data.dob),
      Data.motherName,
      Data.fatherName,
      Data.gender,
      Data.adharNo,
      Data.mobileNo,
      Data.group,
      Data.email,
      Data.dob,
      hallticket_no,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "⚠️ Student not found" });
    }

    res.json({ message: "✅ Student updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error updating student", error: err });
  }
});

// ------------------- DELETE -------------------
app.delete("/deletestudent/:hallticket_no", async (req, res) => {
  const hallticket_no = req.params.hallticket_no;
  try {
    const [result] = await pool.execute("DELETE FROM students WHERE  hallticket_no = ?", [hallticket_no]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "⚠️ Student not found" });
    }

    res.json({ message: "✅ Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error deleting student", error: err });
  }
});

// ------------------- START SERVER -------------------
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
