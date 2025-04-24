const cars = {
  ferrari: [
    {
      name: "Ferrari F40",
      image: "assets/ferrari_f40.png",
      info: "Manufactured from 1987 to 1992, the F40 was Ferrari's 40th-anniversary model.",
    },
    {
      name: "Ferrari Testarossa",
      image: "assets/ferrari_testarossa.png",
      info: "An iconic 1980s sports car, produced from 1984 to 1996.",
    },
  ],
  mercedes: [
    {
      name: "Mercedes-Benz 190E",
      image: "assets/mercedes_190e.png",
      info: "A compact executive car, produced from 1982 to 1993.",
    },
    {
      name: "Mercedes-Benz SL R129",
      image: "assets/mercedes_r129.jpg",
      info: "A luxurious roadster introduced in 1989.",
    },
  ],
  audi: [
    {
      name: "Audi Quattro",
      image: "assets/audi_quattro.jpg",
      info: "A revolutionary rally car, introduced in 1980.",
    },
    {
      name: "Audi V8",
      image: "assets/audi_v8.jpg",
      info: "A luxury sedan produced from 1988 to 1993.",
    },
  ],
  bmw: [
    {
      name: "BMW M3 E30",
      image: "assets/bmw_m3_e30.jpg",
      info: "A legendary sports car, produced from 1986 to 1991.",
    },
    {
      name: "BMW 850CSi",
      image: "assets/bmw_850csi.jpg",
      info: "A grand tourer introduced in 1992 as part of the BMW 8 Series.",
    },
  ],
  toyota: [
    {
      name: "Toyota Supra MK3",
      image: "assets/toyota_supra_mk3.jpg",
      info: "A classic sports car, produced from 1986 to 1993.",
    },
    {
      name: "Toyota Celica GT-Four",
      image: "assets/toyota_celica_gt4.jpg",
      info: "A rally car produced from 1986 to 1999.",
    },
  ],
};

function openCategory(category) {
  const categoryView = document.getElementById("category-view");
  const icons = document.getElementById("icons");
  const categoryTitle = document.getElementById("category-title");

  categoryTitle.textContent =
    category.charAt(0).toUpperCase() + category.slice(1);
  icons.innerHTML = cars[category]
    .map(
      (car) => `
            <div class="icon" onclick="showCarDetails('${category}', '${car.name}')">
                <img src="assets/car_icon.png" alt="${car.name}">
                <p>${car.name}</p>
            </div>
        `
    )
    .join("");
  categoryView.classList.remove("hidden");
}

function closeCategory() {
  document.getElementById("category-view").classList.add("hidden");
}

function showCarDetails(category, carName) {
  const car = cars[category].find((c) => c.name === carName);
  const carPopup = document.getElementById("car-popup");
  const carDetails = document.getElementById("car-details");

  carDetails.innerHTML = `
        <img src="${car.image}" alt="${car.name}" style="width: 100%">
        <h3>${car.name}</h3>
        <p>${car.info}</p>
    `;
  carPopup.classList.remove("hidden");
}

function closePopup() {
  document.getElementById("car-popup").classList.add("hidden");
}

function showCarDetails(category, carName) {
  const car = cars[category].find((c) => c.name === carName);
  const carPopup = document.getElementById("car-popup");
  const carDetails = document.getElementById("car-details");

  carDetails.innerHTML = `
        <img src="${car.image}" alt="${car.name}">
        <h3>${car.name}</h3>
        <p>${car.info}</p>
        <button class="book-now-button" onclick="showBookingPopup('${car.name}')">Book Now</button>
    `;
  carPopup.classList.remove("hidden");

  if (Math.random() < 0.32) {
    generateRandomAds();
  }
}

function showBookingPopup(carName) {
  const bookingPopup = document.getElementById("booking-popup");
  const bookingForm = document.getElementById("booking-form");

  bookingForm.innerHTML = `
        <h3>Book ${carName}</h3>
        <label for="name">Your Name:</label>
        <input type="text" id="name" placeholder="Enter your name" required>
        
        <label for="email">Your Email:</label>
        <input type="email" id="email" placeholder="Enter your email" required>
        
        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" placeholder="Enter your phone number" required>
        
        <label for="date">Booking Date:</label>
        <input type="date" id="date" required>
        
        <button class="submit-button" onclick="submitBooking('${carName}')">Submit</button>
        <button class="cancel-button" onclick="closeBookingPopup()">Cancel</button>
    `;
  bookingPopup.classList.remove("hidden");
}

