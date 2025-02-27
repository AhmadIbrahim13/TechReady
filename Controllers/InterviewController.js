// controllers/InterviewController.js
const Interview = require("../Models/Interview");

const InterviewController = {
  // Render the interview scheduler page
  showInterviewPage: (req, res) => {
    Interview.getAllInterviewers((err, interviewers) => {
      if (err) {
        console.error("Error fetching interviewers:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("interview-scheduler", { interviewers });
    });
  },

  // Handle form submission to schedule an interview
  scheduleInterview: (req, res) => {
    const interviewData = {
      username: req.body.username,
      email: req.body.email,
      university: req.body.university,
      interviewerId: req.body.interviewerId,
      date: req.body.date,
      time: req.body.time,
      meetingType: req.body.meetingType,
      onlinePlatform: req.body.onlinePlatform,
    };

    Interview.scheduleInterview(interviewData, (err) => {
      if (err) {
        console.error("Error scheduling interview:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/services"); // Redirect to admin interviews list
    });
  },

  // Admin: View all scheduled interviews for a specific interviewer
  showInterviewsForInterviewer: (req, res) => {
    const interviewerId = req.params.id;
    Interview.getInterviewsByInterviewer(interviewerId, (err, results) => {
      if (err) {
        console.error("Error fetching interviews:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("interviewer-interviews", { interviews: results });
    });
  },

  // Admin: Add a new interviewer
  addInterviewer: (req, res) => {
    const interviewerData = {
      name: req.body.name,
      email: req.body.email,
      photo: req.body.photo || null, // Handle optional photo
    };

    Interview.addInterviewer(interviewerData, (err) => {
      if (err) {
        console.error("Error adding interviewer:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/admin/interviewers"); // Redirect to admin interviewers list
    });
  },

  // Admin: View all interviewers and all interviews
  showAllInterviewers: (req, res) => {
    Interview.getAllInterviewers((err, interviewers) => {
      if (err) {
        console.error("Error fetching interviewers:", err);
        return res.status(500).send("Internal Server Error");
      }
      Interview.getAllInterviews((err, interviews) => {
        if (err) {
          console.error("Error fetching interviews:", err);
          return res.status(500).send("Internal Server Error");
        }
        res.render("admin-interviews", { interviewers, interviews });
      });
    });
  },
  editInterviewerForm: (req, res) => {
    const interviewerId = req.params.id;

    Interview.getInterviewerById(interviewerId, (err, interviewer) => {
        if (err) {
            console.error("Error fetching interviewer:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (!interviewer) {
            return res.status(404).send("Interviewer not found");
        }

        res.render("edit-interviewer", { interviewer }); // Pass the data to EJS
    });
},

  // Edit an interviewer
  editInterviewer: (req, res) => {
    const interviewerId = req.params.id;
    const updatedData = {
        name: req.body.name,
        email: req.body.email,
        photo: req.file ? `/uploads/${req.file.filename}` : req.body.currentPhoto,
    };

    Interview.updateInterviewer(interviewerId, updatedData, (err) => {
        if (err) {
            console.error("Error updating interviewer:", err);
            return res.status(500).send("Internal Server Error");
        }

        res.redirect("/admin/interviewers");
    });
},


  // Delete an interviewer
  deleteInterviewer: (req, res) => {
    const interviewerId = req.params.id;

    Interview.deleteInterviewer(interviewerId, (err) => {
      if (err) {
        console.error("Error deleting interviewer:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.redirect("/admin/interviewers");
    });
  }
};

module.exports = InterviewController;
