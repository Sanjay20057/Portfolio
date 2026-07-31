document.addEventListener("DOMContentLoaded", () => {

    /* =====================
       LOADING SCREEN & INITIAL ANIMATIONS
    ===================== */
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');

        setTimeout(function() {
            loader.classList.add('hidden');
            setTimeout(function() {
                animateOnLoad();
            }, 100);
        }, 2500);
    });

    function animateOnLoad() {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.classList.add('appear');

        const fixedEmail = document.querySelector('.fixed-email');
        const fixedSocial = document.querySelector('.fixed-social');
        if (fixedEmail) fixedEmail.classList.add('appear');
        if (fixedSocial) fixedSocial.classList.add('appear');

        const heroElements = document.querySelectorAll('.hero .fade-up');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('appear');
            }, index * 100);
        });
    }

    /* =====================
       SCROLL-TRIGGERED ANIMATIONS
    ===================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.section .fade-up');
    fadeUpElements.forEach(element => {
        observer.observe(element);
    });

    /* =====================
       TAB SWITCHER
    ===================== */
    (function initTabs() {
        const tabButtons  = document.querySelectorAll('.tab-btn');
        const tabPanels   = document.querySelectorAll('.tab-panel');
        const indicator   = document.querySelector('.tab-indicator');

        if (!tabButtons.length || !indicator) return;

        function moveIndicator(btn) {
            const nav  = btn.closest('.tab-nav');
            const isHorizontal = getComputedStyle(nav).flexDirection === 'row';

            if (isHorizontal) {
                indicator.style.left   = btn.offsetLeft + 'px';
                indicator.style.top    = '';
            } else {
                indicator.style.top    = btn.offsetTop + 'px';
                indicator.style.left   = '';
            }
        }

        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn) moveIndicator(activeBtn);

        window.addEventListener('resize', () => {
            const current = document.querySelector('.tab-btn.active');
            if (current) moveIndicator(current);
        });

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;

                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === 'tab-panel-' + target) {
                        panel.classList.add('active');
                    }
                });

                moveIndicator(btn);
            });
        });
    })();

    /* =====================
       MOBILE MENU
    ===================== */
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks   = document.getElementById("nav-links");

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = '';
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileMenu.classList.remove("active");
                document.body.style.overflow = '';
            });
        });
    }

    /* =====================
       NAVBAR SCROLL EFFECT
    ===================== */
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    /* =====================
       SCROLL SPY
    ===================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems  = document.querySelectorAll(".nav-links a[href^='#']");

    function updateActiveNavLink() {
        let current = "";
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - 200)) {
                current = section.getAttribute("id");
            }
        });
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveNavLink);
            ticking = true;
        }
    });

    /* =====================
       SMOOTH SCROLL
    ===================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =====================
       BLUR NAVBAR ON SCROLL
    ===================== */
    function applyNavbarBlur() {
        if (window.scrollY > 0) {
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.webkitBackdropFilter = 'blur(10px)';
        } else {
            navbar.style.backdropFilter = 'blur(0px)';
            navbar.style.webkitBackdropFilter = 'blur(0px)';
        }
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(applyNavbarBlur);
            ticking = true;
        }
    });

    /* =====================
       PROJECT CARD TILT
    ===================== */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const rotateX = (e.clientY - rect.top  - rect.height / 2) / 20;
            const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* =====================
       CERTIFICATE MODAL
    ===================== */
    window.openModal = function(certId) {
        const modal = document.getElementById('certModal');
        const modalImg = document.getElementById('modalImage');

        if (!modal || !modalImg) return;

        const certCard = document.getElementById(certId);
        if (!certCard) return;

        const certImage = certCard.querySelector('.cert-preview-img img');
        if (!certImage) return;

        modalImg.src = certImage.src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = function() {
        const modal = document.getElementById('certModal');
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('certModal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    const certModal = document.getElementById('certModal');
    if (certModal) {
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                closeModal();
            }
        });
    }

    /* =====================
       KEYBOARD NAV
    ===================== */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* =====================
       ORIENTATION CHANGE
    ===================== */
    window.addEventListener("orientationchange", () => {
        if (navLinks)   navLinks.classList.remove("active");
        if (mobileMenu) mobileMenu.classList.remove("active");
        document.body.style.overflow = '';
    });

    /* =====================
       FOCUS VISIBLE HELPERS
    ===================== */
    document.body.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') document.body.classList.remove('using-mouse');
    });

    /* =====================
       PREVENT LAYOUT SHIFT
    ===================== */
    document.querySelectorAll('.section').forEach(section => {
        if (!section.style.minHeight) section.style.minHeight = '200px';
    });

    /* =====================
       PRELOAD CRITICAL IMAGES
    ===================== */
    document.querySelectorAll('img[src*="static"]').forEach(img => {
        const pre = new Image();
        pre.src = img.src;
    });

    /* =====================
       CONSOLE EASTER EGG
    ===================== */
    console.log(`
    %c Hi there! 👋
    %c Thanks for checking out my portfolio.
    %c Looking for talented data scientists? Let's chat!
    `,
    'color: #64ffda; font-size: 16px; font-weight: bold;',
    'color: #8892b0; font-size: 12px;',
    'color: #8892b0; font-size: 12px;'
    );

});

