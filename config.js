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
        description: `I'm <strong>${common.name}</strong> — a detail-obsessed QA Engineer who finds bugs before your clients do. 
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
        noticePeriod: "Building reliable software through structured testing and quality-driven practices",
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
            text: "Interested in global software quality standards and international best practices"
        }
    },
    projects: [
        {
            title: "Sample Test Case",
            description: "View detailed project documentation and reports",
            link: "https://drive.google.com/file/d/1Z9N5AhVImsHTfqaXm2VUdSxHrM9_NNlA/view?usp=drive_link"
        },
        {
            title: "Sample Bug Report",
            description: "Check out the test strategy and execution logs",
            link: "https://drive.google.com/file/d/1foJB2ZHNhzoKRJpvRhjPkXsafPYys_Il/view?usp=drive_link"
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
    ],
    experience: [
        {
            role: "QA Engineer",
            company: "Ospyn Technologies Ltd",
            location: "Trivandrum, Kerala",
            duration: "2022 – Present",
            description: [
                "Designed and executed <strong>1500+ comprehensive test cases</strong> to ensure full software functionality.",
                "Reduced <strong>defect leakage by 15%</strong> through rigorous manual and regression testing protocols.",
                "Boosted test execution <strong>efficiency by 20%</strong> by automating high-volume tests with Selenium.",
                "Managed the full lifecycle for <strong>2000+ defects using JIRA</strong> in fast-paced Agile/Scrum sprints.",
                "Mentored <strong>3+ junior testers</strong>, elevating team proficiency in advanced test case development.",
                "Pioneered the adoption of <strong>AI-driven prompt testing</strong> to validate ML model performance.",
                "Verified data integrity by executing custom <strong>SQL queries</strong> against backend databases.",
                "Partnered with developers and product teams to ensure <strong>quality standards</strong> were met.",
                "Contributed to all phases of the <strong>SDLC</strong>, from requirements analysis to release validation.",
                "Ensured a seamless user experience by performing detailed <strong>UI and usability testing</strong>."
            ]
        }
    ],
};


