const User = require("../Models/UserModel"); // Assuming you have this model with appropriate methods

exports.showAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("admin", { users: results });
  });
};

exports.showCreateForm = (req, res) => {
  res.render("admin_create", {}); // create a separate view for creating
};

exports.createUser = (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  // Basic validation
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).send("All fields are required");
  }

  // Ideally, hash the password here before saving
  User.create({ firstName, lastName, email, password, role }, (err, result) => {
    if (err) {
      console.error("Error creating user:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/admin");
  });
};

exports.showEditForm = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (!result) {
      return res.status(404).send("User not found");
    }
    res.render("admin_edit", { user: result });
  });
};

exports.editUser = (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, role } = req.body;

  // If you allow password edits, handle that similarly
  const updateData = { firstName, lastName, email, role };

  User.update(userId, updateData, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/admin");
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.delete(userId, (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/admin");
  });
};
