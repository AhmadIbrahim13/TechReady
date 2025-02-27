// models/Interview.js
const db = require("../DatabaseConnection");

const Interview = {
  // Add a new interviewer
  addInterviewer: (data, callback) => {
    const sql = "INSERT INTO interviewers (name, email, photo) VALUES (?, ?, ?)";
    const values = [data.name, data.email, data.photo];
    db.query(sql, values, callback);
  },

  // Get all interviewers
  getAllInterviewers: (callback) => {
    const sql = "SELECT * FROM interviewers ORDER BY name";
    db.query(sql, callback);
  },

  // Get interviews by interviewer ID
  getInterviewsByInterviewer: (interviewerId, callback) => {
    const sql = `
      SELECT i.*, intv.name AS interviewer_name 
      FROM interviews i
      JOIN interviewers intv ON i.interviewer_id = intv.id
      WHERE i.interviewer_id = ?
      ORDER BY i.date, i.time
    `;
    db.query(sql, [interviewerId], callback);
  },

  // Get all interviews
  getAllInterviews: (callback) => {
    const sql = `
      SELECT i.*, intv.name AS interviewer_name 
      FROM interviews i
      JOIN interviewers intv ON i.interviewer_id = intv.id
      ORDER BY i.date, i.time
    `;
    db.query(sql, callback);
  },

  // Schedule an interview
  scheduleInterview: (data, callback) => {
    const sql = `
      INSERT INTO interviews (username, email, university, interviewer_id, date, time, meeting_type, online_platform)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.username,
      data.email,
      data.university,
      data.interviewerId,
      data.date,
      data.time,
      data.meetingType,
      data.onlinePlatform || null,
    ];
    db.query(sql, values, callback);
  },
  getInterviewerById: (id, callback) => {
    const sql = "SELECT * FROM interviewers WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]); // Return the first result
    });
},


updateInterviewer: (id, data, callback) => {
    const sql = "UPDATE interviewers SET name = ?, email = ?, photo = ? WHERE id = ?";
    const values = [data.name, data.email,data.photo, id];
    db.query(sql, values, callback);
},


  // Delete an interviewer
  deleteInterviewer: (id, callback) => {
    const sql = "DELETE FROM interviewers WHERE id = ?";
    db.query(sql, [id], callback);
  }
};

module.exports = Interview;
