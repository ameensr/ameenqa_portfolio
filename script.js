// Load Configuration
document.addEventListener('DOMContentLoaded', () => {
    if (typeof config !== 'undefined') {
        // Resume Links
        const resumeLinks = document.querySelectorAll('#nav-resume-btn, #cta-resume-btn');
        resumeLinks.forEach(link => link.href = config.resumeLink);

        // Contact Details
        const emailLink = document.getElementById('contact-email-link');
        const emailText = document.getElementById('contact-email-text');
        if (emailLink) emailLink.href = `mailto:${config.gmail}`;
        if (emailText) emailText.textContent = config.gmail;

        const phoneText = document.getElementById('contact-phone-text');
        if (phoneText) phoneText.textContent = config.mobile;

        // About Me
        const aboutTitle = document.getElementById('about-title');
        const aboutDescription = document.getElementById('about-description');
        if (aboutTitle) aboutTitle.innerHTML = config.aboutMe.title;
        if (aboutDescription) aboutDescription.innerHTML = config.aboutMe.description;

        // Profile Picture
        const profilePic = document.getElementById('profile-picture');
        if (profilePic) profilePic.src = config.profilePicture;

        // CTA Content
        const ctaTitle = document.getElementById('cta-title');
        const ctaSubtitle = document.getElementById('cta-subtitle');
        const ctaDescription = document.getElementById('cta-description');
        if (ctaTitle) ctaTitle.innerHTML = config.cta.title;
        if (ctaSubtitle) ctaSubtitle.innerText = config.cta.subtitle;
        if (ctaDescription) ctaDescription.innerHTML = config.cta.description;

        // Social Links
        const githubLink = document.getElementById('footer-github');
        const linkedinLink = document.getElementById('footer-linkedin');
        const twitterLink = document.getElementById('footer-twitter');

        if (githubLink) githubLink.href = config.socialLinks.github;
        if (linkedinLink) linkedinLink.href = config.socialLinks.linkedin;
        if (twitterLink) twitterLink.href = config.socialLinks.twitter;

        // Micro-Interaction Widget Toggle
        const orbWidget = document.getElementById('widget-system-orb');
        const bugWidget = document.getElementById('widget-bug-portal');
        const activeWidget = config.cta.activeMicroInteraction; // "systemOrb" or "bugPortal"

        if (orbWidget && bugWidget) {
            if (activeWidget === "bugPortal") {
                bugWidget.style.display = "flex";
                orbWidget.style.display = "none";

                // Start flying
                bugWidget.classList.add('bug-portal-moving');

                // Stop flying on hover to interact
                bugWidget.addEventListener('mouseenter', () => {
                    bugWidget.style.animationPlayState = 'paused';
                });

                bugWidget.addEventListener('mouseleave', () => {
                    bugWidget.style.animationPlayState = 'running';
                });

            } else {
                // Default to System Orb
                orbWidget.style.display = "block";
                bugWidget.style.display = "none";
                bugWidget.classList.remove('bug-portal-moving');
            }
        }
    } else {
        console.error("Config not found!");
    }
});

// Spotlight Card Effect
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// Main Script
function openContactPopup() {
    const popup = document.getElementById('contact-popup');
    popup.classList.add('active');
}

function closeContactPopup() {
    const popup = document.getElementById('contact-popup');
    popup.classList.remove('active');
}

// Close on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeContactPopup();
    }
});

// Scroll Reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

// Particle Background System
const canvas = document.getElementById('bg-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        initParticles();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = w;
            if (this.x > w) this.x = 0;
            if (this.y < 0) this.y = h;
            if (this.y > h) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth * 0.1); // Responsive count
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        // Connect close particles (constellation effect)
        particles.forEach((p1, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 - dist / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', resize);
    resize();
    animateParticles();
}

// Magnetic Buttons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
