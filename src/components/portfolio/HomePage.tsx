"use client";

import WorkFocus from "@/components/portfolio/WorkFocus";

const heroLines = ["Systems", "products", "interfaces"];

const workAreas = [
  {
    title: "Product Systems",
    body:
      "End-to-end software with real operational constraints: checkout, fulfillment, admin flows, persistence, and reliability.",
  },
  {
    title: "Game Systems",
    body:
      "Combat loops, progression, targeting, and state-heavy gameplay logic built to feel coherent under pressure.",
  },
  {
    title: "Runtime Experiments",
    body:
      "Low-level and systems-oriented projects that expose the internals instead of hiding them behind abstractions.",
  },
  {
    title: "Physical Interfaces",
    body:
      "Hardware, sensing, haptics, and interaction design work that treats feedback and perception as system design problems.",
  },
];

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero-stage" data-reveal>
        <div className="hero-grid">
          <div>
            <p className="hero-kicker blob-text" data-blob-text="Mason Liu">
              Mason Liu
            </p>
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
              UT Dallas CS student building product systems, game logic,
              runtime experiments, and physical interfaces.
            </p>
            <div className="hero-cta hero-cta--center">
              <a href="/resume.pdf" target="_blank" rel="noreferrer" data-magnet>
                Resume
              </a>
              <a
                href="https://github.com/masonliiu"
                target="_blank"
                rel="noreferrer"
                data-magnet
              >
                GitHub
              </a>
              <a href="mailto:liumasn@gmail.com" data-magnet>
                Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="about" data-reveal>
        <div className="section-grid">
          <div>
            <p className="hero-kicker blob-text" data-blob-text="About">About</p>
            <h2
              className="section-title outline-fill blob-text"
              data-fill
              data-blob-text="Software systems. Physical thinking."
            >
              Software systems. Physical thinking.
            </h2>
          </div>
          <div className="section-content">
            <p className="section-subtitle">
              I build across software, games, low-level experiments, and
              interaction hardware. The throughline is consistent: systems with
              real mechanics, clear constraints, and behavior that has to hold
              up under use.
            </p>
            <p className="section-subtitle">
              I am not trying to present as one narrow role. The value is in how
              these projects connect: product architecture, gameplay logic,
              memory models, sensing, actuation, and interfaces that need more
              than surface polish.
            </p>
          </div>
        </div>
      </section>

      <WorkFocus id="work" className="section-block work-section" />

      <section className="section-block" id="areas" data-reveal>
        <div className="section-grid">
          <div>
            <p className="section-kicker">Work areas</p>
            <h2
              className="section-title outline-fill blob-text"
              data-fill
              data-blob-text="Range with a throughline."
            >
              Range with a throughline.
            </h2>
          </div>
          <div className="section-content">
            <p className="section-subtitle">
              The work spans different mediums, but it is not random. Each area
              shows the same habit of thinking through mechanics, constraints,
              and system behavior.
            </p>
            <div className="area-grid">
              {workAreas.map((area) => (
                <div key={area.title} className="area-card">
                  <p className="work-meta">{area.title}</p>
                  <p>{area.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block" id="contact" data-reveal>
        <div className="section-grid">
          <div>
            <p className="section-kicker">Contact</p>
          <h2
            className="section-title outline-fill blob-text"
            data-fill
            data-blob-text="Open to strong work."
          >
            Open to strong work.
          </h2>
          </div>
          <div className="section-content">
            <p className="section-subtitle">
              Open to internships, full-time roles, and projects where systems,
              interaction, and technical depth actually matter.
            </p>
            <div className="contact-actions">
              <a href="mailto:liumasn@gmail.com" data-magnet data-cursor="Email">
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/masonliiu/"
                target="_blank"
                rel="noreferrer"
                data-magnet
                data-cursor="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/masonliiu"
                target="_blank"
                rel="noreferrer"
                data-magnet
                data-cursor="GitHub"
              >
                GitHub
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" data-magnet>
                Resume
              </a>
            </div>
            <p className="footer-inline">© {new Date().getFullYear()} Mason Liu</p>
          </div>
        </div>
      </section>
    </main>
  );
}
