const {
    registerMonitor,
    resetTimer,
    pauseMonitor,
    getMonitor,
    getAllMonitors
} = require("../services/monitorService");

exports.createMonitor = (req, res) => {
    try {
        const monitor = registerMonitor(req.body);

        res.status(201).json({
            success: true,
            message: "Monitor created successfully",
            data: {
                id: monitor.id,
                timeout: monitor.timeout,
                alert_email: monitor.alert_email,
                status: monitor.status
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.sendHeartbeat = (req, res) => {
    try {
        const monitor = resetTimer(req.params.id);

        res.status(200).json({
            success: true,
            message: "Heartbeat received",
            data: {
                id: monitor.id,
                status: monitor.status
            }
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.pauseMonitoring = (req, res) => {
    try {
        const monitor = pauseMonitor(req.params.id);

        res.status(200).json({
            success: true,
            message: "Monitor paused successfully",
            data: {
                id: monitor.id,
                paused: monitor.paused
            }
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.getSingleMonitor = (req, res) => {
    try {
        const monitor = getMonitor(req.params.id);

        res.status(200).json({
            success: true,
            data: {
                id: monitor.id,
                timeout: monitor.timeout,
                alert_email: monitor.alert_email,
                status: monitor.status,
                paused: monitor.paused
            }
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

exports.getMonitors = (req, res) => {
    try {
        const monitors = getAllMonitors();

        res.status(200).json({
            success: true,
            count: monitors.length,
            data: monitors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



