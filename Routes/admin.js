const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const roadmapController = require("../Controllers/roadmapController");
const courseController = require("../Controllers/courseController");
const jobController = require("../Controllers/jobController");
const feedbackController=require("../Controllers/feedbackController");
const InterviewController = require("../Controllers/InterviewController");

const { body, validationResult } = require("express-validator");

// Middleware to verify admin user
function isAdmin(req, res, next) {
  // This is a placeholder. You'll need real logic here.
  // For example: Check req.session.userRole === 'admin'
  if (req.session && req.session.userRole === "admin") {
    return next();
  }
  return res.status(403).send("Access denied");
}

// Show the admin dashboard with a list of all users
router.get("/admin", isAdmin, adminController.showAllUsers);

// Show form to create a new user
router.get("/admin/create-user", isAdmin, adminController.showCreateForm);

// Handle form submission to create new user
router.post("/admin/create-user", isAdmin, adminController.createUser);

// Show form to edit an existing user
router.get("/admin/edit-user/:id", isAdmin, adminController.showEditForm);

// Handle form submission to update user
router.post("/admin/edit-user/:id", isAdmin, adminController.editUser);

// Delete a user
router.post("/admin/delete-user/:id", isAdmin, adminController.deleteUser);

router.get("/admin/roadmaps", roadmapController.showAllRoadmaps);
router.get("/admin/create-roadmap", roadmapController.showCreateRoadmapForm);
router.post("/admin/create-roadmap", roadmapController.createRoadmap);
router.get("/admin/edit-roadmap/:id", roadmapController.showEditRoadmapForm);
router.post("/admin/edit-roadmap/:id", roadmapController.editRoadmap);
router.post("/admin/delete-roadmap/:id", roadmapController.deleteRoadmap);
router.get("/admin/roadmaps/:id/steps", roadmapController.viewRoadmapSteps);


router.get("/admin/courses", isAdmin, courseController.showAllCourses);

// Show create course form
router.get("/admin/create-course", courseController.showCreateCourseForm);

// Handle create course with validation
router.post(
  "/admin/create-course",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("instructor").notEmpty().withMessage("Instructor name is required"),
    body("duration").notEmpty().withMessage("Duration is required"),
    // Add more validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Collect error messages
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join("<br>");
      return res.redirect("/admin/courses");
    }
    next();
  },
  courseController.createCourse
);

// Show edit course form
router.get("/admin/edit-course/:id", courseController.showEditCourseForm);

// Handle edit course with validation
router.post(
  "/admin/edit-course/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("instructor").notEmpty().withMessage("Instructor name is required"),
    body("duration").notEmpty().withMessage("Duration is required"),
    // Add more validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Collect error messages
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join("<br>");
      req.flash("error_msg", errorMessages);
      return res.redirect(`/admin/courses/edit-course/${req.params.id}`);
    }
    next();
  },
  courseController.editCourse
);

// Handle delete course
router.post("/admin/delete-course/:id", courseController.deleteCourse);

// View course details
router.get("/admin/courses/:id", courseController.viewCourseDetails);

// Display all jobs
router.get("/admin/jobs", jobController.showAllJobs);

// Show create job form
router.get("/admin/jobs/create-job", jobController.showCreateJobForm);

// Handle create job with validation
router.post(
  "/admin/jobs/create-job",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("location").notEmpty().withMessage("Location is required"),
    // Add more validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Collect error messages
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join("<br>");
      req.flash("error_msg", errorMessages);
      return res.redirect("/admin/jobs/create-job");
    }
    next();
  },
  jobController.createJob
);

// Show edit job form
router.get("/admin/jobs/edit-job/:id", jobController.showEditJobForm);

// Handle edit job with validation
router.post(
  "/admin/jobs/edit-job/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("location").notEmpty().withMessage("Location is required"),
    // Add more validation rules as needed
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Collect error messages
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join("<br>");
      req.flash("error_msg", errorMessages);
      return res.redirect(`/admin/jobs/edit-job/${req.params.id}`);
    }
    next();
  },
  jobController.editJob
);

// Handle delete job
router.post("/admin/jobs/delete-job/:id", jobController.deleteJob);

// View job details
router.get("/admin/jobs/:id", jobController.viewJobDetails);
router.get("/admin/feedbacks", isAdmin, feedbackController.getAllFeedback);


// Manage Interviewers
router.get("/admin/interviewers", InterviewController.showAllInterviewers);

// Add a new interviewer
router.post("/admin/interviewers/add", InterviewController.addInterviewer);

// Edit an interviewer
router.get("/admin/interviewers/:id/edit", InterviewController.editInterviewerForm);
router.post("/admin/interviewers/:id/edit", InterviewController.editInterviewer);

// Delete an interviewer
router.post("/admin/interviewers/:id/delete", InterviewController.deleteInterviewer);

// View all interviews for a specific interviewer
router.get("/admin/interviewers/:id/interviews", InterviewController.showInterviewsForInterviewer);

module.exports = router;
