const Feedback = require("../Models/Feedback");

const feedbackController = {
  // Add new feedback
  addFeedback: (req, res) => {
    const { studentName, feedback, rating } = req.body;

    if (!studentName || !feedback || !rating) {
      return res.status(400).json({ error: "All fields are required." });
    }

    Feedback.addFeedback(studentName, feedback, rating, (err) => {
      if (err) {
        console.error("Error adding feedback:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json({ message: "Feedback submitted successfully." });
    });
  },

  // Get all feedback for admin
  getAllFeedback: (req, res) => {
    Feedback.getAllFeedback((err, results) => {
      if (err) {
        console.error("Error fetching feedback:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("feedbackAdmin", { feedbacks: results });
    });
  }
};

module.exports = feedbackController;
