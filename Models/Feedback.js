const db = require("../DatabaseConnection");

const Feedback = {
  // Add new feedback
  addFeedback: (studentName, feedback, rating, callback) => {
    const sql = `INSERT INTO feedback (student_name, feedback, rating) VALUES (?, ?, ?)`;
    db.query(sql, [studentName, feedback, rating], callback);
  },

  // Get all feedback (for admin)
  getAllFeedback: (callback) => {
    const sql = `SELECT * FROM feedback ORDER BY created_at DESC`;
    db.query(sql, callback);
  }
};

module.exports = Feedback;
