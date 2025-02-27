// UserRoutes.js
const express = require("express");
const { isAuthenticated } = require("../Middlewares/authMiddleware");
const UserController = require("../Controllers/UserController");
const Course = require("../Models/Course"); // Import Course model
const courseController=require("../Controllers/courseController");
const path = require("path");
const roadmapController=require("../Controllers/roadmapController");
const router = express.Router();
const jobController=require("../Controllers/jobController");
const userJobController=require("../Controllers/userJobController");
const feedbackController=require("../Controllers/feedbackController");
const InterviewController = require("../Controllers/InterviewController");
const TeamController = require("../Controllers/TeamController");

// Serve the login page
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "login.html"));
});

// Handle login form submissions
router.post("/login", UserController.Login);
router.get("/logout", UserController.logout);

// Serve the signup page
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "signup.html"));
});
router.post("/signup", UserController.SignUp);

// User actions
router.post("/delete", UserController.delete);
router.post("/update", UserController.update);
router.get("/user", isAuthenticated, UserController.getUser);

// Serve the home page
router.get("/home", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "home.html"));
});

// Serve the services page
router.get("/services", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "services.html"));
});

router.get("/courses", isAuthenticated, courseController.getAllUserCourses);
router.post("/enroll", isAuthenticated, courseController.enrollCourse);
router.post("/drop", isAuthenticated, courseController.dropCourse);
router.get("/enrolled-courses", isAuthenticated, courseController.getEnrolledCoursesPage);

router.get("/roadmaps",isAuthenticated, roadmapController.showPublicRoadmaps);
router.get("/roadmaps/:id", isAuthenticated, roadmapController.viewRoadmapSteps);

router.get("/jobs", jobController.showAllJobs);


router.post("/apply/:jobId",isAuthenticated,userJobController.uploadCV,userJobController.applyForJobs);
router.get("/my-applications",isAuthenticated,userJobController.getUserApplications); 
router.get("/feedback", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "feedback.html"));
});
router.post("/submit-feedback", isAuthenticated, feedbackController.addFeedback);




// Render the interview scheduler page
router.get("/schedule-interview", InterviewController.showInterviewPage);

// Handle interview form submission
router.post("/schedule-interview", InterviewController.scheduleInterview);


router.get("/team", TeamController.showAdmins);

router.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('Internal Server Error');
    }
    // Redirect to the login page after logging out
    res.redirect('/login');
  });
});

module.exports = router;
