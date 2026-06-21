require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const monitorRoutes = require("./src/routes/monitorRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/monitors", monitorRoutes);
app.use(express.static(path.join(__dirname, "frontend")));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Pulse Check API Running",
        version: "1.0.0",
        timestamp: new Date().toISOString()
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});