// models/Course.js
const db = require("../DatabaseConnection");

const Course = {
  // Get all courses
  getAllCourses: (callback) => {
    db.query('SELECT * FROM courses', callback);
},

  // Get a course by ID
  getById: (id, callback) => {
    db.query('SELECT * FROM courses WHERE id = ?', [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // Ensure you return the first result only
        const course = results.length > 0 ? results[0] : null;
        callback(null, course);
    });
},

  // Create a new course
  create: async ({ title, description, instructor, duration }) => {
    const [result] = await db.query(
      "INSERT INTO courses (title, description, instructor, duration) VALUES (?, ?, ?, ?)",
      [title, description, instructor, duration]
    );
    return result.insertId;
  },

  // Update a course
  update: (id, { title, description, instructor, duration }, callback) => {
    const sql =
      "UPDATE courses SET title = ?, description = ?, instructor = ?, duration = ? WHERE id = ?";
    db.query(
      sql,
      [title, description, instructor, duration, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result.affectedRows);
      }
    );
  },

  delete: (id, callback) => {
    // Begin a transaction
    db.beginTransaction((err) => {
      if (err) return callback(err, null);

      // First, delete enrollments associated with the course
      const deleteEnrollmentsSql = "DELETE FROM enrollment WHERE course_id = ?";
      db.query(deleteEnrollmentsSql, [id], (err, result) => {
        if (err) {
          return db.rollback(() => {
            callback(err, null);
          });
        }

        // Then, delete the course
        const deleteCourseSql = "DELETE FROM courses WHERE id = ?";
        db.query(deleteCourseSql, [id], (err, result) => {
          if (err) {
            return db.rollback(() => {
              callback(err, null);
            });
          }

          // Commit the transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                callback(err, null);
              });
            }
            callback(null, result.affectedRows);
          });
        });
      });
    });
  },
};
module.exports = Course;
