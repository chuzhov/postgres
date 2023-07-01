require("dotenv").config(); // Load environment variables from .env file
const { Pool } = require("pg");

//Configure the database connection
const pool = new Pool({
  connectionString:
    process.env.DB_CONNECTION_STRING,
});

// Fetch all data from the contacts table
async function getAllContacts() {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM contacts"
    );
    const contacts = result.rows;
    client.release();
    return contacts;
  } catch (error) {
    console.error(
      "Error retrieving data:",
      error
    );
    throw error;
  }
}

// Example usage of getAllContacts
getAllContacts()
  .then((contacts) => {
    console.log("All contacts:", contacts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

console.log(
  "Connection string is: ",
  process.env.DB_CONNECTION_STRING
);

// Create the "contacts" table if it doesn't exist
// pool.query(
//   `CREATE TABLE IF NOT EXISTS contacts (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL
//   )`,
//   (err, result) => {
//     if (err) {
//       console.error("Error creating table:", err);
//     } else {
//       console.log(
//         'Table "contacts" created successfully!'
//       );
//     }
//   }
// );

// Example insert query
// pool.query(
//   `INSERT INTO contacts (name, email)
//   VALUES ($1, $2)`,
//   ["Homer Simpson", "homer@thesimpsons.dev"],
//   (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//     } else {
//       console.log("Data inserted successfully!");
//     }
//   }
// );

// Close the database connection pool (optional, if needed)
// pool.end();

// Start the Node.js server
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}`
  );
});
