const Roadmap = require("../Models/Roadmap");
const RoadmapStep = require("../Models/RoadmapStep");

exports.showAllRoadmaps = (req, res) => {
  Roadmap.getAll((err, roadmaps) => {
    if (err) {
      console.error("Error fetching roadmaps:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("roadmaps", { roadmaps });
  });
};

exports.showCreateRoadmapForm = (req, res) => {
  res.render("create-roadmap");
};

exports.createRoadmap = (req, res) => {
  const { title, description } = req.body;
  const stepsData = req.body.steps;

  Roadmap.create({ title, description }, (err, roadmapId) => {
    if (err) {
      console.error("Error creating roadmap:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Steps is an object of objects like {0: {step_title, step_description, step_order}, 1: {...}}
    const stepsArray = Object.values(stepsData);
    RoadmapStep.createMultiple(roadmapId, stepsArray, (err2) => {
      if (err2) {
        console.error("Error creating steps:", err2);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/admin/roadmaps");
    });
  });
};

exports.showEditRoadmapForm = (req, res) => {
  const id = req.params.id;
  Roadmap.getById(id, (err, roadmap) => {
    if (err) {
      console.error("Error fetching roadmap:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (!roadmap) {
      return res.status(404).send("Roadmap not found");
    }

    RoadmapStep.getByRoadmapId(id, (err2, steps) => {
      if (err2) {
        console.error("Error fetching steps:", err2);
        return res.status(500).send("Internal Server Error");
      }
      res.render("edit-roadmap", { roadmap, steps });
    });
  });
};

exports.editRoadmap = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const stepsData = req.body.steps;

  Roadmap.update(id, { title, description }, (err) => {
    if (err) {
      console.error("Error updating roadmap:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Delete existing steps and re-insert
    RoadmapStep.deleteByRoadmapId(id, (err2) => {
      if (err2) {
        console.error("Error deleting old steps:", err2);
        return res.status(500).send("Internal Server Error");
      }

      const stepsArray = stepsData ? Object.values(stepsData) : [];
      RoadmapStep.createMultiple(id, stepsArray, (err3) => {
        if (err3) {
          console.error("Error creating steps:", err3);
          return res.status(500).send("Internal Server Error");
        }
        res.redirect("/admin/roadmaps");
      });
    });
  });
};

exports.deleteRoadmap = (req, res) => {
  const id = req.params.id;
  Roadmap.delete(id, (err) => {
    if (err) {
      console.error("Error deleting roadmap:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/admin/roadmaps");
  });
};
exports.showPublicRoadmaps = (req, res) => {
  Roadmap.getAll((err, roadmaps) => {
    if (err) {
      console.error("Error fetching roadmaps:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Render 'timeline.ejs' and pass roadmaps
    res.render("timeline", { roadmaps });
  });
},
exports.viewRoadmapSteps = (req, res) => {
  const id = req.params.id;

  // Check if user is admin
  const isAdmin = req.session && req.session.userRole === "admin";

  Roadmap.getById(id, (err, roadmap) => {
    if (err) {
      console.error("Error fetching roadmap:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (!roadmap) {
      return res.status(404).send("Roadmap not found");
    }

    RoadmapStep.getByRoadmapId(id, (err2, steps) => {
      if (err2) {
        console.error("Error fetching steps:", err2);
        return res.status(500).send("Internal Server Error");
      }

      // If user is admin, render 'roadmap-steps.ejs', else render 'pathml.ejs'
      if (isAdmin) {
        res.render("roadmap-steps", { roadmap, steps });
      } else {
        res.render("pathml", { roadmap, steps });
      }
    });
  });
};