function closeBookingPopup() {
  // Hide the booking popup when this function is called
  const bookingPopup = document.getElementById("booking-popup");
  bookingPopup.classList.add("hidden");
}

// Ensure the "X" button calls the correct function to close the popup
document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".title-bar-controls button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const popup = button.closest(".window"); // Find the parent window
      if (popup) {
        popup.classList.add("hidden"); // Hide the popup window
      }
    });
  });

  // Make all windows draggable
  const windows = document.querySelectorAll(".window");
  windows.forEach(makeDraggable);
});

function submitBooking(carName) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;

  if (!name || !email || !phone || !date) {
    alert("Please fill in all the fields.");
    return;
  }

  alert(
    `Thank you, ${name}! Your booking for ${carName} on ${date} has been confirmed.`
  );
  closeBookingPopup();
}

// Ensure the booking popup is draggable
document.addEventListener("DOMContentLoaded", () => {
  makeDraggable(document.getElementById("booking-popup"));
});

function generateRandomAds() {
  const adContainer = document.createElement("div");
  adContainer.id = "ad-container";
  document.body.appendChild(adContainer);

  // Create a single ad window
  const adWindow = document.createElement("div");
  adWindow.className = "ad-window window";

  adWindow.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">Ad</div>
            <div class="title-bar-controls">
                <button onclick="closeAdWindow(this)">x</button>
            </div>
        </div>
        <div class="window-body">
            <p>Special Deal Just for You!</p>
            <a href="https://www.example.com" target="_blank">Learn More</a>
        </div>
    `;

  // Get the window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Set ad window size
  const adWidth = 200; // Width of the ad window
  const adHeight = 150; // Height of the ad window

  // Randomly position the ad on the left or right side of the screen
  const position = Math.random() < 0.5 ? "left" : "right";

  // Calculate the position while ensuring the ad stays inside the screen
  if (position === "left") {
    adWindow.style.left = "5px";
  } else {
    adWindow.style.left = `${windowWidth - adWidth}px`; // Keep it within screen width
  }

  // Set a random vertical position while keeping the ad within the screen
  adWindow.style.top = `${Math.random() * (windowHeight - adHeight)}px`; // Ensure it stays within the screen height

  adContainer.appendChild(adWindow);

  makeDraggable(adWindow);
}

function closeAdWindow(button) {
  const adWindow = button.closest(".ad-window");
  if (adWindow) {
    adWindow.remove();
  }
}

// Function to toggle the Start menu visibility
function toggleStartMenu() {
  const startMenu = document.getElementById("start-menu");
  startMenu.classList.toggle("hidden");
}

// Function to update the taskbar clock every second
function updateClock() {
  const clockElement = document.getElementById("taskbar-clock");
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) hours -= 12;
  }
  if (minutes < 10) minutes = "0" + minutes;

  clockElement.textContent = `${hours}:${minutes} ${period}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();

function openMyComputer() {
  const myComputerWindow = document.getElementById("my-computer-window");
  myComputerWindow.classList.remove("hidden");
  centerWindow(myComputerWindow); // Center the window on the screen
}

function closeWindow(windowId) {
  const windowElement = document.getElementById(windowId);
  windowElement.classList.add("hidden");
}

function centerWindow(windowElement) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const elementWidth = windowElement.offsetWidth;
  const elementHeight = windowElement.offsetHeight;

  windowElement.style.left = `${(windowWidth - elementWidth) / 2}px`;
  windowElement.style.top = `${(windowHeight - elementHeight) / 2}px`;
}

function makeDraggable(element) {
  const titleBar = element.querySelector(".title-bar"); // Title bar for dragging
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  // Mouse down: start dragging
  titleBar.addEventListener("mousedown", (event) => {
    isDragging = true;
    offsetX = event.clientX - element.offsetLeft;
    offsetY = event.clientY - element.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  // Mouse move: update window position
  function onMouseMove(event) {
    if (isDragging) {
      element.style.left = `${event.clientX - offsetX}px`;
      element.style.top = `${event.clientY - offsetY}px`;
    }
  }

  // Mouse up: stop dragging
  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}

// Initialize draggable windows for all windows
document.addEventListener("DOMContentLoaded", () => {
  const windows = document.querySelectorAll(".window"); // Select all windows
  windows.forEach((windowElement) => {
    makeDraggable(windowElement);
  });
});
