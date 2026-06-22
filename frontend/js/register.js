document
.getElementById("monitorForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id =
        document.getElementById("device-id").value.trim();

    const timeout =
        document.getElementById("timeout").value;

    const alert_email =
        document.getElementById("alert-email").value.trim();

    const message =
        document.getElementById("message");

    message.innerHTML = "Creating monitor...";
    message.style.color = "#2563eb";

    try {

        const response = await fetch("/monitors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                timeout: Number(timeout),
                alert_email
            })
        });

        const result =
            await response.json();

        if (result.success) {

            message.innerHTML =
                "✅ Monitor created successfully";

            message.style.color =
                "green";

            setTimeout(() => {

                window.location.href =
                    `/device?id=${id}`;

            }, 1000);

        } else {

            message.innerHTML =
                "❌ " + result.message;

            message.style.color =
                "red";
        }

    } catch (error) {

        console.error(error);

        message.innerHTML =
            "❌ Server error";

        message.style.color =
            "red";
    }

});