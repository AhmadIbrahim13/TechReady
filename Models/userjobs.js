const db = require("../DatabaseConnection");

const UserJob = {
  apply: (userId, jobId, cvFile, callback) => {
    const sql = "INSERT INTO user_jobs (user_id, job_id, cv_file) VALUES (?, ?, ?)";
    db.query(sql, [userId, jobId, cvFile], callback);
  },

  getUserApplications: (userId, callback) => {
    const sql = `
      SELECT jobs.title, jobs.company, jobs.location, user_jobs.applied_at, user_jobs.cv_file
      FROM user_jobs
      INNER JOIN jobs ON user_jobs.job_id = jobs.id
      WHERE user_jobs.user_id = ?
      ORDER BY user_jobs.applied_at DESC
    `;
    db.query(sql, [userId], callback);
  },
};

module.exports = UserJob;
