const DRAFT_KEY = "portfolio-admin-draft-v1";

const PANEL_META = {
    profile: { title: "Profile & Contact", desc: "Name, photo paths, resume link, and socials." },
    site: { title: "Site & SEO", desc: "Browser title, meta tags, and Open Graph." },
    hero: { title: "Hero", desc: "First viewport copy, CTAs, and tool marquee." },
    about: { title: "About", desc: "About title and bio." },
    experience: { title: "Experience", desc: "Add, edit, reorder, or remove jobs." },
    education: { title: "Education", desc: "Degrees and CGPA." },
    certs: { title: "Certifications", desc: "Certificates and optional links." },
    projects: { title: "Projects", desc: "Project cards and document links." },
    skills: { title: "Skills", desc: "Skill categories and tags." },
    cta: { title: "CTA & Footer", desc: "Closing section, notice, and footer." }
};

let state = null;

function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
}

function getByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function setByPath(obj, path, value) {
    const keys = path.split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
        cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
}

function ensureShape(rawCommon, rawConfig) {
    const commonData = deepClone(rawCommon);
    const configData = deepClone(rawConfig);

    if (!configData.site) {
        configData.site = {
            name: commonData.name,
            title: `${commonData.name} | Portfolio`,
            description: "",
            author: commonData.name,
            ogTitle: `${commonData.name} | Portfolio`,
            ogDescription: "",
            ogUrl: "",
            ogImage: "",
            footerText: ""
        };
    }

    if (!configData.hero) configData.hero = {};
    configData.hero = {
        eyebrow: configData.hero.eyebrow || "",
        titleHtml: configData.hero.titleHtml || "",
        description: configData.hero.description || "",
        primaryCta: configData.hero.primaryCta || { label: "View Experience", href: "#experience" },
        secondaryCta: configData.hero.secondaryCta || { label: "Contact Me" },
        labelLeft: configData.hero.labelLeft || "",
        labelRight: configData.hero.labelRight || "",
        tools: Array.isArray(configData.hero.tools) ? configData.hero.tools : []
    };

    if (!Array.isArray(configData.education)) {
        configData.education = configData.education ? [configData.education] : [];
    }

    configData.certifications = (configData.certifications || []).map(c => ({
        title: c.title || "",
        subtitle: c.subtitle || "",
        link: c.link || ""
    }));

    configData.experience = configData.experience || [];
    configData.projects = configData.projects || [];
    configData.softwareKnowledge = (configData.softwareKnowledge || []).map(s => ({
        category: s.category || "",
        color: s.color || "sky",
        skills: Array.isArray(s.skills) ? s.skills : []
    }));

    if (!configData.cta) configData.cta = {};
    if (!configData.cta.buttonLabels) configData.cta.buttonLabels = { email: "Email", linkedin: "LinkedIn", resume: "Resume" };
    if (!configData.cta.noticeBubble) configData.cta.noticeBubble = { isVisible: true, text: "" };
    if (!configData.contactSection) configData.contactSection = { isVisible: true, title: "CONTACT", email: "", linkedin: "", github: "" };
    if (!configData.aboutMe) configData.aboutMe = { title: "", description: "" };

    return { common: commonData, config: configData };
}

function buildStateFromLive() {
    if (typeof common === "undefined" || typeof config === "undefined") {
        throw new Error("config.js failed to load. Open admin via a local server or GitHub Pages.");
    }
    return ensureShape(common, config);
}

function syncDerivedFields(data) {
    const { common: c, config: cfg } = data;
    cfg.resumeLink = c.resumeLink;
    cfg.gmail = c.email;
    cfg.mobile = c.mobile;
    cfg.socialLinks = {
        github: c.github.startsWith("http") ? c.github : `https://${c.github}`,
        linkedin: c.linkedin.startsWith("http") ? c.linkedin : `https://${c.linkedin}`,
        twitter: c.twitter
            ? (c.twitter.startsWith("http") ? c.twitter : `https://${c.twitter}`)
            : ""
    };
    cfg.cta.buttonLinks = {
        email: c.email,
        linkedin: cfg.socialLinks.linkedin,
        resume: c.resumeLink
    };
    cfg.contactSection.email = c.email;
    cfg.contactSection.linkedin = c.linkedin;
    cfg.contactSection.github = c.github;
    if (cfg.site) {
        if (!cfg.site.name) cfg.site.name = c.name;
        if (!cfg.site.author) cfg.site.author = c.name;
    }
    return data;
}

function toast(message, type = "ok") {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.className = `toast show ${type}`;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { el.className = "toast"; }, 2600);
}

