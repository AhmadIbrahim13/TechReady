"use strict";

const express = require("express");
const path = require("path");
const session = require("express-session");
const UserRoutes = require("./Routes/UserRoutes");
const flash = require("connect-flash");
const adminRoutes = require("./Routes/admin");
const fileUpload = require("express-fileupload"); // Import express-fileupload

const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = process.env.PORT || 1337;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: "AhmadIbrahim",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });

  app.use(fileUpload({
    createParentPath: true, // Automatically create directories if they do not exist
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    abortOnLimit: true,
    responseOnLimit: 'File size limit has been reached',
  }));
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

// Default route to serve the main index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views", "index.html"));
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "Views", "about.html"));
  });
  app.get("/cv-generator", (req, res) => {
    res.sendFile(path.join(__dirname, "Views", "cvtool.html"));
  });
  
// Use routes
app.use(UserRoutes);
app.use(adminRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});







