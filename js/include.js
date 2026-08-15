// Load shared HTML files (header, footer, etc.)
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-include]").forEach(el => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error("File not found: " + file);
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
            })
            .catch(err => {
                el.innerHTML = "<p style='color:red;'>Include failed: " + file + "</p>";
                console.error(err);
            });
    });
});

// ⭐ Mobile menu toggle (needed for the 3-line button)
function toggleMobileMenu() {
    const nav = document.getElementById("mobileNav");
    nav.classList.toggle("open");
}
