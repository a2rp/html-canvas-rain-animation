const canvas = document.querySelector(".rain-canvas");
const context = canvas.getContext("2d");
const pauseButton = document.querySelector("[data-action=\"pause\"]");
const topButton = document.querySelector(".top-button");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const year = document.querySelector("#year");
const particles = [];
let paused = false;
let animationFrame;

function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = initial ? Math.random() * window.innerHeight : -10;
        this.speed = Math.random() * 2.4 + 1.1;
        this.length = Math.random() * 12 + 4;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() { this.y += this.speed; if (this.y > window.innerHeight + this.length) this.reset(); }
    draw() { context.beginPath(); context.strokeStyle = `rgba(141,214,255,${this.opacity})`; context.lineWidth = 1; context.moveTo(this.x, this.y); context.lineTo(this.x - 1, this.y + this.length); context.stroke(); }
}

function seedParticles() {
    particles.length = 0;
    const count = Math.min(380, Math.max(130, Math.floor(window.innerWidth * 0.35)));
    for (let index = 0; index < count; index += 1) particles.push(new Particle());
}

function animate() {
    context.fillStyle = "rgba(7,17,29,0.35)";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if (!paused) particles.forEach((particle) => { particle.update(); particle.draw(); });
    animationFrame = window.requestAnimationFrame(animate);
}

function closeMenu() { menuButton.setAttribute("aria-expanded", "false"); menuButton.setAttribute("aria-label", "Open menu"); mobileNav.removeAttribute("data-open"); }

resizeCanvas();
seedParticles();
animate();
year.textContent = new Date().getFullYear();
window.addEventListener("resize", () => { resizeCanvas(); seedParticles(); });
pauseButton.addEventListener("click", () => { paused = !paused; pauseButton.textContent = paused ? "Resume rain" : "Pause rain"; });
menuButton.addEventListener("click", () => { const open = menuButton.getAttribute("aria-expanded") === "true"; if (open) closeMenu(); else { menuButton.setAttribute("aria-expanded", "true"); menuButton.setAttribute("aria-label", "Close menu"); mobileNav.setAttribute("data-open", "true"); } });
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", () => topButton.toggleAttribute("data-visible", window.scrollY > 180), { passive: true });
topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
