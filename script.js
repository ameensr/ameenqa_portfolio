function setTheme(isLight) {
    document.documentElement.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

function syncThemeFromStorage() {
    const isLight = (localStorage.getItem("theme") || "dark") === "light";
    setTheme(isLight);
}

const SKILL_STYLES = {
    "Quality Assurance & Testing": {
        icon: "text-brand-sky",
        hoverBorder: "hover:border-brand-sky/30",
        viaGradient: "via-brand-sky/30"
    },
    "Automation, Development & AI-Assisted Building": {
        icon: "text-cyan-500",
        hoverBorder: "hover:border-cyan-500/30",
        viaGradient: "via-cyan-500/30"
    },
    "Database & Backend Validation": {
        icon: "text-orange-500",
        hoverBorder: "hover:border-orange-500/30",
        viaGradient: "via-orange-500/30"
    },
    "Engineering & Design Tools": {
        icon: "text-purple-500",
        hoverBorder: "hover:border-purple-500/30",
        viaGradient: "via-purple-500/30"
    },
    "Productivity & Collaboration": {
        icon: "text-blue-500",
        hoverBorder: "hover:border-blue-500/30",
        viaGradient: "via-blue-500/30"
    },
    "Creative & Visual Tools": {
        icon: "text-pink-500",
        hoverBorder: "hover:border-pink-500/30",
        viaGradient: "via-pink-500/30"
    }
};

const SKILL_ICONS = {
    "Quality Assurance & Testing": `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />`,
    "Automation, Development & AI-Assisted Building": `<circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />`,
    "Database & Backend Validation": `<ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />`,
    "Engineering & Design Tools": `<circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 4.24 4.24" /><path d="m14.83 9.17 4.24-4.24" /><path d="m14.83 14.83 4.24 4.24" /><path d="m9.17 14.83-4.24 4.24" /><circle cx="12" cy="12" r="4" />`,
    "Productivity & Collaboration": `<rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />`,
    "Creative & Visual Tools": `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M9 15c.6 0 1.2-.2 1.6-.6.4-.5.7-1.1.7-1.9 0-1-.5-1.9-1.4-2.2" /><circle cx="10" cy="13" r=".1" /><path d="M15 15v-4" />`
};

const DEFAULT_SKILL_STYLE = {
    icon: "text-brand-sky",
    hoverBorder: "hover:border-brand-sky/30",
    viaGradient: "via-brand-sky/30"
};

function observeRevealElements(selector) {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container || !projects?.length) return;

    container.innerHTML = projects.map(project => `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer"
            class="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] [.light-mode_&]:bg-slate-50 [.light-mode_&]:border-slate-200 [.light-mode_&]:shadow-sm [.light-mode_&]:hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block reveal-up">
            <div class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-sky/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex flex-col gap-4">
                <div class="w-12 h-12 rounded-full bg-brand-sky/10 flex items-center justify-center border border-brand-sky/20 group-hover:border-brand-sky/50 group-hover:scale-110 transition-all duration-300 ease-out">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brand-sky">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
                <div>
                    <h3 class="text-xl font-serif text-white mb-2 group-hover:text-brand-sky transition-colors [.light-mode_&]:text-black/90">${project.title}</h3>
                    <p class="text-sm text-white/50 [.light-mode_&]:text-black/60">${project.description}</p>
                </div>
                <div class="mt-4 flex items-center gap-2 text-xs font-medium text-brand-sky opacity-60 group-hover:opacity-100 transition-opacity">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </a>
    `).join('');

    observeRevealElements('#projects-container .reveal-up');
}

function renderEducation(education) {
    const container = document.getElementById('education-container');
    if (!container || !education) return;

    container.innerHTML = `
        <div class="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] [.light-mode_&]:bg-slate-50 [.light-mode_&]:border-slate-200 [.light-mode_&]:shadow-sm [.light-mode_&]:hover:shadow-lg transition-all duration-300 reveal-up flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="w-14 h-14 rounded-2xl bg-brand-sky/10 border border-brand-sky/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.1)] group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brand-sky">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            </div>
            <div class="flex-1 text-center md:text-left">
                <h3 class="text-xl md:text-2xl font-serif font-medium text-white mb-2 group-hover:text-brand-sky transition-colors [.light-mode_&]:text-black/90">${education.degree}</h3>
                <p class="text-white/60 font-medium text-base mb-1 [.light-mode_&]:text-black/60">${education.field}</p>
                <div class="flex items-center justify-center md:justify-start gap-2 mt-3 text-xs text-brand-sky/80 uppercase tracking-widest font-mono">
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-sky"></span>
                    ${education.graduated}
                </div>
            </div>
            <div class="relative group/badge mt-6 md:mt-0 md:ml-auto">
                <div class="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-1 transition-transform duration-300 hover:scale-105 hover:border-brand-sky/30">
                    <div class="absolute inset-0 bg-gradient-to-r from-brand-sky/20 to-purple-500/20 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"></div>
                    <div class="relative flex flex-col items-center justify-center px-6 py-2 bg-[#0A0A0A]/90 rounded-lg backdrop-blur-md [.light-mode_&]:bg-white [.light-mode_&]:border-black/5 [.light-mode_&]:shadow-sm">
                        <span class="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 [.light-mode_&]:text-black/60">CGPA</span>
                        <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white group-hover/badge:from-brand-sky group-hover/badge:to-purple-400 transition-all duration-300 [.light-mode_&]:from-neutral-800 [.light-mode_&]:to-neutral-600">${education.cgpa}</span>
                    </div>
                    <div class="absolute inset-0 translate-x-[-100%] group-hover/badge:animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
    `;

    observeRevealElements('#education-container .reveal-up');
}

