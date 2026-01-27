document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       MOBILE MENU
    ===================== */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    mobileMenu.addEventListener("click", e => {
        e.stopPropagation();
        navLinks.classList.toggle("active");
    });

    document.addEventListener("click", e => {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => navLinks.classList.remove("active"));
    });

    /* =====================
   DARK MODE TOGGLE
==================== */
const toggle = document.createElement("div");
toggle.innerText = "Dark mode";
toggle.style.cursor = "pointer";
toggle.style.marginLeft = "20px";
toggle.style.padding = "10px 14px";
toggle.style.borderRadius = "12px";
toggle.style.background = "rgba(255,255,255,0.6)";
toggle.style.color = "#111827";
toggle.style.fontWeight = "600";
toggle.style.userSelect = "none";

const nav = document.querySelector("nav");
const navLinksContainer = document.getElementById("nav-links");

function updateToggleUI() {
    if (document.body.classList.contains("dark")) {
        toggle.innerText = "Light mode";
        toggle.style.background = "rgba(99,102,241,0.85)";
        toggle.style.color = "#fff";
    } else {
        toggle.innerText = "Dark mode";
        toggle.style.background = "rgba(255,255,255,0.6)";
        toggle.style.color = "#111827";
    }
}

function placeDarkToggle() {
    if (window.innerWidth <= 768) {
        if (!navLinksContainer.contains(toggle)) {
            navLinksContainer.appendChild(toggle);
        }
    } else {
        if (!nav.contains(toggle)) {
            nav.appendChild(toggle);
        }
    }
}

// Initial placement
placeDarkToggle();

// Re-position on resize
window.addEventListener("resize", placeDarkToggle);

// Toggle dark mode
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
    updateToggleUI();
});

// Initial UI update
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
updateToggleUI();


    /* =====================
       SCROLL SPY
    ===================== */
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            if (scrollY >= sec.offsetTop - 150) {
                current = sec.getAttribute("id");
            }
        });

        links.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("active");
            }
        });
    });

/* =====================
   BACK TO TOP
==================== */
const backTop = document.createElement("div");
backTop.id = "backToTop";
backTop.innerText = "Back to Top";

/* Position */
backTop.style.position = "fixed";
backTop.style.bottom = "30px";
backTop.style.right = "30px";
backTop.style.display = "none";
backTop.style.zIndex = "999";

/* Shape & Layout (FIXED) */
backTop.style.minHeight = "42px";
backTop.style.padding = "0 22px";
backTop.style.borderRadius = "14px";

backTop.style.display = "flex";
backTop.style.alignItems = "center";
backTop.style.justifyContent = "center";

/* Typography */
backTop.style.fontSize = "14px";
backTop.style.fontWeight = "600";
backTop.style.letterSpacing = "0.3px";

/* Colors */
backTop.style.background = "linear-gradient(135deg, #6366f1, #7c83ff)";
backTop.style.color = "#fff";

/* Effects */
backTop.style.cursor = "pointer";
backTop.style.boxShadow = "0 12px 28px rgba(99,102,241,0.35)";
backTop.style.transition = "transform 0.25s ease, opacity 0.25s ease";

document.body.appendChild(backTop);

/* Show / Hide */
window.addEventListener("scroll", () => {
    backTop.style.display = window.scrollY > 400 ? "flex" : "none";
});

/* Click Scroll */
backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Hover */
backTop.addEventListener("mouseenter", () => {
    backTop.style.transform = "translateY(-2px)";
});

backTop.addEventListener("mouseleave", () => {
    backTop.style.transform = "translateY(0)";
});

   /* =====================
   RESUME MODAL
===================== */
const modal = document.createElement("div");
modal.id = "resumeModal";
modal.style.display = "none";
modal.style.alignItems = "center";
modal.style.justifyContent = "center";
modal.style.animation = "fadeIn 0.3s ease";

modal.innerHTML = `
    <div class="modal-box">
        <div class="modal-header">
            <h3>My Resume</h3>
            <button class="modal-close">✕</button>
        </div>
        <iframe src="/static/Sanjay_Resume.pdf#zoom=page-width"></iframe>
    </div>
`;

document.body.appendChild(modal);

// Preview Button
const previewBtn = document.querySelector(".preview-btn");

if (previewBtn) {
    previewBtn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
}

// Close when clicking outside
modal.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Prevent close on modal click
modal.querySelector(".modal-box").addEventListener("click", (e) => {
    e.stopPropagation();
});

// Close button
modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});


    /* =====================
       AOS
    ===================== */
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 800, once: true });
    }
});

/* =====================
   FIX MENU ON ROTATION
===================== */
window.addEventListener("orientationchange", () => {
    const navLinks = document.getElementById("nav-links");
    if (navLinks) {
        navLinks.classList.remove("active");
    }
});

/* ===================== PROJECT MODAL ==================== */
const projectModal = document.createElement("div");
projectModal.classList.add("project-modal");
projectModal.innerHTML = `
  <div class="modal-box">
    <div class="modal-header">
      <h3></h3>
      <button class="modal-close">✕</button>
    </div>
    <img src="" alt="Project Image">
    <p class="modal-desc"></p>
    <div class="modal-tech"></div>
    <div style="margin-top:12px;">
      <a href="#" target="_blank" class="btn modal-github">View Code</a>
      <a href="#" target="_blank" class="btn modal-live">View Deployed App</a>
    </div>
  </div>
`;

document.body.appendChild(projectModal);

document.querySelectorAll(".project-preview").forEach(img => {
    img.addEventListener("click", () => {
        const modal = projectModal;

        // Multiple images
        const images = img.dataset.images ? img.dataset.images.split(",") : [img.src];
        let currentIndex = 0;

        const modalImg = modal.querySelector("img");
        modalImg.src = images[currentIndex];

        // Title, description, tech, buttons
        modal.querySelector(".modal-header h3").innerText = img.dataset.title;
        modal.querySelector(".modal-desc").innerText = img.dataset.desc;

        const techContainer = modal.querySelector(".modal-tech");
        techContainer.innerHTML = "";
        img.dataset.tech.split(",").forEach(t => {
            const span = document.createElement("span");
            span.innerText = t.trim();
            techContainer.appendChild(span);
        });

        modal.querySelector(".modal-github").href = img.dataset.github;
        modal.querySelector(".modal-live").href = img.dataset.live;

        // Show modal
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // PREV/NEXT BUTTONS
        let navBtns = modal.querySelector(".modal-nav");
        if (!navBtns) {
            navBtns = document.createElement("div");
            navBtns.className = "modal-nav";
            navBtns.innerHTML = `
                <button class="prev-btn">&lt;</button>
                <button class="next-btn">&gt;</button>
            `;
            modal.querySelector(".modal-box").insertBefore(navBtns, modal.querySelector(".modal-desc"));
        }

        const prevBtn = navBtns.querySelector(".prev-btn");
        const nextBtn = navBtns.querySelector(".next-btn");

        // Update images on click
        prevBtn.onclick = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImg.src = images[currentIndex];
        };
        nextBtn.onclick = () => {
            currentIndex = (currentIndex + 1) % images.length;
            modalImg.src = images[currentIndex];
        };
    });
});

// Close modal when clicking outside or on X button
projectModal.addEventListener("click", () => {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
});

// Prevent close when clicking inside modal-box
projectModal.querySelector(".modal-box").addEventListener("click", e => e.stopPropagation());

// Close button (X) works
projectModal.querySelector(".modal-close").addEventListener("click", () => {
    projectModal.style.display = "none";
    document.body.style.overflow = "auto";
});
