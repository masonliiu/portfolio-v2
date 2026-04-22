"use client";

import ContributionGraph from "@/components/portfolio/ContributionGraph";
import GitHubActivity from "@/components/portfolio/GitHubActivity";
import WorkFocus from "@/components/portfolio/WorkFocus";

const heroLines = ["Software", "game systems", "interfaces"];

const experienceItems = [
  {
    title: "Multimodal Interaction (MI) Lab",
    meta: "Richardson, Texas",
    roles: [
      {
        title: "Research Software Engineer",
        meta: "Full-time · Apr 2026 - Present",
        body:
          "Research software engineer working on haptics and multimodal interaction systems.",
      },
      {
        title: "Research Software Engineer Intern",
        meta: "Internship · Jan 2026 - Apr 2026",
        body:
          "Incoming intern at the Multimodal Interaction (MI) Lab under Dr. Jin Ryong Kim.",
      },
    ],
  },
  {
    title: "Mase Labs",
    meta: "Dallas, Texas",
    roles: [
      {
        title: "Full Stack Developer",
        meta: "Freelance · Oct 2025 - Jan 2026",
        body:
          "Worked with a small team to build and maintain a full-stack commerce and fulfillment platform for a startup, delivering a React storefront, Stripe checkout, and automated order processing.",
      },
      {
        title: "Results",
        meta: "Platform metrics",
        body:
          "Processed 150+ monthly orders end-to-end with 99.97% fulfillment success and sub-10s median order creation-to-queue time.",
      },
      {
        title: "Architecture",
        meta: "Backend and operations",
        body:
          "Designed dual backend architecture with Express and SQLite for local development and serverless Postgres for production. Implemented webhook-driven payment confirmation, background workers, retries, status tracking, and email notifications to ensure reliable fulfillment.",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero-stage" data-reveal>
        <div className="hero-grid">
          <div>
            <h1 className="hero-name">Mason Liu</h1>
            <div className="hero-stack" data-hero>
              <div className="hero-text" data-blob-target>
                {heroLines.map((line) => (
                  <span
                    key={line}
                    className="blob-text"
                    data-blob-text={line}
                    data-blob-target
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <p
              className="hero-subline blob-text"
              data-blob-text="Computer Science @ UTD"
            >
              Computer Science @ UTD
            </p>
            <p className="hero-subline blob-text" data-blob-text="Dallas, TX">
              Dallas, TX
            </p>
            <p className="hero-summary">
              Computer Science student at UT Dallas building software, game
              systems, and interface work.
            </p>
          </div>
        </div>
      </section>

      <WorkFocus id="projects" className="section-block work-section" />

      <section className="section-block" id="experience" data-reveal>
        <div className="section-center section-center--wide">
          <h2
            className="section-title outline-fill blob-text"
            data-fill
            data-blob-text="Experience."
          >
            Experience.
          </h2>
          <div className="experience-list">
            {experienceItems.map((item) => (
              <article key={item.title} className="experience-item">
                <div className="experience-item__top">
                  <h3>{item.title}</h3>
                  <span>{item.meta}</span>
                </div>
                <div className="experience-role-list">
                  {item.roles.map((role) => (
                    <div key={`${item.title}-${role.title}`} className="experience-role">
                      <div className="experience-role__top">
                        <h4>{role.title}</h4>
                        <span>{role.meta}</span>
                      </div>
                      <p>{role.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block" id="contact" data-reveal>
        <div className="section-grid">
          <div>
            <h2
              className="section-title outline-fill blob-text"
              data-fill
              data-blob-text="Contact."
            >
              Contact.
            </h2>
          </div>
          <div className="section-content">
            <p className="section-subtitle">
              Email, LinkedIn, GitHub, and resume are below. Recent commits and
              contributions are included here.
            </p>
            <div className="signal-cluster">
              <GitHubActivity />
              <ContributionGraph />
            </div>
          </div>
        </div>
      </section>
      <div className="home-links" aria-label="Contact links">
        <a href="mailto:liumasn@gmail.com">Email</a>
        <a
          href="https://www.linkedin.com/in/masonliiu/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/masonliiu"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>
      </div>
      <div className="home-mark">TM {new Date().getFullYear()} Mason Liu</div>
    </main>
  );
}
