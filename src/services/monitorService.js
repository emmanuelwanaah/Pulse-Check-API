const monitors = new Map();

function triggerAlert(id) {

    const monitor = monitors.get(id);

    if (!monitor) return;

    monitor.status = "down";

    monitor.activityLog.unshift({
        event: "Device Down",
        time: new Date().toISOString()
    });

    console.log({
        ALERT: `Device ${id} is down!`,
        time: new Date().toISOString()
    });
}

function startTimer(id) {

    const monitor = monitors.get(id);

    if (!monitor) return;

    monitor.timer = setTimeout(() => {
        triggerAlert(id);
    }, monitor.timeout * 1000);
}

function registerMonitor(data) {

    const {
        id,
        timeout,
        alert_email
    } = data;

    if (!id || !timeout || !alert_email) {
        throw new Error(
            "id, timeout and alert_email are required"
        );
    }

    if (monitors.has(id)) {
        throw new Error(
            "Monitor already exists"
        );
    }

    const monitor = {
        id,
        timeout,
        alert_email,

        status: "active",
        paused: false,

        createdAt: new Date(),
        lastHeartbeat: new Date(),

        activityLog: [
            {
                event: "Monitor Registered",
                time: new Date().toISOString()
            }
        ],

        timer: null
    };

    monitors.set(id, monitor);

    startTimer(id);

    return monitor;
}

function resetTimer(id) {

    const monitor = monitors.get(id);

    if (!monitor) {
        throw new Error(
            "Monitor not found"
        );
    }

    console.log(
        `Heartbeat received for ${id}`
    );

    if (monitor.timer) {
        clearTimeout(
            monitor.timer
        );
    }

    monitor.status = "active";
    monitor.paused = false;

    monitor.lastHeartbeat =
        new Date();

    monitor.activityLog.unshift({
        event: "Heartbeat Received",
        time: new Date().toISOString()
    });

    startTimer(id);

    return monitor;
}

function pauseMonitor(id) {

    const monitor = monitors.get(id);

    if (!monitor) {
        throw new Error(
            "Monitor not found"
        );
    }

    if (monitor.timer) {
        clearTimeout(
            monitor.timer
        );
    }

    monitor.paused = true;

    monitor.activityLog.unshift({
        event: "Monitoring Paused",
        time: new Date().toISOString()
    });

    return monitor;
}

function getMonitor(id) {

    const monitor = monitors.get(id);

    if (!monitor) {
        throw new Error(
            "Monitor not found"
        );
    }

    return monitor;
}

function getAllMonitors() {

    return Array
        .from(monitors.values())
        .map((monitor) => ({

            id: monitor.id,

            timeout:
                monitor.timeout,

            alert_email:
                monitor.alert_email,

            status:
                monitor.status,

            paused:
                monitor.paused,

            createdAt:
                monitor.createdAt,

            lastHeartbeat:
                monitor.lastHeartbeat

        }));
}

module.exports = {

    registerMonitor,

    resetTimer,

    pauseMonitor,

    getMonitor,

    getAllMonitors,

    monitors

};