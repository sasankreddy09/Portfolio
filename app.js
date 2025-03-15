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

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Atlas Connection Error:", err));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post('/contact', async (req, res) => {
    try {
        const { email, description } = req.body;

        if (!email || !description) {
            return res.status(400).json({ error: 'Email and description are required' });
        }

        const newUser = new contactSchema({ email, description });
        await newUser.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
