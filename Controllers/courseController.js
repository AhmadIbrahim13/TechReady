const Course = require("../Models/Course");
const Enrollment = require("../Models/Enrollment");

const courseController = {
  // Display all courses for users with Enroll/Drop buttons
  getAllUserCourses: (req, res) => {
    const userId = req.session.userId;

    Course.getAllCourses((err, courses) => {
      if (err) {
        console.error("Error fetching courses:", err);
        return res.status(500).send("Error fetching courses.");
      }

      Enrollment.getEnrolledCourses(userId, (err, enrolledCourses) => {
        if (err) {
          console.error("Error fetching enrolled courses:", err);
          return res.status(500).send("Error fetching enrolled courses.");
        }

        // Extract enrolled course IDs
        const enrolledCourseIds = enrolledCourses.map((course) => course.id);

        // Render the UserCourses view with enrolled course IDs
        res.render("UserCourses", { courses, enrolledCourseIds });
      });
    });
  },

  // Enroll a user in a course
  enrollCourse: (req, res) => {
    const { courseId } = req.body;
    const userId = req.session.userId;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    Enrollment.enroll(userId, courseId, (err) => {
      if (err) {
        console.error("Error enrolling in course:", err);
        return res.status(500).send("Error enrolling in course.");
      }
      res.redirect("/courses");
    });
  },

  // Drop a course the user is enrolled in
  dropCourse: (req, res) => {
    const { courseId } = req.body;
    const userId = req.session.userId;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required." });
    }

    Enrollment.drop(userId, courseId, (err) => {
      if (err) {
        console.error("Error dropping course:", err);
        return res.status(500).send("Error dropping course.");
      }
      res.redirect("/courses");
    });
  },

  // View user's enrolled courses
  getEnrolledCoursesPage: (req, res) => {
    const userId = req.session.userId;

    Enrollment.getEnrolledCourses(userId, (err, courses) => {
      if (err) {
        console.error("Error fetching enrolled courses:", err);
        return res.status(500).send("Error fetching enrolled courses.");
      }
      res.render("enrolledCourses", { courses });
    });
  },

  // Admin functionalities
  showCreateCourseForm: (req, res) => {
    res.render("create-course");
  },

  createCourse: async (req, res) => {
    try {
      const { title, description, instructor, duration } = req.body;

      if (!title || !description || !instructor || !duration) {
        return res.redirect("/admin/create-course");
      }

      await Course.create({ title, description, instructor, duration });

      res.redirect("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      res.redirect("/admin/create-course");
    }
  },

  showEditCourseForm: (req, res) => {
    const { id } = req.params;

    Course.getById(id, (err, course) => {
      if (err) {
        console.error("Error fetching course:", err);
        return res.redirect("/admin/courses");
      }
      if (!course) {
        return res.redirect("/admin/courses");
      }
      res.render("edit-course", { course });
    });
  },

  editCourse: (req, res) => {
    const { id } = req.params;
    const { title, description, instructor, duration } = req.body;

    if (!title || !description || !instructor || !duration) {
      return res.redirect(`/admin/courses/edit-course/${id}`);
    }

    Course.update(id, { title, description, instructor, duration }, (err, affectedRows) => {
      if (err) {
        console.error("Error updating course:", err);
        return res.redirect(`/admin/courses/edit-course/${id}`);
      }
      res.redirect("/admin/courses");
    });
  },

  deleteCourse: (req, res) => {
    const { id } = req.params;

    Course.delete(id, (err, affectedRows) => {
      if (err) {
        console.error("Error deleting course:", err);
        return res.redirect("/admin/courses");
      }
      res.redirect("/admin/courses");
    });
  },

  viewCourseDetails: (req, res) => {
    const { id } = req.params;

    Course.getById(id, (err, course) => {
      if (err) {
        console.error("Error fetching course details:", err);
        return res.redirect("/admin/courses");
      }
      if (!course) {
        return res.redirect("/admin/courses");
      }
      res.render("course-details", { course });
    });
  },
  showAllCourses: (req, res) => {
    Course.getAllCourses((err, results) => {
      if (err) {
        console.error("Error fetching courses:", err);
        return res.status(500).send("Error fetching courses.");
      }
      res.render("courses", { courses: results });
    });
  },
};

module.exports = courseController;
