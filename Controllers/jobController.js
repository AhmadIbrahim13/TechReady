// controllers/jobController.js
const Job = require("../Models/Job");

const jobController = {
  // Display all jobs
  showAllJobs: (req, res) => {
    const userRole = req.session.userRole || "user"; // Assuming role is stored in session

    Job.getAll((err, jobs) => {
      if (err) {
        console.error("Error fetching jobs:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Check user role and render the appropriate page
      if (userRole === "admin") {
        res.render("jobs", { jobs });
      } else {
        res.render("UserJobs", { jobs });
      }
    });
  },

  // Show create job form
  showCreateJobForm: (req, res) => {
    res.render("create-job");
  },

  // Handle create job
  createJob: (req, res) => {
    const { title, company, location, description, salary } = req.body;
    Job.create(
      { title, company, location, description, salary },
      (err, insertId) => {
        if (err) {
          console.error("Error creating job:", err);

          return res.redirect("/admin/jobs/create-job");
        }

        res.redirect("/admin/jobs");
      }
    );
  },

  // Show edit job form
  showEditJobForm: (req, res) => {
    const { id } = req.params;
    Job.getById(id, (err, job) => {
      if (err) {
        console.error("Error fetching job:", err);

        return res.redirect("/admin/jobs");
      }
      if (!job) {
        return res.redirect("/admin/jobs");
      }
      res.render("edit-job", { job });
    });
  },

  // Handle edit job
  editJob: (req, res) => {
    const { id } = req.params;
    const { title, company, location, description, salary } = req.body;
    Job.update(
      id,
      { title, company, location, description, salary },
      (err, affectedRows) => {
        if (err) {
          console.error("Error updating job:", err);

          return res.redirect(`/admin/jobs/edit-job/${id}`);
        }
        if (affectedRows === 0) {
        } else {
        }
        res.redirect("/admin/jobs");
      }
    );
  },

  // Handle delete job
  deleteJob: (req, res) => {
    const { id } = req.params;
    Job.delete(id, (err, affectedRows) => {
      if (err) {
        console.error("Error deleting job:", err);

        return res.redirect("/admin/jobs");
      }
      if (affectedRows === 0) {
      } else {
      }
      res.redirect("/admin/jobs");
    });
  },

  // View job details
  viewJobDetails: (req, res) => {
    const { id } = req.params;
    Job.getById(id, (err, job) => {
      if (err) {
        console.error("Error fetching job details:", err);

        return res.redirect("/admin/jobs");
      }
      if (!job) {
        return res.redirect("/admin/jobs");
      }
      res.render("job-details", { job });
    });
  },
};

module.exports = jobController;
