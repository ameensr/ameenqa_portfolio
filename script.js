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

        // Hero Section
        const heroDescription = document.getElementById('hero-description');
        if (heroDescription && config.hero) heroDescription.innerHTML = config.hero.description;

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

        // CTA Buttons
        const ctaEmailBtn = document.getElementById('cta-email-btn');
        const ctaLinkedinBtn = document.getElementById('cta-linkedin-btn');
        const ctaResumeBtn = document.getElementById('cta-resume-btn');

        if (ctaEmailBtn && config.cta.buttonLinks) ctaEmailBtn.href = `mailto:${config.cta.buttonLinks.email}`;
        if (ctaLinkedinBtn && config.cta.buttonLinks) ctaLinkedinBtn.href = config.cta.buttonLinks.linkedin;
        if (ctaResumeBtn && config.cta.buttonLinks) ctaResumeBtn.href = config.cta.buttonLinks.resume;

        // CTA Button Labels
        if (config.cta.buttonLabels) {
            const emailLabel = document.getElementById('cta-email-label');
            const linkedinLabel = document.getElementById('cta-linkedin-label');
            const resumeLabel = document.getElementById('cta-resume-label');

            if (emailLabel) emailLabel.textContent = config.cta.buttonLabels.email;
            if (linkedinLabel) linkedinLabel.textContent = config.cta.buttonLabels.linkedin;
            if (resumeLabel) resumeLabel.textContent = config.cta.buttonLabels.resume;
        }

        // Notice Box Logic
        const ctaNotice = document.getElementById('cta-notice-period');
        const noticeBox = document.getElementById('notice-box');

        if (noticeBox) {
            if (config.cta.showNoticePeriod) {
                noticeBox.style.display = 'flex';
                if (ctaNotice && config.cta.noticePeriod) ctaNotice.textContent = config.cta.noticePeriod;
            } else {
                noticeBox.style.display = 'none';
            }
        }

        // Notice Bubble Logic
        if (config.cta.noticeBubble) {
            const bubble = document.getElementById('notice-bubble');
            const bubbleText = document.getElementById('notice-bubble-text');

            if (bubble && bubbleText) {
                if (config.cta.noticeBubble.isVisible) {
                    bubble.style.display = 'block';
                    bubbleText.textContent = config.cta.noticeBubble.text;
                } else {
                    bubble.style.display = 'none';
                }
            }
        }



        // Contact Me Section Logic
        const contactSection = document.getElementById('contact-me-section');
        if (contactSection && config.contactSection) {
            if (config.contactSection.isVisible) {
                contactSection.style.display = 'flex';

                const titleEl = document.getElementById('contact-section-title');
                const emailVal = document.getElementById('contact-email-value');
                const linkedinVal = document.getElementById('contact-linkedin-value');
                const githubVal = document.getElementById('contact-github-value');

                const emailItem = document.getElementById('contact-email-item');
                const linkedinItem = document.getElementById('contact-linkedin-item');
                const githubItem = document.getElementById('contact-github-item');

                // if (titleEl) titleEl.textContent = config.contactSection.title;
                if (emailVal) emailVal.textContent = config.contactSection.email;
                if (linkedinVal) linkedinVal.textContent = config.contactSection.linkedin;
                if (githubVal) githubVal.textContent = config.contactSection.github;

                if (emailItem) emailItem.href = `mailto:${config.contactSection.email}`;
                if (linkedinItem) linkedinItem.href = `https://${config.contactSection.linkedin}`;
                if (githubItem) githubItem.href = `https://${config.contactSection.github}`;

            } else {
                contactSection.style.display = 'none';
            }
        }

        // Social Links
        const githubLink = document.getElementById('footer-github');
        const linkedinLink = document.getElementById('footer-linkedin');
        const twitterLink = document.getElementById('footer-twitter');

        if (githubLink) githubLink.href = config.socialLinks.github;
        if (linkedinLink) linkedinLink.href = config.socialLinks.linkedin;
        if (twitterLink) twitterLink.href = config.socialLinks.twitter;

        // Projects
        if (config.projects && config.projects.length > 0) {
            config.projects.forEach((project, index) => {
                const linkEl = document.getElementById(`project-link-${index}`);
                const titleEl = document.getElementById(`project-title-${index}`);
                const descEl = document.getElementById(`project-desc-${index}`);

                if (linkEl) linkEl.href = project.link;
                if (titleEl) titleEl.textContent = project.title;
                if (descEl) descEl.textContent = project.description;
            });
        }

        // Professional Experience
        if (config.experience && config.experience.length > 0) {
            const expContainer = document.getElementById('experience-container');
            if (expContainer) {
                expContainer.innerHTML = '';
                const allCardsHtml = config.experience.map(job => {
                    const bulletsHtml = job.description.map(item =>
                        `<li class="flex items-start gap-3 text-white/70 font-light leading-relaxed [.light-mode_&]:text-black/60">
                            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-brand-sky/50 shrink-0"></span>
                            <span>${item}</span>
                        </li>`
                    ).join('');

                    return `
                        <div class="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] [.light-mode_&]:bg-slate-50 [.light-mode_&]:border-slate-200 [.light-mode_&]:shadow-sm [.light-mode_&]:hover:shadow-lg transition-all duration-300 reveal-up">
                            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                                <div>
                                    <h3 class="text-2xl font-serif font-medium text-white mb-1 [.light-mode_&]:text-black/90">${job.role}</h3>
                                    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/50 [.light-mode_&]:text-black/60">
                                        <span class="font-medium text-white/80 [.light-mode_&]:text-black/80">${job.company}</span>
                                        ${job.location ? `<span class="w-1 h-1 rounded-full bg-white/20 [.light-mode_&]:bg-black/20"></span><span>${job.location}</span>` : ''}
                                    </div>
                                </div>
                                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/20 text-brand-sky text-xs font-mono font-medium w-fit">
                                    ${job.duration}
                                </div>
                            </div>
                            <ul class="space-y-4">
                                ${bulletsHtml}
                            </ul>
                        </div>
                    `;
                }).join('');
                expContainer.innerHTML = allCardsHtml;

                // Re-observe new elements for scroll reveal
                document.querySelectorAll('#experience-container .reveal-up').forEach(el => observer.observe(el));
            }
        }



        if (config.softwareSubtitle) {
            const subtitleEl = document.getElementById('software-subtitle');
            if (subtitleEl) subtitleEl.textContent = config.softwareSubtitle;
        }

        // Software Knowledge Section
        if (config.softwareKnowledge) {
            const gridContainer = document.getElementById('software-knowledge-grid');
            const marqueeContainer = document.getElementById('software-marquee-content');

            // Icon Map (SVG Paths)
            const iconMap = {
                "Quality Assurance & Testing": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />`,
                "Automation, Development & AI-Assisted Building": `<circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`,
                "Database & Backend Validation": `<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />`,
                "Engineering & Design Tools": `<circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 4.24 4.24" /><path d="m14.83 9.17 4.24-4.24" /><path d="m14.83 14.83 4.24 4.24" /><path d="m9.17 14.83-4.24 4.24" /><circle cx="12" cy="12" r="4" />`,
                "Productivity & Collaboration": `<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />`,
                "Creative & Visual Tools": `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15c.6 0 1.2-.2 1.6-.6.4-.5.7-1.1.7-1.9 0-1-.5-1.9-1.4-2.2" /><circle cx="10" cy="13" r=".1" /><path d="M15 15v-4" />`
            };

            const colorMap = {
                "Quality Assurance & Testing": "brand-sky",
                "Automation, Development & AI-Assisted Building": "cyan-500",
                "Database & Backend Validation": "orange-500",
                "Engineering & Design Tools": "purple-500",
                "Productivity & Collaboration": "blue-500",
                "Creative & Visual Tools": "pink-500"
            };

            // Render Grid
            if (gridContainer) {
                gridContainer.innerHTML = '';
                const allKnowledgeHtml = config.softwareKnowledge.map(item => {
                    const colorClass = colorMap[item.category] || "brand-sky";
                    const iconPath = iconMap[item.category] || `<circle cx="12" cy="12" r="10" />`;

                    const skillsHtml = item.skills.map(skill =>
                        `<span class="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/5 hover:border-${colorClass === 'brand-sky' ? 'brand-sky/30' : colorClass + '/30'} transition-colors">${skill}</span>`
                    ).join('');

                    return `
                        <div class="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                            <div class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-${colorClass}/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <h3 class="text-lg font-serif text-white mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-${colorClass}">
                                    ${iconPath}
                                </svg>
                                ${item.category}
                            </h3>
                            <div class="flex flex-wrap gap-3">
                                ${skillsHtml}
                            </div>
                        </div>
                    `;
                }).join('');
                gridContainer.innerHTML = allKnowledgeHtml;
            }

            // Render Marquee
            if (marqueeContainer) {
                marqueeContainer.innerHTML = '';
                const allSkills = config.softwareKnowledge.flatMap(item => item.skills);

                // Function to generate spans
                const generateSpans = () => {
                    return allSkills.map(skill => `<span class="text-white font-mono text-xl tracking-wider">${skill.toUpperCase()}</span>`).join('');
                };

                // Duplicate content for smooth loop (Original + Duplicate)
                marqueeContainer.innerHTML = generateSpans() + generateSpans();
            }
        }

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

// THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");
// const handle = document.getElementById("theme-handle"); // Handled by CSS
// const sunIcon = document.getElementById("sun-icon"); // Handled by CSS
// const moonIcon = document.getElementById("moon-icon"); // Handled by CSS
const body = document.body;

// Note: Initial theme application is now handled by inline script in index.html
// and CSS rules in style.css based on body.light-mode class.

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        const isLight = body.classList.contains("light-mode");

        // Update LocalStorage
        localStorage.setItem("theme", isLight ? "light" : "dark");

    });
}

// Remove Preload class on load to enable transitions
window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});

/* 
function applyTheme(mode) - REMOVED (Logic moved to CSS and Inline Script)
*/

