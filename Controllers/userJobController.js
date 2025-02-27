const UserJob = require("../Models/userjobs");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Checking upload path...");
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) {
            console.log("Creating upload path...");
            fs.mkdirSync(uploadPath); // Creates the folder if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

const userJobController = {
    // Middleware to handle CV upload
    uploadCV: (req, res, next) => {
        upload.single("cv")(req, res, (err) => {
            if (err) {
                console.error("File upload error:", err);
                return res
                    .status(500)
                    .send(
                        "File upload failed. Ensure file size and format are correct."
                    );
            }
            next();
        });
    },
    // Apply for a job
    applyForJobs: (req, res) => {
        console.log("File:", req.file); // Should log uploaded file details
        console.log("Body:", req.body); // Should log other form fields (if any)
    
        const userId = req.session.userId;
        const { jobId } = req.params;
    
        if (!userId) {
            return res.status(401).send("User not authenticated");
        }
    
        console.log(req.file);
        if (!req.file) {
            console.error("No file uploaded");
            return res.status(400).send("Please upload a CV.");
        }
        
    
        const cvFile = req.file.filename;
    
        UserJob.apply(userId, jobId, cvFile, (err, insertId) => {
            if (err) {
                console.error("Error applying for job:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.redirect("/my-applications");
        });
    },
    

    // View user applications
    getUserApplications: (req, res) => {
        const userId = req.session.userId; // Directly get userId from the session

        if (!userId) {
            return res.status(401).send("User not authenticated");
        }

        UserJob.getUserApplications(userId, (err, applications) => {
            if (err) {
                console.error("Error fetching applications:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.render("my-applications", { applications });
        });
    },
};

module.exports = userJobController;
