
document.addEventListener("DOMContentLoaded", function () {

    console.log("Moja Constructions JavaScript loaded successfully!");


    // ==========================================
    // PART 3 - IMAGE LIGHTBOX
    // ==========================================

    const images = document.querySelectorAll(".project-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeButton = document.getElementById("close-lightbox");

    if (lightbox && lightboxImage && closeButton) {

        // Open lightbox when an image is clicked
        images.forEach(function (image) {

            image.addEventListener("click", function () {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightbox.hidden = false;

            });

        });

        // Close lightbox using the close button
        closeButton.addEventListener("click", function () {

            lightbox.hidden = true;

        });

        // Close lightbox by clicking the background
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                lightbox.hidden = true;
            }

        });

        // Close lightbox using Escape key
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                lightbox.hidden = true;
            }

        });

    }


    // ==========================================
    // PART 3 - FAQ ACCORDION
    // ==========================================

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;
            const isOpen = !answer.hidden;

            // Show or hide the answer
            answer.hidden = isOpen;

            // Update accessibility attribute
            question.setAttribute("aria-expanded", String(!isOpen));

            // Change the plus/minus symbol
            const symbol = question.querySelector("span");

            if (symbol) {
                symbol.textContent = isOpen ? "+" : "−";
            }

        });

    });


    // ==========================================
    // PART 3 - DYNAMIC SERVICE SEARCH
    // ==========================================

    const services = [
        {
            name: "Residential Construction",
            description: "Construction support for homes and residential developments."
        },
        {
            name: "Commercial Construction",
            description: "Building solutions for offices and business properties."
        },
        {
            name: "Renovations and Alterations",
            description: "Improvements and upgrades to existing buildings."
        },
        {
            name: "Project Support",
            description: "Construction planning and project coordination."
        }
    ];

    const searchInput = document.getElementById("searchService");
    const serviceResults = document.getElementById("serviceResults");
    const noResults = document.getElementById("noResults");

    function displayServices(searchText) {

        serviceResults.innerHTML = "";

        const filteredServices = services.filter(function (service) {

            const text = (
                service.name + " " + service.description
            ).toLowerCase();

            return text.includes(searchText.toLowerCase());

        });

        // Display matching services
        filteredServices.forEach(function (service) {

            const card = document.createElement("div");
            card.className = "service-card animated-card";

            const heading = document.createElement("h3");
            heading.textContent = service.name;

            const paragraph = document.createElement("p");
            paragraph.textContent = service.description;

            card.appendChild(heading);
            card.appendChild(paragraph);

            serviceResults.appendChild(card);

        });

        // Show message when no services match
        noResults.hidden = filteredServices.length > 0;

    }

    if (searchInput && serviceResults && noResults) {

        // Display all services initially
        displayServices("");

        // Filter services as the visitor types
        searchInput.addEventListener("input", function () {

            displayServices(searchInput.value.trim());

        });

    }


    // ==========================================
// PART 3 - CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById("contactForm");
const contactResponse = document.getElementById("contactResponse");

if (contactForm && contactResponse) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get contact form information
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const reason = document.getElementById("contactReason").value;
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[0-9\s()-]{9,20}$/;

        // Check for empty fields
        if (!name || !email || !phone || !reason || !service || !message) {
            contactResponse.textContent = "Please complete all fields.";
            contactResponse.style.color = "red";
            return;
        }

        // Validate email
        if (!emailPattern.test(email)) {
            contactResponse.textContent = "Please enter a valid email address.";
            contactResponse.style.color = "red";
            return;
        }

        // Validate phone number
        if (!phonePattern.test(phone)) {
            contactResponse.textContent = "Please enter a valid phone number.";
            contactResponse.style.color = "red";
            return;
        }

        // Prepare email subject
        const subject = encodeURIComponent(
            reason + " - " + service
        );

        // Prepare email body
        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + phone + "\n" +
            "Reason for Contact: " + reason + "\n" +
            "Service Required: " + service + "\n\n" +
            "Message:\n" + message
        );

        // Create email link
        const emailLink =
            "mailto:info@mojaconstructions.co.za" +
            "?subject=" + subject +
            "&body=" + body;

        contactResponse.textContent =
            "Your details are valid. Your email application will open so you can send your enquiry.";

        contactResponse.style.color = "green";

        // Open the visitor's email application
        window.location.href = emailLink;

    });

}

});
