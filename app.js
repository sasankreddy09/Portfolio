require('dotenv').config();
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const contactSchema = require("./models/contactSchema.js");

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "static"))); 

// Set view engine (Optional: If using template engines like EJS/Pug)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // If using EJS (Optional)

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Atlas Connection Error:", err));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post('/contact', async (req, res, next) => {
    try {
        const { email, description } = req.body;

        if (!email || !description) {
            return res.status(400).render("error", { error: "Email and description are required" });
        }

        const newUser = new contactSchema({ email, description });
        await newUser.save();
        res.redirect("/");
    } catch (error) {
        next(error); // Pass the error to the middleware
    }
});

// ❌ 404 Error Handler (for unknown routes)
app.use((req, res, next) => {
    res.status(404).render("error", { error: "404 - Page Not Found" });
});
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message); // Log error for debugging
    res.status(500).render("error", { 
        error: "500 - Internal Server Error", 
        message: err.message || "Something went wrong" 
    });
});

// ✅ Global Error Handling Middleware (Shows Error Page)
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message); // Log the error for debugging
    res.status(500).render("error", { error: "500 - Internal Server Error", message: err.message });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
