// Burger Menu Functionality
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

// Toggle Nav
function toggleNav() {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
                index / 7 + 0.3
            }s`;
        }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
}

// Add click event to burger
burger.addEventListener("click", toggleNav);

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (
        !nav.contains(e.target) &&
        !burger.contains(e.target) &&
        nav.classList.contains("nav-active")
    ) {
        toggleNav();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Add active class to current page link
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll(".feature-card");
const observerOptions = {
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, observerOptions);

featureCards.forEach((card) => {
    observer.observe(card);
});
