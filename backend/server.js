// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder where you want to save the pictures
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the filename
  },
});

const upload = multer({ storage: storage });

// Replace these with your MySQL database credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tryshirt",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// API endpoint for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Replace with your actual SQL query
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else if (results.length > 0) {
      res.json("Login successful");
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

//Crud Operations

// Add new tshirt
app.post("/api/addTshirt", upload.single("file_upload"), (req, res) => {
  const { tshirt_name, brand_name, size, price } = req.body;

  const file_upload = req.file.filename; // Get the filename from multer

  const insertQuery = `INSERT INTO tshirts (tshirt_name, brand, file_upload, size, price ) VALUES (?, ?, ?, ?, ?)`;
  const values = [tshirt_name, brand_name, file_upload, size, price];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting T-shirt data into database: ", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    console.log("T-shirt data inserted successfully");
    res.status(200).send("T-shirt added successfully");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
