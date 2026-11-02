
// Open gallery images in a larger view
document.querySelectorAll(".gallery-grid img").forEach(function (image) {
    image.style.cursor = "pointer";

    image.addEventListener("click", function () {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";

        const largeImage = document.createElement("img");
        largeImage.src = image.src;
        largeImage.alt = image.alt;

        lightbox.appendChild(largeImage);
        document.body.appendChild(lightbox);

        // Click anywhere outside the photo to close
        lightbox.addEventListener("click", function () {
            lightbox.remove();
        });
    });
});

/* Booking form confirmation */

const bookingForm = document.getElementById("booking-form");
const bookingMessage = document.getElementById("booking-message");

if (bookingForm && bookingMessage) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const guestName = document.getElementById("guest-name").value;

        bookingMessage.textContent =
            "♡ Thank you, " + guestName +
            "! Your table request has been received. See you soon!";

        bookingMessage.style.color = "#a35d73";
        bookingMessage.style.fontWeight = "bold";

        bookingForm.reset();
    });
}


/* Light and Dark Mode Toggle */

const themeButton = document.getElementById("theme-toggle");

// Apply saved theme when the page loads
const savedTheme = localStorage.getItem("cafeTheme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
}

if (themeButton) {

    function updateThemeButton() {
        const isDark = document.body.classList.contains("dark-mode");

        themeButton.textContent = isDark
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
    }

    updateThemeButton();

    themeButton.addEventListener("click", function () {

        const isDark = document.body.classList.toggle("dark-mode");

        // Keep HTML and BODY in the same theme
        document.documentElement.classList.toggle("dark-mode", isDark);

        // Remember the selected theme
        localStorage.setItem("cafeTheme", isDark ? "dark" : "light");

        updateThemeButton();
    });
}