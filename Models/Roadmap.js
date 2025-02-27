const db = require("../DatabaseConnection");

const Roadmap = {
  getAll(callback) {
    const sql = "SELECT * FROM roadmaps ORDER BY created_at DESC";
    db.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getById(id, callback) {
    const sql = "SELECT * FROM roadmaps WHERE id = ? LIMIT 1";
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  create({ title, description }, callback) {
    const sql = "INSERT INTO roadmaps (title, description) VALUES (?, ?)";
    db.query(sql, [title, description], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId);
    });
  },

  update(id, { title, description }, callback) {
    const sql = "UPDATE roadmaps SET title = ?, description = ? WHERE id = ?";
    db.query(sql, [title, description, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  delete(id, callback) {
    const sql = "DELETE FROM roadmaps WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = Roadmap;
