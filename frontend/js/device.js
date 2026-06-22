const params =
    new URLSearchParams(
        window.location.search
    );

const deviceId =
    params.get("id");

let countdownInterval;

async function loadDevice() {

    try {

        const response =
            await fetch(
                `/monitors/${deviceId}`
            );

        const result =
            await response.json();

        if (!result.success) {
            throw new Error(
                result.message
            );
        }

        const monitor =
            result.data;

        console.log(monitor);

        // Hero Section
        document.getElementById(
            "deviceName"
        ).textContent =
            monitor.id;

        document.getElementById(
            "breadcrumbDevice"
        ).textContent =
            monitor.id;

        // Device Information
        document.getElementById(
            "deviceId"
        ).textContent =
            monitor.id;

        document.getElementById(
            "deviceEmail"
        ).textContent =
            monitor.alert_email;

        document.getElementById(
            "deviceTimeout"
        ).textContent =
            `${monitor.timeout} seconds`;


            document.getElementById(
    "currentStatus"
).textContent =
    monitor.paused
        ? "Paused"
        : monitor.status;
        const created =
            document.getElementById(
                "deviceCreated"
            );

        if (created) {

            created.textContent =
                monitor.createdAt
                ? new Date(
                    monitor.createdAt
                ).toLocaleDateString()
                : "Not Available";

        }

        // Countdown Timer
        const countdownEl =
            document.getElementById(
                "remainingTime"
            );

        if (countdownEl) {

            clearInterval(
                countdownInterval
            );

            if (
                monitor.paused
            ) {

                countdownEl.textContent =
                    "Paused";

            }
            else if (
                monitor.status ===
                "down"
            ) {

                countdownEl.textContent =
                    "0 seconds";

            }
            else {

                let remaining =
                    monitor.remainingTime ??
                    monitor.timeout;

                countdownEl.textContent =
                    `${remaining} seconds`;

                countdownInterval =
                    setInterval(() => {

                        if (
                            remaining <= 0
                        ) {

                            clearInterval(
                                countdownInterval
                            );

                            countdownEl.textContent =
                                "0 seconds";

                            loadDevice();

                            return;
                        }

                        remaining--;

                        countdownEl.textContent =
                            `${remaining} seconds`;

                    }, 1000);

            }

        }

        // Status Badge
        const badge =
            document.getElementById(
                "deviceStatusBadge"
            );

        const text =
            document.getElementById(
                "deviceStatusText"
            );

        const dot =
            document.getElementById(
                "deviceStatusDot"
            );

        if (
            monitor.status === "down"
        ) {

            text.textContent =
                "Down";

            badge.className =
                "inline-flex items-center gap-1 bg-red-50 text-red-700 px-sm py-0.5 rounded-full border border-red-100 font-mono-label text-mono-label uppercase tracking-wider";

            dot.className =
                "w-2 h-2 rounded-full bg-red-500";

        }
        else if (
            monitor.paused
        ) {

            text.textContent =
                "Paused";

            badge.className =
                "inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-sm py-0.5 rounded-full border border-yellow-100 font-mono-label text-mono-label uppercase tracking-wider";

            dot.className =
                "w-2 h-2 rounded-full bg-yellow-500";

        }
        else {

            text.textContent =
                "Active";

            badge.className =
                "inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-sm py-0.5 rounded-full border border-emerald-100 font-mono-label text-mono-label uppercase tracking-wider";

            dot.className =
                "w-2 h-2 rounded-full bg-emerald-500 animate-pulse";

        }

        // Activity Timeline
        const timeline =
            document.getElementById(
                "activityTimeline"
            );

        if (
            timeline &&
            monitor.activityLog
        ) {

            timeline.innerHTML = "";

            monitor.activityLog
                .slice()
                .reverse()
                .forEach(log => {

                    let iconClass =
                        "bg-primary";

                    let titleClass =
                        "text-on-surface";

                    let description =
                        "";

                    if (
                        log.event ===
                        "Device Down"
                    ) {

                        iconClass =
                            "bg-error";

                        titleClass =
                            "text-error";

                        description =
                            "Critical connectivity interruption detected.";

                    }
                    else if (
                        log.event ===
                        "Monitoring Paused"
                    ) {

                        iconClass =
                            "bg-surface-container-highest border border-outline";

                        description =
                            "Monitoring temporarily disabled.";

                    }
                    else if (
                        log.event ===
                        "Heartbeat Received"
                    ) {

                        description =
                            "Heartbeat successfully received.";

                    }
                    else if (
                        log.event ===
                        "Monitor Registered"
                    ) {

                        iconClass =
                            "bg-primary-fixed-dim";

                        description =
                            "Initial monitor provisioning completed.";

                    }

                    timeline.innerHTML += `

<div class="timeline-item timeline-line relative pb-lg flex gap-md">

    <div class="z-10 ${iconClass} w-4 h-4 rounded-full mt-1.5">
    </div>

    <div class="flex-1">

        <div class="flex justify-between items-start">

            <span class="font-body-md text-body-md font-semibold ${titleClass}">
                ${log.event}
            </span>

            <span class="font-mono-label text-mono-label text-on-surface-variant">
                ${new Date(log.time).toLocaleString()}
            </span>

        </div>

        <p class="font-body-sm text-body-sm text-on-surface-variant">
            ${description}
        </p>

    </div>

</div>
`;
                });

        }

    } catch (error) {

        console.error(
            "Failed to load monitor",
            error
        );

    }
}

window.addEventListener(
    "DOMContentLoaded",
    () => {

        loadDevice();

        document
        .getElementById("heartbeatBtn")
        ?.addEventListener(
            "click",
            async () => {

                await fetch(
                    `/monitors/${deviceId}/heartbeat`,
                    {
                        method: "POST"
                    }
                );

                loadDevice();
            }
        );

        document
        .getElementById("pauseBtn")
        ?.addEventListener(
            "click",
            async () => {

                await fetch(
                    `/monitors/${deviceId}/pause`,
                    {
                        method: "POST"
                    }
                );

                loadDevice();
            }
        );

        document
        .getElementById("resumeBtn")
        ?.addEventListener(
            "click",
            async () => {

                await fetch(
                    `/monitors/${deviceId}/heartbeat`,
                    {
                        method: "POST"
                    }
                );

                loadDevice();
            }
            
        );

    }
    
);