function bindSimpleFields() {
    document.querySelectorAll("[data-path]").forEach(el => {
        const path = el.dataset.path;
        const value = getByPath(state, path);
        if (el.type === "checkbox") {
            el.checked = Boolean(value);
        } else if (value != null) {
            el.value = value;
        }

        const handler = () => {
            if (el.type === "checkbox") setByPath(state, path, el.checked);
            else setByPath(state, path, el.value);
            if (path.includes("profilePicture")) updatePhotoPreview();
        };
        el.oninput = handler;
        el.onchange = handler;
    });

    const toolsInput = document.getElementById("hero-tools");
    if (toolsInput) {
        toolsInput.value = (state.config.hero.tools || []).join(", ");
        toolsInput.oninput = () => {
            state.config.hero.tools = toolsInput.value
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);
        };
    }
}

function moveItem(arr, index, dir) {
    const next = index + dir;
    if (next < 0 || next >= arr.length) return;
    [arr[index], arr[next]] = [arr[next], arr[index]];
}

function renderExperience() {
    const root = document.getElementById("experience-list");
    root.innerHTML = state.config.experience.map((job, i) => `
        <div class="list-item" data-index="${i}">
            <div class="list-item-head">
                <strong>${job.role || "Untitled role"} · ${job.company || ""}</strong>
                <div class="list-tools">
                    <button type="button" class="btn btn-ghost" data-act="up">↑</button>
                    <button type="button" class="btn btn-ghost" data-act="down">↓</button>
                    <button type="button" class="btn btn-danger" data-act="del">Delete</button>
                </div>
            </div>
            <div class="grid-2">
                <label class="field">Role<input data-f="role" value="${escapeAttr(job.role)}"></label>
                <label class="field">Company<input data-f="company" value="${escapeAttr(job.company)}"></label>
                <label class="field">Location<input data-f="location" value="${escapeAttr(job.location || "")}"></label>
                <label class="field">Duration<input data-f="duration" value="${escapeAttr(job.duration || "")}"></label>
            </div>
            <label class="field bullet-list">Bullets (one per line)
                <textarea data-f="description">${escapeHtml(Array.isArray(job.description) ? job.description.join("\n") : "")}</textarea>
            </label>
        </div>
    `).join("") || `<p class="hint">No experience yet.</p>`;

    root.querySelectorAll(".list-item").forEach(item => {
        const i = Number(item.dataset.index);
        item.querySelectorAll("[data-f]").forEach(input => {
            input.oninput = () => {
                const key = input.dataset.f;
                if (key === "description") {
                    state.config.experience[i].description = input.value.split("\n").map(s => s.trimEnd()).filter(s => s.length);
                } else {
                    state.config.experience[i][key] = input.value;
                }
            };
        });
        item.querySelectorAll("[data-act]").forEach(btn => {
            btn.onclick = () => {
                const act = btn.dataset.act;
                if (act === "del") state.config.experience.splice(i, 1);
                if (act === "up") moveItem(state.config.experience, i, -1);
                if (act === "down") moveItem(state.config.experience, i, 1);
                renderExperience();
            };
        });
    });
}

function renderEducation() {
    const root = document.getElementById("education-list");
    root.innerHTML = state.config.education.map((edu, i) => `
        <div class="list-item" data-index="${i}">
            <div class="list-item-head">
                <strong>${edu.degree || "Degree"}</strong>
                <div class="list-tools">
                    <button type="button" class="btn btn-ghost" data-act="up">↑</button>
                    <button type="button" class="btn btn-ghost" data-act="down">↓</button>
                    <button type="button" class="btn btn-danger" data-act="del">Delete</button>
                </div>
            </div>
            <div class="grid-2">
                <label class="field">Degree<input data-f="degree" value="${escapeAttr(edu.degree)}"></label>
                <label class="field">Field<input data-f="field" value="${escapeAttr(edu.field)}"></label>
                <label class="field">Graduated<input data-f="graduated" value="${escapeAttr(edu.graduated || "")}"></label>
                <label class="field">CGPA<input data-f="cgpa" value="${escapeAttr(edu.cgpa || "")}"></label>
            </div>
        </div>
    `).join("") || `<p class="hint">No education yet.</p>`;

    bindListEditors(root, state.config.education, renderEducation);
}

function renderCerts() {
    const root = document.getElementById("certs-list");
    root.innerHTML = state.config.certifications.map((cert, i) => `
        <div class="list-item" data-index="${i}">
            <div class="list-item-head">
                <strong>${cert.title || "Certificate"}</strong>
                <div class="list-tools">
                    <button type="button" class="btn btn-ghost" data-act="up">↑</button>
                    <button type="button" class="btn btn-ghost" data-act="down">↓</button>
                    <button type="button" class="btn btn-danger" data-act="del">Delete</button>
                </div>
            </div>
            <div class="grid-2">
                <label class="field">Title<input data-f="title" value="${escapeAttr(cert.title)}"></label>
                <label class="field">Subtitle<input data-f="subtitle" value="${escapeAttr(cert.subtitle)}"></label>
            </div>
            <label class="field">Link (optional)<input data-f="link" value="${escapeAttr(cert.link || "")}"></label>
        </div>
    `).join("") || `<p class="hint">No certifications yet.</p>`;

    bindListEditors(root, state.config.certifications, renderCerts);
}

