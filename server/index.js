const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "kratin",
});

// Register user route
app.post("/", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO signup (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to connect to the database" });
      return;
    }

    connection.query(sql, values, (err, result) => {
      connection.release(); // Release the connection

      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register user" });
      } else {
        console.log("User registered successfully");
        res.status(200).json({ message: "User registered successfully" });
      }
    });
  });
});

// Create patient profile route
app.post("/createProfile", (req, res) => {
  const { name, medicineName, dosage, frequency, instruction } = req.body;
  const sql =
    "INSERT INTO patientdetails (Name, Medicine, dosage, frequency, instruction) VALUES (?, ?, ?, ?, ?)";
  const values = [name, medicineName, dosage, frequency, instruction];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to connect to the database" });
      return;
    }

    connection.query(sql, values, (err, result) => {
      connection.release(); // Release the connection

      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create patient profile" });
      } else {
        console.log("Patient profile created successfully");
        res.status(200).json({ message: "Patient profile created successfully" });
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