/* =====================
   SHOW MORE / SHOW LESS PROJECTS
===================== */
window.toggleProjects = function() {
    const hiddenCards = document.querySelectorAll('.project-card--hidden');
    const btn = document.getElementById('show-more-btn');
    const icon = document.getElementById('show-more-icon');

    if (!hiddenCards.length || !btn) return;

    const isExpanded = btn.getAttribute('data-expanded') === 'true';

    if (!isExpanded) {
        // Show hidden cards
        hiddenCards.forEach((card, index) => {
            card.style.display = 'flex';
            // Trigger fade-up animation for newly shown cards
            setTimeout(() => {
                card.classList.add('appear');
            }, index * 100);
        });
        btn.setAttribute('data-expanded', 'true');
        btn.innerHTML = `Show Less <svg id="show-more-icon" class="show-more-icon rotated" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    } else {
        // Hide the extra cards
        hiddenCards.forEach(card => {
            card.style.display = 'none';
            card.classList.remove('appear');
        });
        btn.setAttribute('data-expanded', 'false');
        btn.innerHTML = `Show More <svg id="show-more-icon" class="show-more-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

        // Scroll back up to the projects grid when collapsing
        const grid = document.getElementById('projects-grid');
        if (grid) {
            setTimeout(() => {
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
};


/* =====================
   FRAME-SEQUENCE SCROLL BACKGROUND (About -> Contact)
   Draws frame_0001.jpg ... frame_0241.jpg onto a fixed, full-viewport
   canvas that sits behind the page content (z-index in CSS). The
   canvas fades in as soon as you scroll into #about and fades out
   again after #contact. While active, it picks a frame based on how
   far you've scrolled through that whole span — so scrolling down
   plays it forward and scrolling up plays it backward, the same way
   the page itself scrolls.
   (This runs standalone, outside DOMContentLoaded above, which is
   fine since this script tag uses `defer` — the DOM is already
   parsed by the time any of this file runs.)
===================== */
(function initBackgroundScrub() {
    const canvas = document.getElementById('bg-scrub-canvas');
    const overlay = document.getElementById('bg-scrub-overlay');
    const startEl = document.getElementById('about');
    const endEl = document.getElementById('contact');
    if (!canvas || !startEl || !endEl) return;

    const ctx = canvas.getContext('2d');

    const FRAME_COUNT = 241;                          // total extracted frames
    const FRAME_PATH = 'static/video/frames/frame_';  // + 0001.jpg, 0002.jpg, ...

    const getFramePath = (index) =>
        `${FRAME_PATH}${String(index).padStart(4, '0')}.jpg`;

    const images = new Array(FRAME_COUNT);
    let currentFrame = -1; // force first draw
    let rangeStart = 0;
    let rangeEnd = 0;
    let scrubTicking = false;

    // Where #about starts and #contact ends, in document coordinates.
    // Recomputed on load/resize since images/fonts loading can shift layout.
    function computeRange() {
        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const docTop = window.pageYOffset || document.documentElement.scrollTop;

        rangeStart = startRect.top + docTop;
        rangeEnd = endRect.bottom + docTop;
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(Math.max(currentFrame, 0));
    }

    function drawFrame(index) {
        const img = images[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        // "cover" style fit: fill the canvas, cropping overflow, like CSS object-fit: cover
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.naturalWidth / img.naturalHeight;

        let drawWidth, drawHeight, offsetX, offsetY;
        if (imgRatio > canvasRatio) {
            drawHeight = canvas.height;
            drawWidth = drawHeight * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = canvas.width;
            drawHeight = drawWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function updateFromScroll() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const inRange = scrollY >= rangeStart - window.innerHeight * 0.25 &&
                         scrollY <= rangeEnd;

        canvas.classList.toggle('is-active', inRange);
        if (overlay) overlay.classList.toggle('is-active', inRange);

        if (inRange) {
            const span = Math.max(rangeEnd - rangeStart, 1);
            let progress = (scrollY - rangeStart) / span;
            progress = Math.max(0, Math.min(1, progress));

            const targetFrame = Math.round(progress * (FRAME_COUNT - 1));
            if (targetFrame !== currentFrame) {
                currentFrame = targetFrame;
                drawFrame(currentFrame);
            }
        }

        scrubTicking = false;
    }

    // Preload all frames. The first frame draws as soon as it's ready so
    // there's no blank flash the first time the background activates.
    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = getFramePath(i + 1);
        if (i === 0) {
            img.onload = () => {
                if (currentFrame === -1) drawFrame(0);
            };
        }
        images[i] = img;
    }

    window.addEventListener('scroll', () => {
        if (!scrubTicking) {
            window.requestAnimationFrame(updateFromScroll);
            scrubTicking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        computeRange();
        resizeCanvas();
        updateFromScroll();
    });

    window.addEventListener('load', () => {
        computeRange();
        updateFromScroll();
    });

    computeRange();
    resizeCanvas();
    updateFromScroll();
})();
