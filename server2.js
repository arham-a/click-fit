const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "database"
});

app.post("/add-user", async (req, res) => {
  const { email, password, type, active } = req.body;
  try {
    await db.execute(
      "CALL addUser(?, ?, ?, ?)",
      [email, password, type, active]
    );

    res.json({ message: "User added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
