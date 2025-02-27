const db = require("../DatabaseConnection");

const RoadmapStep = {
  getByRoadmapId(roadmapId, callback) {
    const sql =
      "SELECT * FROM roadmap_steps WHERE roadmap_id = ? ORDER BY step_order ASC";
    db.query(sql, [roadmapId], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  createMultiple(roadmapId, steps, callback) {
    if (!steps || steps.length === 0) return callback(null, []);

    const values = steps.map((s) => [
      roadmapId,
      s.step_title,
      s.step_description || "",
      s.step_order,
    ]);
    const sql =
      "INSERT INTO roadmap_steps (roadmap_id, step_title, step_description, step_order) VALUES ?";

    db.query(sql, [values], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  deleteByRoadmapId(roadmapId, callback) {
    const sql = "DELETE FROM roadmap_steps WHERE roadmap_id = ?";
    db.query(sql, [roadmapId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },
};

module.exports = RoadmapStep;
