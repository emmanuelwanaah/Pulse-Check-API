const express = require("express");

const router = express.Router();

const {
    createMonitor,
    sendHeartbeat,
    pauseMonitoring,
    getSingleMonitor,
    getMonitors
} = require("../controllers/monitorController");

router.post("/", createMonitor);

router.post("/:id/heartbeat", sendHeartbeat);

router.post("/:id/pause", pauseMonitoring);

router.get("/", getMonitors);

router.get("/:id", getSingleMonitor);

module.exports = router;