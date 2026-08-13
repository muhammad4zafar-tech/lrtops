document.addEventListener("DOMContentLoaded", () => {
    const includes = document.querySelectorAll("[data-include]");

    includes.forEach(el => {
        let file = el.getAttribute("data-include");

        // Detect local file mode (file://)
        const isLocal = window.location.protocol === "file:";

        // If local, remove leading slash
        if (isLocal && file.startsWith("/")) {
            file = file.substring(1);
        }

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Include file not found: " + file);
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => {
                el.innerHTML = "<!-- Include failed: " + file + " -->";
            });
    });

    // Last updated timestamp
    const updated = document.getElementById("lastUpdated");
    if (updated) {
        const date = new Date(document.lastModified);
        updated.textContent = "Last Updated: " + date.toLocaleString();
    }
});

// Mobile menu
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("open");
}

// Dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
