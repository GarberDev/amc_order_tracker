const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/medications", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM medications ORDER BY date_entered DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/medications", async (req, res) => {
  const { medication_name, quantity, person_entered, backordered } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO medications (medication_name, quantity, person_entered, backordered, medication_status) VALUES ($1, $2, $3, $4, 'to_be_ordered') RETURNING *",
      [medication_name, quantity, person_entered, backordered]
    );
    console.log(result.rows);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).send("Server Error");
  }
});

app.patch("/api/medications/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["to_be_ordered", "on_order", "received"].includes(status)) {
    return res.status(400).send("Invalid status");
  }

  try {
    const result = await pool.query(
      "UPDATE medications SET medication_status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Medication not found");
    }
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/medications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM medications WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      // Medication found and deleted
      res.json({
        message: "Medication deleted",
        deletedMedication: result.rows[0],
      });
    } else {
      // Medication not found
      res.status(404).send("Medication not found");
    }
  } catch (error) {
    console.error("Error details:", error.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
