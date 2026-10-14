/* ========================
   PRELOADER
======================== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => preloader.classList.add("hidden"), 300);
});

/* ========================
   DARK MODE TOGGLE
======================== */
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

/* ========================
   SCROLL PROGRESS BAR
======================== */
const scrollProgress = document.getElementById("scrollProgress");
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + "%";
}

/* ========================
   BACK TO TOP BUTTON
======================== */
const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ========================
   NAV ACTIVE LINK HIGHLIGHT
======================== */
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
    let current = "";
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${current}`);
    });
}

/* ========================
   TYPING EFFECT (HERO ROLE)
======================== */
const roles = ["Web Developer", "IT Student", "React Enthusiast", "Problem Solver"];
const typedEl = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
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
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            const msg = document.getElementById("message");
            msg.style.color = "green";
            msg.textContent = "Message sent successfully! ✅";
            document.getElementById('contactForm').reset();
        }, function(error) {
            const msg = document.getElementById("message");
            msg.style.color = "red";
            msg.textContent = "Oops... something went wrong. ❌";
            console.error('FAILED...', error);
        });
});

/* ========================
   DYNAMIC PROJECT DATA
======================== */
const projects = [
    {
        title: "Personal Website",
        image: "image1.jpg",
        description: "A responsive personal portfolio built with HTML, CSS, and JavaScript showcasing my skills and projects.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#",
        code: "#"
    },
    {
        title: "React App",
        image: "image2.jpg",
        description: "A dynamic React application demonstrating component-based architecture and state management.",
        tags: ["React", "JavaScript"],
        link: "#",
        code: "#"
    },
    {
        title: "JavaScript Calculator",
        image: "image4.jpg",
        description: "A simple calculator built using JavaScript that performs basic arithmetic operations.",
        tags: ["JavaScript", "CSS"],
        link: "#",
        code: "#"
    }
];

/* ========================
   LOAD PROJECT CARDS
======================== */
const container = document.getElementById("projectsContainer");
projects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="card-body">
            <h3>${project.title}</h3>
            <div class="tag-row">
                ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
            </div>
            <p class="card-desc">${project.description}</p>
            <div class="card-links">
                <button type="button" data-index="${index}" class="details-btn">Details</button>
                <a href="${project.code}" class="solid" target="_blank" onclick="event.stopPropagation()">Code</a>
            </div>
        </div>
    `;
    container.appendChild(card);
});

// Open modal from Details button (event delegation to avoid inline-onclick issues)
container.addEventListener("click", (e) => {
    const btn = e.target.closest(".details-btn");
    if (btn) openModal(Number(btn.dataset.index));
});

/* ========================
   PROJECT MODAL FUNCTIONS
======================== */
const modal = document.getElementById("projectModal");
function openModal(index) {
    const project = projects[index];
    document.getElementById("modalImage").src = project.image;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDescription").textContent = project.description;
    document.getElementById("modalLink").href = project.link;
    document.getElementById("modalTags").innerHTML =
        project.tags.map(t => `<span class="tag">${t}</span>`).join("");
    modal.style.display = "flex";
}
function closeModal() {
    modal.style.display = "none";
}
// Close modal if user clicks outside modal content
modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
});

/* ========================
   ANIMATED STAT COUNTERS
======================== */
let statsAnimated = false;
function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    document.querySelectorAll(".stat .num").forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
            current += step;
            if (current >= target) {
                el.textContent = target;
            } else {
                el.textContent = current;
                requestAnimationFrame(tick);
            }
        };
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
        el.style.width = el.dataset.fill + "%";
    });
}

/* ========================
   SCROLL REVEAL ANIMATION
   (IntersectionObserver — more efficient than a scroll listener)
======================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            if (entry.target.id === "skills") animateSkills();
            if (entry.target.id === "statsStrip") animateStats();
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(section => revealObserver.observe(section));

/* ========================
   SCROLL LISTENER (progress bar, nav highlight, back-to-top)
======================== */
window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateActiveNav();
    backToTop.classList.toggle("show", window.scrollY > 400);
});

// Run once on load in case the page opens mid-scroll
updateScrollProgress();
updateActiveNav();