function renderCertifications(certifications) {
    const container = document.getElementById('certifications-container');
    if (!container || !certifications?.length) return;

    container.innerHTML = certifications.map((cert, index) => `
        <div class="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] [.light-mode_&]:bg-slate-50 [.light-mode_&]:border-slate-200 [.light-mode_&]:shadow-sm [.light-mode_&]:hover:shadow-md transition-all duration-300 flex items-center gap-4 reveal-up">
            <div class="w-12 h-12 rounded-full bg-brand-sky/10 flex items-center justify-center border border-brand-sky/20 group-hover:border-brand-sky/50 group-hover:scale-110 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-brand-sky">
                    ${index === 0
                        ? `<path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" /><path d="M2 12h1" /><path d="M21 12h1" /><path d="M12 2v1" /><path d="M12 21v1" /><path d="m4.93 4.93.7.7" /><path d="m18.36 18.36.7.7" /><path d="m4.93 19.07.7-.7" /><path d="m18.36 5.64.7-.7" />`
                        : `<rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 12 2 2 4-4" />`}
                </svg>
            </div>
            <div>
                <h4 class="text-white font-serif font-medium text-lg [.light-mode_&]:text-black/80">${cert.title}</h4>
                <span class="text-xs text-brand-sky font-mono">${cert.subtitle}</span>
            </div>
        </div>
    `).join('');

    observeRevealElements('#certifications-container .reveal-up');
}

// Load Configuration
document.addEventListener('DOMContentLoaded', () => {
    syncThemeFromStorage();

    if (typeof config === 'undefined') {
        console.error("Config not found!");
        return;
    }

    document.querySelectorAll('#nav-resume-btn, #cta-resume-btn').forEach(link => {
        link.href = config.resumeLink;
    });

    const emailLink = document.getElementById('contact-email-link');
    const emailText = document.getElementById('contact-email-text');
    if (emailLink) emailLink.href = `mailto:${config.gmail}`;
    if (emailText) emailText.textContent = config.gmail;

    const phoneText = document.getElementById('contact-phone-text');
    if (phoneText) phoneText.textContent = config.mobile;

    const heroDescription = document.getElementById('hero-description');
    if (heroDescription && config.hero) heroDescription.innerHTML = config.hero.description;

    const aboutTitle = document.getElementById('about-title');
    const aboutDescription = document.getElementById('about-description');
    if (aboutTitle) aboutTitle.innerHTML = config.aboutMe.title;
    if (aboutDescription) aboutDescription.innerHTML = config.aboutMe.description;

    const profilePic = document.getElementById('profile-picture');
    const profileWebp = document.getElementById('profile-picture-webp');
    if (profilePic) profilePic.src = config.profilePicture;
    if (profileWebp && config.profilePictureWebp) profileWebp.srcset = config.profilePictureWebp;

    const ctaTitle = document.getElementById('cta-title');
    const ctaSubtitle = document.getElementById('cta-subtitle');
    const ctaDescription = document.getElementById('cta-description');
    if (ctaTitle) ctaTitle.innerHTML = config.cta.title;
    if (ctaSubtitle) ctaSubtitle.innerText = config.cta.subtitle;
    if (ctaDescription) ctaDescription.innerHTML = config.cta.description;

    const ctaEmailBtn = document.getElementById('cta-email-btn');
    const ctaLinkedinBtn = document.getElementById('cta-linkedin-btn');
    const ctaResumeBtn = document.getElementById('cta-resume-btn');
    if (ctaEmailBtn && config.cta.buttonLinks) ctaEmailBtn.href = `mailto:${config.cta.buttonLinks.email}`;
    if (ctaLinkedinBtn && config.cta.buttonLinks) ctaLinkedinBtn.href = config.cta.buttonLinks.linkedin;
    if (ctaResumeBtn && config.cta.buttonLinks) ctaResumeBtn.href = config.cta.buttonLinks.resume;

    if (config.cta.buttonLabels) {
        const emailLabel = document.getElementById('cta-email-label');
        const linkedinLabel = document.getElementById('cta-linkedin-label');
        const resumeLabel = document.getElementById('cta-resume-label');
        if (emailLabel) emailLabel.textContent = config.cta.buttonLabels.email;
        if (linkedinLabel) linkedinLabel.textContent = config.cta.buttonLabels.linkedin;
        if (resumeLabel) resumeLabel.textContent = config.cta.buttonLabels.resume;
    }

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

    const contactSection = document.getElementById('contact-me-section');
    if (contactSection && config.contactSection) {
        if (config.contactSection.isVisible) {
            contactSection.style.display = 'flex';

            const emailVal = document.getElementById('contact-email-value');
            const linkedinVal = document.getElementById('contact-linkedin-value');
            const githubVal = document.getElementById('contact-github-value');
            const emailItem = document.getElementById('contact-email-item');
            const linkedinItem = document.getElementById('contact-linkedin-item');
            const githubItem = document.getElementById('contact-github-item');

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

    const githubLink = document.getElementById('footer-github');
    const linkedinLink = document.getElementById('footer-linkedin');
    const twitterLink = document.getElementById('footer-twitter');
    if (githubLink) githubLink.href = config.socialLinks.github;
    if (linkedinLink) linkedinLink.href = config.socialLinks.linkedin;
    if (twitterLink) {
        if (config.socialLinks.twitter) {
            twitterLink.href = config.socialLinks.twitter;
            twitterLink.style.display = '';
        } else {
            twitterLink.style.display = 'none';
        }
    }

    renderProjects(config.projects);
    renderEducation(config.education);
    renderCertifications(config.certifications);

    if (config.experience?.length) {
        const expContainer = document.getElementById('experience-container');
        if (expContainer) {
            expContainer.innerHTML = config.experience.map(job => {
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
                        <ul class="space-y-4">${bulletsHtml}</ul>
                    </div>
                `;
            }).join('');

            observeRevealElements('#experience-container .reveal-up');
        }
    }

    if (config.softwareSubtitle) {
        const subtitleEl = document.getElementById('software-subtitle');
        if (subtitleEl) subtitleEl.textContent = config.softwareSubtitle;
    }

    if (config.softwareKnowledge) {
        const gridContainer = document.getElementById('software-knowledge-grid');
        const marqueeContainer = document.getElementById('software-marquee-content');

        if (gridContainer) {
            gridContainer.innerHTML = config.softwareKnowledge.map(item => {
                const styles = SKILL_STYLES[item.category] || DEFAULT_SKILL_STYLE;
                const iconPath = SKILL_ICONS[item.category] || `<circle cx="12" cy="12" r="10" />`;
                const skillsHtml = item.skills.map(skill =>
                    `<span class="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/5 ${styles.hoverBorder} transition-colors [.light-mode_&]:text-black/70 [.light-mode_&]:bg-black/5">${skill}</span>`
                ).join('');

                return `
                    <div class="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1">
                        <div class="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent ${styles.viaGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h3 class="text-lg font-serif text-white mb-6 flex items-center gap-2 [.light-mode_&]:text-black/90">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${styles.icon}">
                                ${iconPath}
                            </svg>
                            ${item.category}
                        </h3>
                        <div class="flex flex-wrap gap-3">${skillsHtml}</div>
                    </div>
                `;
            }).join('');
        }

        if (marqueeContainer) {
            const allSkills = config.softwareKnowledge.flatMap(item => item.skills);
            const generateSpans = () => allSkills.map(skill =>
                `<span class="text-white font-mono text-xl tracking-wider [.light-mode_&]:text-black/70">${skill.toUpperCase()}</span>`
            ).join('');
            marqueeContainer.innerHTML = generateSpans() + generateSpans();
        }
    }

    const orbWidget = document.getElementById('widget-system-orb');
    const bugWidget = document.getElementById('widget-bug-portal');
    const activeWidget = config.cta.activeMicroInteraction;

    if (orbWidget && bugWidget) {
        if (activeWidget === "bugPortal") {
            bugWidget.style.display = "flex";
            orbWidget.style.display = "none";
            bugWidget.classList.add('bug-portal-moving');
            bugWidget.addEventListener('mouseenter', () => {
                bugWidget.style.animationPlayState = 'paused';
            });
            bugWidget.addEventListener('mouseleave', () => {
                bugWidget.style.animationPlayState = 'running';
            });
        } else {
            orbWidget.style.display = "block";
            bugWidget.style.display = "none";
            bugWidget.classList.remove('bug-portal-moving');
        }
    }
});

document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

function openContactPopup() {
    document.getElementById('contact-popup')?.classList.add('active');
}

function closeContactPopup() {
    document.getElementById('contact-popup')?.classList.remove('active');
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeContactPopup();
});

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

const canvas = document.getElementById('bg-particles');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    let animationId = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        const particleCount = Math.min(80, Math.max(30, Math.floor(window.innerWidth * 0.04)));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < maxDist * maxDist) {
                    const dist = Math.sqrt(distSq);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 - dist / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        if (!prefersReducedMotion) drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }

    if (prefersReducedMotion) {
        canvas.style.display = 'none';
    } else {
        window.addEventListener('resize', resize);
        resize();
        animateParticles();
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else if (!prefersReducedMotion) {
            animateParticles();
        }
    });
}

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

const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        setTheme(!document.body.classList.contains("light-mode"));
    });
}

window.addEventListener('load', () => {
    document.body.classList.remove('preload');
});
