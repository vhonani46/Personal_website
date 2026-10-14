"use strict";

/* ========================
   PRELOADER
======================== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hidden");
        }, 300);
    }
});

/* ========================
   DARK MODE TOGGLE
======================== */
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    // Restore the saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    themeBtn.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        themeBtn.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    });
}

/* ========================
   SCROLL PROGRESS BAR
======================== */
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const percent = docHeight > 0
        ? (scrollTop / docHeight) * 100
        : 0;

    scrollProgress.style.width = `${percent}%`;
}

/* ========================
   BACK TO TOP BUTTON
======================== */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ========================
   NAV ACTIVE LINK HIGHLIGHT
======================== */
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let current = "";

    sections.forEach(section => {
        const top =
            section.getBoundingClientRect().top + window.scrollY - 120;

        if (window.scrollY >= top) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${current}`;

        link.classList.toggle("active-link", isActive);
    });
}

/* ========================
   TYPING EFFECT
======================== */
const roles = [
    "Web Developer",
    "Software Engineer",
    "Software Developer",
    "Problem Solver"
];

const typedEl = document.getElementById("typedRole");

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typedEl) return;

    const current = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);

        if (charIndex >= current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);

        if (charIndex <= 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

/* ========================
   CONTACT FORM USING EMAILJS
======================== */
const contactForm = document.getElementById("contactForm");
const messageEl = document.getElementById("message");

if (contactForm) {
    contactForm.addEventListener("submit", async event => {
        event.preventDefault();

        if (messageEl) {
            messageEl.textContent = "";
        }

        // Replace these with your real EmailJS credentials.
        const SERVICE_ID = "service_9p61tgd";
        const TEMPLATE_ID = "template_aguzzmh";

        if (
            SERVICE_ID === "YOUR_SERVICE_ID" ||
            TEMPLATE_ID === "YOUR_TEMPLATE_ID"
        ) {
            if (messageEl) {
                messageEl.style.color = "red";
                messageEl.textContent =
                    "Please configure your EmailJS service and template IDs.";
            }
            return;
        }

        if (typeof emailjs === "undefined") {
            if (messageEl) {
                messageEl.style.color = "red";
                messageEl.textContent =
                    "Email service is unavailable. Please try again later.";
            }
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {
            await emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                contactForm
            );

            if (messageEl) {
                messageEl.style.color = "green";
                messageEl.textContent =
                    "Message sent successfully! ✅";
            }

            contactForm.reset();
        } catch (error) {
            console.error("EmailJS error:", error);

            if (messageEl) {
                messageEl.style.color = "red";
                messageEl.textContent =
                    "Message could not be sent. Please try again.";
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}

/* ========================
   PROJECT DATA
======================== */
const projects = [
    {
        title: "Personal Website",
        image:"image3.jpg",
        description:
            "A responsive personal portfolio built with HTML, CSS, and JavaScript showcasing my skills and projects.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://vhonani46.github.io/Personal_website/",
        code: "https://github.com/vhonani46/Personal_website"
    },
    {
        title: "Student Accomodation System",
        image:"image3.jpg",
        description:
            "A dynamic React application demonstrating component-based architecture and state management.",
        tags: ["PhP","Html & css", "JavaScript"],
        link: "#",
        code: "#"
    },
    {
        title: "JavaScript Calculator",
        image:"image3.jpg",
        description:
            "A simple calculator built using JavaScript that performs basic arithmetic operations.",
        tags: ["JavaScript", "CSS", "HTML"],
        link: "https://vhonani46.github.io/calculator/",
        code: "https://github.com/vhonani46/calculator"
    }
];

/* ========================
   LOAD PROJECT CARDS
======================== */
const container = document.getElementById("projectsContainer");
const modal = document.getElementById("projectModal");

 const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            image.alt = `${project.title} image unavailable`;
        }, { once: true });

if (container) {
    container.replaceChildren();

    projects.forEach((project, index) => {
        const card = document.createElement("article");
        card.className = "card";

        const body = document.createElement("div");
        body.className = "card-body";

        const heading = document.createElement("h3");
        heading.textContent = project.title;

        const tagRow = document.createElement("div");
        tagRow.className = "tag-row";

        project.tags.forEach(tag => {
            const tagEl = document.createElement("span");
            tagEl.className = "tag";
            tagEl.textContent = tag;
            tagRow.appendChild(tagEl);
        });

        const description = document.createElement("p");
        description.className = "card-desc";
        description.textContent = project.description;

        const links = document.createElement("div");
        links.className = "card-links";

        const detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.className = "details-btn";
        detailsBtn.dataset.index = index;
        detailsBtn.textContent = "Details";

        const codeLink = document.createElement("a");
        codeLink.className = "solid";
        codeLink.href = project.code;
        codeLink.textContent = "Code";
        codeLink.target = "_blank";
        codeLink.rel = "noopener noreferrer";

        if (project.code === "#") {
            codeLink.addEventListener("click", event => {
                event.preventDefault();
            });
        }

        links.append(detailsBtn, codeLink);
        body.append(heading, tagRow, description, links);
        card.append(image, body);
        container.appendChild(card);
    });

    // Open the project details modal.
    container.addEventListener("click", event => {
        const btn = event.target.closest(".details-btn");

        if (!btn) return;

        const index = Number(btn.dataset.index);
        openModal(index);
    });
}

/* ========================
   PROJECT MODAL
======================== */
function openModal(index) {
    const project = projects[index];

    if (!project || !modal) return;

    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription =
        document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink");
    const modalTags = document.getElementById("modalTags");

    if (modalImage) {
        modalImage.src = project.image;
        modalImage.alt = project.title;
    }

    if (modalTitle) {
        modalTitle.textContent = project.title;
    }

    if (modalDescription) {
        modalDescription.textContent = project.description;
    }

    if (modalLink) {
        modalLink.href = project.link;
        modalLink.target = "_blank";
        modalLink.rel = "noopener noreferrer";
        modalLink.textContent = "Visit Project";

        const hasLink = project.link && project.link !== "#";

        modalLink.style.display = hasLink ? "" : "none";
    }

    if (modalTags) {
        modalTags.replaceChildren();

        project.tags.forEach(tag => {
            const tagEl = document.createElement("span");
            tagEl.className = "tag";
            tagEl.textContent = tag;
            modalTags.appendChild(tagEl);
        });
    }

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    const closeBtn = modal.querySelector(
        ".close-modal, .modal-close, [data-close-modal]"
    );

    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeModal() {
    if (!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

if (modal) {
    modal.addEventListener("click", event => {
        if (
            event.target === modal ||
            event.target.closest(
                ".close-modal, .modal-close, [data-close-modal]"
            )
        ) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

/* ========================
   ANIMATED STAT COUNTERS
======================== */
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    statsAnimated = true;

    document.querySelectorAll(".stat .num").forEach(el => {
        const target = Number.parseInt(el.dataset.target, 10);

        if (!Number.isFinite(target) || target < 0) return;

        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));

        function tick() {
            current = Math.min(current + step, target);
            el.textContent = current;

            if (current < target) {
                requestAnimationFrame(tick);
            }
        }

        tick();
    });
}

/* ========================
   ANIMATED SKILL BARS
======================== */
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    skillsAnimated = true;

    document.querySelectorAll(".skill-fill").forEach(el => {
        const fill = Number.parseFloat(el.dataset.fill);

        if (!Number.isFinite(fill)) return;

        el.style.width = `${Math.min(100, Math.max(0, fill))}%`;
    });
}

/* ========================
   SCROLL REVEAL
======================== */
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                if (entry.target.id === "skills") {
                    animateSkills();
                }

                if (entry.target.id === "statsStrip") {
                    animateStats();
                }

                revealObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach(section => {
        revealObserver.observe(section);
    });
} else {
    document.querySelectorAll(".reveal").forEach(section => {
        section.classList.add("active");
    });

    animateSkills();
    animateStats();
}

/* ========================
   SCROLL EVENTS
======================== */
window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateActiveNav();

    if (backToTop) {
        backToTop.classList.toggle("show", window.scrollY > 400);
    }
}, { passive: true });

/* ========================
   INITIAL PAGE UPDATE
======================== */
updateScrollProgress();
updateActiveNav();

if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 400);
}
