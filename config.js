// Shared Constants for easier updates
const common = {
    name: "Ameen S R",
    email: "ameenchirayil@gmail.com",
    mobile: "+91 8281331205",
    resumeLink: "https://drive.google.com/file/d/1_UdfrYuiKovGcBepp_fZbCxy5-MRnQnS/view?usp=drive_link",
    linkedin: "www.linkedin.com/in/ameensr/",
    github: "github.com/ameensr",
    twitter: "#"
};

const config = {
    // Core Info
    resumeLink: common.resumeLink,
    gmail: common.email,
    mobile: common.mobile,
    profilePicture: "profile.jpg",

    hero: {
        description: "Software QA Engineer | Manual & Automation Tester<br>3+ years ensuring bug-free, scalable applications through quality-driven testing"
    },
    aboutMe: {
        title: "I turn assumptions into verified facts, <br> <span class='text-white/50'>and code into quality.</span>",
        description: `I'm <strong>${common.name}</strong> — a detail-obsessed QA Engineer who finds bugs before your users do. 
        With <strong>3+ years</strong> of hands-on experience in manual and automation testing.
        <br><br>
        Whether it’s functional testing, database validation, UI checks, or security assurance — I don’t 
        just test. I challenge software to prove its worth.`
    },
    socialLinks: {
        github: `https://${common.github}`,
        linkedin: `https://${common.linkedin}`,
        twitter: common.twitter
    },
    cta: {
        title: "Ready to start your <span class=\"opacity-60 italic\">next project?</span>",
        subtitle: "I might be the teammate you’re looking for.",
        description: "From breaking bugs to building ideas, I bring 3+ years of QA expertise, documentation skills, and an eye for details that matter.<br><br>Curious about what I can do? My resume says the rest.",
        activeMicroInteraction: "bugPortal", // Options: "systemOrb" or "bugPortal"
        showNoticePeriod: true, // Set to false to hide the box completely
        noticePeriod: "Open to Software QA / Test Engineer opportunities",
        buttonLabels: {
            email: "Email",
            linkedin: "LinkedIn",
            resume: "Resume"
        },
        buttonLinks: {
            email: common.email,
            linkedin: `https://${common.linkedin}`,
            resume: common.resumeLink
        },
        noticeBubble: {
            isVisible: true, // Set to false to hide the noticeBubble
            text: "Open to Remote / Hybrid / On-site international roles, Willing to relocate or work across time zones"
        }
    },
    projects: [
        {
            title: "Work Sample 1",
            description: "View detailed project documentation and reports",
            link: "https://drive.google.com/file/d/12kGZzTMA0xcLMZSs6BjNfvvqhNwJ2ImN/view?usp=drive_link"
        },
        {
            title: "Work Sample 2",
            description: "Check out the test strategy and execution logs",
            link: "https://drive.google.com/file/d/12kGZzTMA0xcLMZSs6BjNfvvqhNwJ2ImN/view?usp=drive_link"
        }
    ],
    contactSection: {
        isVisible: true,
        title: "CONTACT",
        email: common.email,
        linkedin: common.linkedin,
        github: common.github
    },
    softwareSubtitle: "QA-Focused Engineer | Manual Testing Expert | Automation & AI-Assisted Development Learner",
    softwareKnowledge: [
        {
            category: "Quality Assurance & Testing",
            skills: ["Manual Testing", "Functional, Regression & Smoke Testing", "Test Case Design & Execution", "Defect Tracking & Management", "JIRA", "Postman (API Testing)", "Selenium WebDriver", "TestNG", "JMeter (Basic)", "Git / GitHub", "SVN"]
        },
        {
            category: "Automation, Development & AI-Assisted Building",
            skills: ["Java (Core Basics)", "Selenium Automation (Learning / Hands-on)", "Antigravity IDE (AI-assisted development)", "Vibe Coding (Prompt-driven UI & logic generation)", "Eclipse", "Visual Studio Code"]
        },
        {
            category: "Database & Backend Validation",
            skills: ["SQL", "MySQL", "Database Testing & Data Validation"]
        },
        {
            category: "Engineering & Design Tools",
            skills: ["AutoCAD", "Revit (MEP – Basic)", "Pipe Sizer"]
        },
        {
            category: "Productivity & Collaboration",
            skills: ["Microsoft Excel", "Microsoft Word", "Google Workspace"]
        },
        {
            category: "Creative & Visual Tools",
            skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro", "Adobe After Effects", "Figma"]
        }
    ]
};


