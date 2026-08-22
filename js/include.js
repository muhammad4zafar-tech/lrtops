// ⭐ Load HTML includes (header, footer)
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-include]").forEach(el => {
        const file = el.getAttribute("data-include");

        // ⭐ FIXED: Force root path so GitHub Pages + custom domain works
        fetch("/" + file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                attachHeaderFunctions();
            })
            .catch(err => console.error("Include failed:", file, err));
    });

    loadTTCStatus();
    setInterval(loadTTCStatus, 60000); // Auto refresh every 60 sec
});


// ⭐ Attach header buttons
function attachHeaderFunctions() {
    const menuBtn = document.querySelector(".menu-toggle");
    if (menuBtn) menuBtn.onclick = toggleMobileMenu;

    const darkBtn = document.querySelector(".dark-toggle");
    if (darkBtn) darkBtn.onclick = toggleDarkMode;
}

function toggleMobileMenu() {
    const nav = document.getElementById("mobileNav");
    nav.classList.toggle("open");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}


// ⭐ TTC LIVE STATUS
function loadTTCStatus() {
    fetch("https://www.ttc.ca/api/ServiceStatus/Subway", { method: "GET", mode: "cors" })
        .then(res => res.json())
        .then(data => {
            const linesDiv = document.getElementById("ttc-lines");
            const banner = document.getElementById("ttc-banner");
            const timestamp = document.getElementById("ttc-timestamp");

            linesDiv.innerHTML = "";

            let allNormal = true;

            data.forEach(line => {
                const div = document.createElement("div");
                div.className = "ttc-line";

                const circle = document.createElement("div");
                circle.className = "ttc-line-number";
                circle.style.backgroundColor = line.LineColour;
                circle.textContent = line.LineNumber;

                const status = document.createElement("div");
                status.textContent = line.Status;

                if (line.Status === "Normal Service") {
                    status.className = "ttc-status-normal";
                } else {
                    status.className = "ttc-status-delay";
                    allNormal = false;
                }

                div.appendChild(circle);
                div.appendChild(status);
                linesDiv.appendChild(div);
            });

            // Banner
            if (allNormal) {
                banner.style.backgroundColor = "green";
                banner.style.color = "white";
                banner.textContent = "All lines operating normally";
            } else {
                banner.style.backgroundColor = "#CC0000";
                banner.style.color = "white";
                banner.textContent = "Service alerts present";
            }

            // Timestamp
            const now = new Date();
            timestamp.textContent = "Last updated: " + now.toLocaleTimeString();
        })
        .catch(err => console.error("TTC status load failed:", err));
}


// ⭐ Holiday Expandable Toggle
function toggleHoliday(id) {
    const box = document.getElementById(id);
    box.style.display = (box.style.display === "none" || box.style.display === "")
        ? "block"
        : "none";
}
