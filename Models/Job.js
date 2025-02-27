const db = require("../DatabaseConnection");

class Job {
  // Get all jobs
  getAll(callback) {
    const sql = "SELECT * FROM jobs ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }

  // Get a job by ID
  getById(id, callback) {
    const sql = "SELECT * FROM jobs WHERE id = ? LIMIT 1";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  }

  // Create a new job
  create({ title, company, location, description, salary }, callback) {
    const sql =
      "INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [title, company, location, description, salary],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.insertId);
      }
    );
  }

  // Update an existing job
  update(id, { title, company, location, description, salary }, callback) {
    const sql =
      "UPDATE jobs SET title = ?, company = ?, location = ?, description = ?, salary = ? WHERE id = ?";
    db.query(
      sql,
      [title, company, location, description, salary, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.affectedRows);
      }
    );
  }

  // Delete a job
  delete(id, callback) {
    const sql = "DELETE FROM jobs WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
}

module.exports = new Job();
