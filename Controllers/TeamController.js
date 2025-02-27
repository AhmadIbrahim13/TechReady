const User = require("../Models/UserModel");

const TeamController = {
  showAdmins: (req, res) => {
    User.getAllAdmins((err, admins) => {
      if (err) {
        console.error("Error fetching admins:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.render("Team", { admins }); // Pass the fetched admins to the team.ejs file
    });
  },
};

module.exports = TeamController;