function renderProjects() {
    const root = document.getElementById("projects-list");
    root.innerHTML = state.config.projects.map((p, i) => `
        <div class="list-item" data-index="${i}">
            <div class="list-item-head">
                <strong>${p.title || "Project"}</strong>
                <div class="list-tools">
                    <button type="button" class="btn btn-ghost" data-act="up">↑</button>
                    <button type="button" class="btn btn-ghost" data-act="down">↓</button>
                    <button type="button" class="btn btn-danger" data-act="del">Delete</button>
                </div>
            </div>
            <label class="field">Title<input data-f="title" value="${escapeAttr(p.title)}"></label>
            <label class="field">Description<textarea data-f="description">${escapeHtml(p.description || "")}</textarea></label>
            <label class="field">Link<input data-f="link" value="${escapeAttr(p.link || "")}"></label>
        </div>
    `).join("") || `<p class="hint">No projects yet.</p>`;

    bindListEditors(root, state.config.projects, renderProjects);
}

function renderSkills() {
    const root = document.getElementById("skills-list");
    const colors = ["sky", "cyan", "orange", "purple", "blue", "pink"];
    root.innerHTML = state.config.softwareKnowledge.map((s, i) => `
        <div class="list-item" data-index="${i}">
            <div class="list-item-head">
                <strong>${s.category || "Category"}</strong>
                <div class="list-tools">
                    <button type="button" class="btn btn-ghost" data-act="up">↑</button>
                    <button type="button" class="btn btn-ghost" data-act="down">↓</button>
                    <button type="button" class="btn btn-danger" data-act="del">Delete</button>
                </div>
            </div>
            <div class="grid-2">
                <label class="field">Category<input data-f="category" value="${escapeAttr(s.category)}"></label>
                <label class="field">Color
                    <select data-f="color">
                        ${colors.map(c => `<option value="${c}" ${s.color === c ? "selected" : ""}>${c}</option>`).join("")}
                    </select>
                </label>
            </div>
            <label class="field">Skills (comma-separated)
                <textarea data-f="skills">${escapeHtml((s.skills || []).join(", "))}</textarea>
            </label>
        </div>
    `).join("") || `<p class="hint">No skill categories yet.</p>`;

    root.querySelectorAll(".list-item").forEach(item => {
        const i = Number(item.dataset.index);
        item.querySelectorAll("[data-f]").forEach(input => {
            input.oninput = input.onchange = () => {
                const key = input.dataset.f;
                if (key === "skills") {
                    state.config.softwareKnowledge[i].skills = input.value.split(",").map(x => x.trim()).filter(Boolean);
                } else {
                    state.config.softwareKnowledge[i][key] = input.value;
                }
            };
        });
        item.querySelectorAll("[data-act]").forEach(btn => {
            btn.onclick = () => {
                const act = btn.dataset.act;
                if (act === "del") state.config.softwareKnowledge.splice(i, 1);
                if (act === "up") moveItem(state.config.softwareKnowledge, i, -1);
                if (act === "down") moveItem(state.config.softwareKnowledge, i, 1);
                renderSkills();
            };
        });
    });
}

function bindListEditors(root, arr, rerender) {
    root.querySelectorAll(".list-item").forEach(item => {
        const i = Number(item.dataset.index);
        item.querySelectorAll("[data-f]").forEach(input => {
            input.oninput = () => { arr[i][input.dataset.f] = input.value; };
        });
        item.querySelectorAll("[data-act]").forEach(btn => {
            btn.onclick = () => {
                const act = btn.dataset.act;
                if (act === "del") arr.splice(i, 1);
                if (act === "up") moveItem(arr, i, -1);
                if (act === "down") moveItem(arr, i, 1);
                rerender();
            };
        });
    });
}

