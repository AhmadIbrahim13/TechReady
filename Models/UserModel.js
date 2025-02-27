const db = require("../DatabaseConnection");

const User = {
  add: (firstName, lastName, email, password, callback) => {
    db.query(
      "INSERT INTO User (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, password],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM User WHERE id = ?", id, callback);
  },
  update: (id, firstName, lastName, email, callback) => {
    db.query(
      "UPDATE User SET firstName = ?, lastName = ?, email = ? WHERE id = ?",
      [firstName, lastName, email, id],
      callback
    );
  },
  getByEmail: (email, callback) => {
    db.query("SELECT * FROM User WHERE email = ?", [email], callback);
  },
  getAll: (callback) => {
    const sql = "SELECT id, firstName, LastName, email, role FROM user";
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  create({ firstName, lastName, email, password, role }, callback) {
    const sql =
      "INSERT INTO user (firstName, LastName, email, password, role) VALUES (?, ?, ?, ?, ?)";
    const values = [firstName, lastName, email, password, role];

    db.query(sql, values, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  getById(userId, callback) {
    const sql =
      "SELECT id, firstName, LastName, email, role FROM user WHERE id = ? LIMIT 1";
    db.query(sql, [userId], (err, results) => {
      if (err) return callback(err, null);

      if (results.length === 0) {
        // No user found
        return callback(null, null);
      }

      // Return the single user object
      callback(null, results[0]);
    });
  },
  update(userId, updateData, callback) {
    const { firstName, lastName, email, role } = updateData;
    const sql = `UPDATE user SET firstName = ?, LastName = ?, email = ?, role = ? WHERE id = ?`;
    const values = [firstName, lastName, email, role, userId];

    db.query(sql, values, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
  getAllAdmins: (callback) => {
    const sql = "SELECT * FROM user WHERE role = 'admin'";
    db.query(sql, callback);
  }
};

module.exports = User;
