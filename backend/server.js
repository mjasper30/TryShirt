// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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
const tshirts = [];

const bcrypt = require("bcrypt");
const saltRounds = 10; // Adjust the number of salt rounds based on your security requirements

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Replace with your actual SQL query
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    } else if (results.length > 0) {
      const user = results[0];
      try {
        const match = await bcrypt.compare(password, user.password);

        if (match) {
          res.json("Login successful");
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// Endpoint to get all T-Shirts
app.get("/api/getTshirts", (req, res) => {
  db.query("SELECT * FROM tshirts", (err, results) => {
    if (err) {
      console.error("Error fetching T-Shirts from MySQL:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get all getUsers
app.get("/api/getUsers", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error fetching Users from MySQL:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

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

// Update users
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, username, email, role, password } = req.body;
  const query =
    "UPDATE users SET name = ?, username = ?, email = ?, role = ?, password = ? WHERE id = ?";
  db.query(
    query,
    [name, username, email, role, password, id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("RFID updated successfully");
      }
    }
  );
});

// Add new user
app.post("/api/addUser", async (req, res) => {
  const { name, username, email, role, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `INSERT INTO users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, username, email, role, hashedPassword];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting user data into database: ", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("User data inserted successfully");
      res.status(200).send("User added successfully");
    });
  } catch (error) {
    console.error("Error hashing password: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete users
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("User deleted successfully");
    }
  });
});

// Update tshirt
app.put("/api/tshirts/:id", upload.single("file_upload"), (req, res) => {
  const { id } = req.params;
  const { tshirt_name, brand_name, size, price } = req.body;

  let file_upload = req.file ? req.file.filename : null; // Get the filename from multer if a new file is uploaded

  const getOldFileNameQuery = "SELECT file_upload FROM tshirts WHERE id = ?";
  db.query(getOldFileNameQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching old file name:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const oldFileName = result[0].file_upload;

    const updateQuery =
      "UPDATE tshirts SET tshirt_name = ?, brand = ?, file_upload = ?, size = ?, price = ? WHERE id = ?";
    const values = [
      tshirt_name,
      brand_name,
      file_upload || oldFileName,
      size,
      price,
      id,
    ];

    db.query(updateQuery, values, (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Error updating T-shirt data into database: ", updateErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      // If a new file is uploaded, remove the old file
      if (file_upload && oldFileName) {
        const filePath = path.join(__dirname, "uploads", oldFileName);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting old file:", unlinkErr);
          }
        });
      }

      console.log("T-shirt data updated successfully");
      res.status(200).send("T-Shirt updated successfully");
    });
  });
});

// Delete users
app.delete("/api/tshirts/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM tshirts WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send("User deleted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
