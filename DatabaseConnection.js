const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "ProjectWebProgrammingBOB",
  port: ,
});

db.connect((err) => {
  if (err) {
    console.error("Could not connect to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
