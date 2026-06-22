async function loadMonitors() {
    

    const container =
        document.getElementById("monitorList");

    try {

        const response =
            await fetch("/monitors");

        const result =
            await response.json();

        const monitors =
            result.data || [];

        container.innerHTML = "";

        monitors.forEach(monitor => {

            let statusBadge = "";

        if (monitor.status === "active" && !monitor.paused) {

    statusBadge = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full font-body-sm font-medium">
            <span class="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
            Active
        </span>
    `;

} else if (monitor.paused) {

    statusBadge = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-body-sm font-medium">
            Paused
        </span>
    `;

} else {

    statusBadge = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full font-body-sm font-bold">
            Down
        </span>
    `;

}

          container.innerHTML += `

<div class="bg-surface border border-outline-variant rounded-xl p-lg flex items-center justify-between hover:border-primary/40 transition-colors group">

    <div class="flex items-center gap-lg flex-1">

        <div class="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span class="material-symbols-outlined">devices</span>
        </div>

        <div class="flex flex-col">
            <h3 class="font-headline-sm text-headline-sm text-on-surface">
                ${monitor.id}
            </h3>

            <span class="font-mono-sm text-mono-sm text-on-surface-variant">
                ${monitor.alert_email}
            </span>
        </div>

    </div>

    <div class="flex-1 flex justify-center">
        ${statusBadge}
    </div>

    <div class="flex-[2] flex items-center gap-xl">

        <div class="flex flex-col">
            <span class="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Timeout
            </span>

            <span class="font-mono-md text-mono-md">
                ${monitor.timeout}s
            </span>
        </div>

        <div class="flex flex-col">
            <span class="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Status
            </span>

            <span class="font-mono-md text-mono-md">
                ${monitor.status}
            </span>
        </div>

        <div class="flex flex-col">
            <span class="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase">
                Monitoring
            </span>

            <span class="font-mono-md text-mono-md">
                ${monitor.paused ? "Paused" : "Running"}
            </span>
        </div>

    </div>

    <div class="flex items-center gap-md">

        <button
            onclick="viewMonitor('${monitor.id}')"
            class="bg-surface border border-outline-variant text-secondary px-md py-2 rounded-lg font-body-md hover:bg-surface-container-low transition-colors">

            View Details

        </button>

        <button
            class="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">

            <span class="material-symbols-outlined">
                more_vert
            </span>

        </button>

    </div>

</div>

`;
        });

    } catch (error) {

        console.error(error);

    }
}

function viewMonitor(id) {

    window.location.href =
        `/device?id=${id}`;
}

loadMonitors();

setInterval(loadMonitors, 5000);