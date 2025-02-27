const User = require("../Models/UserModel");

exports.SignUp = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  User.add(firstName, lastName, email, password, (err, results) => {
    if (err) {
      console.error("Error signing up:", err);
      return res.status(500).send("Error signing up");
    }

    const userId = results.insertId;
    req.session.userId = userId;
    res.redirect("/home");
  });
};
exports.Login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required");
  }

  // Add a User method to get user by email and verify password
  User.getByEmail(email, (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).send("Error logging in");
    }

    if (results.length === 0 || results[0].password !== password) {
      // Invalid credentials
      return res.status(401).send("Invalid email or password");
    }

    // Valid usera
    req.session.userId = results[0].id;
    req.session.userRole = results[0].role; // Store the user role in the session

    if (results[0].role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/home");
    }
  });
};

exports.delete = (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }
  User.delete(userId, (err) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ success: false });
    }
    res.redirect("/home");
  });
};

exports.update = (req, res) => {
  const userId = req.session.userId;
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).send("All fields are required");
  }

  User.update(userId, firstName, lastName, email, (err) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).send("Error updating user");
    }
    res.redirect("/home");
  });
};

exports.getUser = (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required." });
  }
  User.getById(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ success: false });
    }
    res.json(results[0]);
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session during logout:", err);
      req.flash("error_msg", "Failed to logout. Please try again.");
      return res.redirect("/admin"); // Redirect to admin dashboard or appropriate page
    }
    res.clearCookie("connect.sid", { path: "/" }); // Optional: Clear the session cookie

    res.redirect("/login"); // Redirect to login page or homepage
  });
};
