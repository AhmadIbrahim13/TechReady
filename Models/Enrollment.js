const db = require("../DatabaseConnection");

const Enrollment = {
  enroll: (studentId, courseId, callback) => {
    db.query(
      "INSERT INTO enrollment (student_id, course_id) VALUES (?, ?)",
      [studentId, courseId],
      callback
    );
  },
  drop: (studentId, courseId, callback) => {
    db.query(
      "DELETE FROM enrollment WHERE student_id = ? AND course_id = ?",
      [studentId, courseId],
      callback
    );
  },
  getEnrolledCourses: (studentId, callback) => {
    const query = `
      SELECT c.* FROM courses c
      JOIN enrollment e ON c.id = e.course_id
      WHERE e.student_id = ?
    `;
    db.query(query, [studentId], callback);
  },
  isEnrolled: (studentId, courseId, callback) => {
    db.query(
      "SELECT * FROM enrollment WHERE student_id = ? AND course_id = ?",
      [studentId, courseId],
      callback
    );
  },
};

module.exports = Enrollment;
