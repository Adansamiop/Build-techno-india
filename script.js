// Function to initialize the page and load components on DOM load
window.onload = function() {
    showPage('home'); // Show the home page initially
    loadGallery();    // Load images for the project gallery

    // Show only the discount popup on page load
    document.getElementById("discountPopup").style.display = "flex";

    // Check login status without triggering any modals
    checkLoginStatus();
};

// Check login status and display appropriate menu options
function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        showLoggedInMenu(loggedInUser); // Show "My Account" if logged in
    } else {
        document.getElementById("menuNotLoggedIn").style.display = "block"; // Show login/signup menu
    }
}
// WhatsApp redirection function
function openWhatsApp() {
    const phoneNumber = "7905997991"; // Replace with your actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}`, "_blank"); // Use backticks for template literals
}

// Phone call function
function makeCall() {
    const phoneNumber = "+917905997991"; // Replace with your actual phone number
    window.location.href = `tel:${phoneNumber}`; // Use backticks for template literals
}

// Show the signup form when "Sign Up" button is clicked in the discount popup
function showSignup() {
    document.getElementById("signupForm").style.display = "flex";
    closeModal('discountPopup'); // Close discount popup only
}

// Open the discount popup when the floating icon is clicked
function openDiscountPopup() {
    document.getElementById("discountPopup").style.display = "flex";
}

// Close any modal by ID
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


// Toggle Dropdown Menu (for login and signup only when clicked in the menu)
function toggleMenu() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Show Login, Signup, and Account Modals
function showLogin() { document.getElementById("loginForm").style.display = "flex"; }
function showAccount() { document.getElementById("accountInfo").style.display = "flex"; }

// Show Logged In Menu and Save to LocalStorage
function showLoggedInMenu(userData) {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    document.getElementById("menuNotLoggedIn").style.display = "none";
    document.getElementById("menuLoggedIn").style.display = "block";
    document.getElementById("accountDetails").innerHTML = `
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Mobile:</strong> ${userData.mobile}</p>
        <p><strong>Address:</strong> ${userData.address}</p>
    `;
}

// Handle Signup Submission
function sendSignup(event) {
    event.preventDefault();
    const userData = {
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
        mobile: document.getElementById("signupMobile").value,
        address: document.getElementById("signupAddress").value,
    };
    fetch("signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    }).then(response => response.json()).then(data => {
        alert(data.message);
        if (data.success) {
            showLoggedInMenu(userData);
            closeModal("signupForm");
        }
    });
}

// Handle Login Submission
function sendLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            showLoggedInMenu(data.userData);
            closeModal("loginForm");
        } else {
            alert(data.message);
        }
    });
}

// Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("menuNotLoggedIn").style.display = "block";
    document.getElementById("menuLoggedIn").style.display = "none";
    alert("You have logged out.");
}

// Function to handle showing and hiding pages
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(section => section.classList.remove("active"));
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.classList.add("active");
    else console.warn(`Page with ID '${pageId}' not found.`);
}

// Function to navigate to a specific service detail page
function showServiceDetail(service) {
    showPage(`service-${service}`); // This assumes service detail pages have IDs like 'service-construction'
}

// Function to load images in the project gallery
function loadGallery() {
    const gallery = document.getElementById("gallery");
    const images = [
        "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
        "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg", "img12.jpg", "img13.jpg", "img14.jpg"
    ];

    images.forEach((img, index) => {
        const imgElem = document.createElement("img");
        imgElem.src = `projects/${img}`;
        imgElem.alt = `Project Image ${index + 1}`;
        imgElem.onerror = () => {
            console.error(`Error loading image ${img}`);
            imgElem.style.display = "none";
        };
        gallery.appendChild(imgElem);
    });
}

// Function to play video in the modal
function playVideo(videoSrc) {
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");

    videoPlayer.src = `videos/${videoSrc}`;
    videoModal.style.display = "flex";
    videoPlayer.play();
}

// Function to close the video modal
function closeVideo() {
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");

    videoPlayer.pause();
    videoPlayer.src = "";
    videoModal.style.display = "none";
}

// Chat Messages Array (Simulated automated responses)
const botResponses = {
    "What services do you offer?": "We offer construction, designing, surveying, and building material consulting services.",
    "What are your office hours?": "Our office hours are from 9 AM to 6 PM, Monday to Saturday.",
    "Can I book an appointment?": "Yes, you can book an appointment by calling us at +91 7905997991 or through this chat.",
    "default": "Hi I'm here to help! Please tap on call or whatsapp icon to talk with our customer service or choose from the options above."
};

// Function to send a quick reply
function sendQuickReply(message) {
    displayMessage(message, "user");
    setTimeout(() => generateBotResponse(message), 500);
}

// Function to send user message
function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (message) {
        displayMessage(message, "user");
        userInput.value = "";
        setTimeout(() => generateBotResponse(message), 500);
    }
}

// Display message in chat
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chatBox");
    const messageDiv = document.createElement("div");
    messageDiv.className = "chat-message " + (sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Generate bot response based on user message
function generateBotResponse(userMessage) {
    const response = botResponses[userMessage] || botResponses["default"];
    displayMessage(response, "bot");
}
