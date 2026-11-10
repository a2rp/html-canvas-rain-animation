const canvas = document.querySelector(".rain-canvas");
const context = canvas.getContext("2d");
const pauseButton = document.querySelector('[data-action="pause"]');
const topButton = document.querySelector(".top-button");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const year = document.querySelector("#year");
const particles = [];
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = motionPreference.matches;
let userChangedMotion = false;
let animationFrame = 0;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = initial ? Math.random() * window.innerHeight : -10;
        this.speed = Math.random() * 2.4 + 1.1;
        this.length = Math.random() * 12 + 4;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speed;
        if (this.y > window.innerHeight + this.length) this.reset();
    }

    draw() {
        context.beginPath();
        context.strokeStyle = `rgba(141,214,255,${this.opacity})`;
        context.lineWidth = 1;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - 1, this.y + this.length);
        context.stroke();
    }
}

function seedParticles() {
    particles.length = 0;
    const count = Math.min(380, Math.max(130, Math.floor(window.innerWidth * 0.35)));
    for (let index = 0; index < count; index += 1) particles.push(new Particle());
}

function drawFrame(advanceParticles) {
    context.fillStyle = "rgba(7,17,29,0.35)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
        if (advanceParticles) particle.update();
        particle.draw();
    });
}

function animate() {
    animationFrame = 0;
    if (paused || document.hidden) return;

    drawFrame(true);
    animationFrame = window.requestAnimationFrame(animate);
}

function syncAnimation() {
    if (paused || document.hidden) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
    }

    if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
}

function updatePauseControl() {
    pauseButton.textContent = paused ? "Resume rain" : "Pause rain";
    pauseButton.setAttribute("aria-pressed", String(paused));
}

function setMenuOpen(open, restoreFocus = false) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.dataset.open = String(open);
    if (open) {
        mobileNav.dataset.open = "true";
        mobileNav.querySelector("a")?.focus();
    } else {
        mobileNav.removeAttribute("data-open");
        if (restoreFocus) menuButton.focus();
    }
}

function updateTopButton() {
    const visible = window.scrollY > 180;
    topButton.setAttribute("data-visible", String(visible));
    topButton.disabled = !visible;
    topButton.tabIndex = visible ? 0 : -1;
}

function handleResize() {
    resizeCanvas();
    seedParticles();
    drawFrame(false);

    if (window.innerWidth > 680 && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        document.querySelector(".desktop-nav a")?.focus();
    }
}

resizeCanvas();
seedParticles();
drawFrame(false);
updatePauseControl();
updateTopButton();
syncAnimation();
year.textContent = new Date().getFullYear();

window.addEventListener("resize", handleResize, { passive: true });
window.addEventListener("scroll", updateTopButton, { passive: true });
document.addEventListener("visibilitychange", syncAnimation);

pauseButton.addEventListener("click", () => {
    userChangedMotion = true;
    paused = !paused;
    updatePauseControl();
    syncAnimation();
});

motionPreference.addEventListener("change", (event) => {
    if (userChangedMotion) return;
    paused = event.matches;
    updatePauseControl();
    syncAnimation();
});

menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    setMenuOpen(!open, open);
});

mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false, true));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false, true);
    }
});

topButton.addEventListener("click", () => {
    const reducedMotion = motionPreference.matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});
