
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

/* Daily Café Specials */
const dailySpecials = {
    0: { name: "Slow Sunday ♡", item: "Butter Croissant", price: "₹159" },
    1: { name: "Pink Monday ♡", item: "Pink Vanilla Latte", price: "₹189" },
    2: { name: "Treat Tuesday ♡", item: "Chocolate Brownie", price: "₹189" },
    3: { name: "Waffle Wednesday ♡", item: "Nutella Waffles", price: "₹269" },
    4: { name: "Thirsty Thursday ♡", item: "Iced Caramel Coffee", price: "₹199" },
    5: { name: "Sweet Friday ♡", item: "Strawberry Shortcake", price: "₹259" },
    6: { name: "Pancake Saturday ♡", item: "Strawberry Pancakes", price: "₹249" }
};

const dayButtons = document.querySelectorAll(".special-days button");
const specialName = document.getElementById("special-name");
const specialItem = document.getElementById("special-item");
const specialPrice = document.getElementById("special-price");

function showDailySpecial(day) {
    if (!specialName || !specialItem || !specialPrice) return;

    const special = dailySpecials[day];

    specialName.textContent = special.name;
    specialItem.textContent = special.item;
    specialPrice.textContent = special.price;

    dayButtons.forEach(button => {
        button.classList.toggle(
            "active",
            Number(button.dataset.day) === day
        );
    });
}

if (specialName) {
    showDailySpecial(new Date().getDay());

    dayButtons.forEach(button => {
        button.addEventListener("click", () => {
            showDailySpecial(Number(button.dataset.day));
        });
    });
}
// Back to Top Button
const backToTopButton = document.createElement("button");

backToTopButton.textContent = "↑";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.title = "Back to Top";
backToTopButton.className = "back-to-top";

document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  backToTopButton.style.display =
    window.scrollY > 300 ? "block" : "none";
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Menu Search Feature
const menuSearch = document.getElementById("menuSearch");
const menuTable = document.querySelector(".cafe-menu");

if (menuSearch && menuTable) {
  const menuRows = Array.from(
    menuTable.querySelectorAll("tbody tr")
  );

  // Remember the category for each food item
  let currentCategory = "";

  const items = menuRows
    .filter(row => row.cells.length >= 2)
    .map(row => {
      const categoryCell = row.querySelector("td[rowspan]");

      if (categoryCell) {
        currentCategory = categoryCell.textContent.trim();
      }

      return {
        row,
        category: currentCategory,
        foodName: categoryCell
          ? row.cells[1].textContent.trim()
          : row.cells[0].textContent.trim(),
        categoryCell
      };
    });

  menuSearch.addEventListener("input", () => {
    const searchText = menuSearch.value.toLowerCase().trim();

    items.forEach(item => {
      const matches = item.foodName
        .toLowerCase()
        .includes(searchText);

      item.row.style.display = matches ? "" : "none";
    });

    // Keep category labels aligned with visible food items
    const categories = [...new Set(items.map(item => item.category))];

    categories.forEach(category => {
      const group = items.filter(item => item.category === category);
      const visible = group.filter(item => item.row.style.display !== "none");

      const originalCell = group[0].categoryCell;

      if (!originalCell) return;

      // Restore the category cell to its original row
      group[0].row.insertBefore(originalCell, group[0].row.firstChild);

      originalCell.rowSpan = group.length;

      if (visible.length > 0) {
        visible[0].row.insertBefore(
          originalCell,
          visible[0].row.firstChild
        );
        originalCell.rowSpan = visible.length;
      }
    });
  });
}