function escapeAttr(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function updatePhotoPreview() {
    const img = document.getElementById("photo-preview");
    const path = state.config.profilePicture || "profile.jpg";
    if (img.dataset.local === "1") return;
    img.src = path.startsWith("http") || path.startsWith("data:") ? path : `../${path}`;
}

function refreshUI() {
    bindSimpleFields();
    renderExperience();
    renderEducation();
    renderCerts();
    renderProjects();
    renderSkills();
    updatePhotoPreview();
}

function generateConfigJs(data) {
    syncDerivedFields(data);
    const commonJs = JSON.stringify(data.common, null, 4);
    const configJs = JSON.stringify(data.config, null, 4);
    return `// Shared Constants for easier updates
// Generated by Portfolio Customisation admin — ${new Date().toISOString().slice(0, 10)}
const common = ${commonJs};

const config = ${configJs};
`;
}

function downloadConfig() {
    try {
        const content = generateConfigJs(state);
        const blob = new Blob([content], { type: "text/javascript;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "config.js";
        a.click();
        URL.revokeObjectURL(url);
        toast("Downloaded config.js — replace the file in your repo root, then push.");
    } catch (err) {
        console.error(err);
        toast("Failed to generate config.js", "err");
    }
}

function saveDraft() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    toast("Draft saved in this browser.");
}

function loadDraft() {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) {
        toast("No draft found in this browser.", "err");
        return;
    }
    try {
        const parsed = JSON.parse(raw);
        state = ensureShape(parsed.common, parsed.config);
        refreshUI();
        toast("Draft loaded.");
    } catch {
        toast("Draft is corrupted.", "err");
    }
}

function resetLive() {
    state = buildStateFromLive();
    document.getElementById("photo-preview").dataset.local = "";
    refreshUI();
    toast("Reset to live config.js");
}

function importFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const text = String(reader.result);
            let parsed;
            if (file.name.endsWith(".json")) {
                parsed = JSON.parse(text);
            } else {
                // Evaluate a downloaded config.js in a sandbox function
                const fn = new Function(`${text}\n; return { common, config };`);
                parsed = fn();
            }
            if (!parsed.common || !parsed.config) throw new Error("Missing common/config");
            state = ensureShape(parsed.common, parsed.config);
            document.getElementById("photo-preview").dataset.local = "";
            refreshUI();
            toast("Imported successfully.");
        } catch (err) {
            console.error(err);
            toast("Import failed. Use a valid config.js or {common,config} JSON.", "err");
        }
    };
    reader.readAsText(file);
}

function showPanel(id) {
    document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === `panel-${id}`));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.panel === id));
    const meta = PANEL_META[id];
    if (meta) {
        document.getElementById("panel-title").textContent = meta.title;
        document.getElementById("panel-desc").textContent = meta.desc;
    }
}

function init() {
    try {
        state = buildStateFromLive();
    } catch (err) {
        document.querySelector(".main").innerHTML = `<div class="card"><h2>Could not load config</h2><p class="hint">${err.message}</p></div>`;
        return;
    }

    refreshUI();

    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => showPanel(btn.dataset.panel));
    });

    document.getElementById("btn-download").onclick = downloadConfig;
    document.getElementById("btn-download-top").onclick = downloadConfig;
    document.getElementById("btn-save-draft").onclick = saveDraft;
    document.getElementById("btn-load-draft").onclick = loadDraft;
    document.getElementById("btn-reset").onclick = resetLive;

    document.getElementById("btn-import").onclick = () => document.getElementById("import-file").click();
    document.getElementById("import-file").onchange = (e) => {
        const file = e.target.files?.[0];
        if (file) importFile(file);
        e.target.value = "";
    };

    document.getElementById("btn-add-experience").onclick = () => {
        state.config.experience.push({
            role: "New Role",
            company: "Company",
            location: "",
            duration: "",
            description: ["Achievement or responsibility"]
        });
        renderExperience();
    };

    document.getElementById("btn-add-education").onclick = () => {
        state.config.education.push({
            degree: "Degree",
            field: "Field of study",
            graduated: "Graduated 20XX",
            cgpa: ""
        });
        renderEducation();
    };

    document.getElementById("btn-add-cert").onclick = () => {
        state.config.certifications.push({ title: "New Certificate", subtitle: "Issuer / type", link: "" });
        renderCerts();
    };

    document.getElementById("btn-add-project").onclick = () => {
        state.config.projects.push({ title: "New Project", description: "Short description", link: "" });
        renderProjects();
    };

    document.getElementById("btn-add-skill").onclick = () => {
        state.config.softwareKnowledge.push({ category: "New Category", color: "sky", skills: ["Skill one"] });
        renderSkills();
    };

    document.getElementById("btn-pick-photo").onclick = () => document.getElementById("photo-file").click();
    document.getElementById("photo-file").onchange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.getElementById("photo-preview");
            img.src = reader.result;
            img.dataset.local = "1";
            toast("Preview only — replace profile.jpg / profile.webp in the repo to publish.");
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    // Auto-load draft if present
    if (localStorage.getItem(DRAFT_KEY)) {
        // silent availability — user can click Load draft
    }
}

init();
