export default function AboutContent() {
  return (
    <section className="section-block" data-reveal>
      <div className="section-center space-y-6">
        <p className="section-kicker">About</p>
        <h1
          className="section-title outline-fill blob-text"
          data-fill
          data-blob-text="Mason Liu."
        >
          Mason Liu.
        </h1>
        <p className="section-subtitle">
          CS @ UTD. Product systems, game logic, runtime experiments, and
          physical interfaces.
        </p>
      </div>

      <div className="mt-10 max-w-2xl space-y-5 text-[1rem] leading-relaxed text-[var(--muted)]">
        <p>
          I build software and interactive systems where the mechanics matter.
          The work ranges from full-stack products to game systems, low-level
          runtime studies, and hardware-driven interface experiments.
        </p>
        <p>
          The common thread is straightforward: build something concrete, make
          the internals legible, and push past the default implementation.
        </p>
      </div>

      <div className="chip-row mt-10">
        <span>Dallas, TX</span>
        <span>CS @ UTD</span>
        <span>Systems</span>
        <span>Interfaces</span>
      </div>

      <div className="hero-cta mt-10">
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
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          data-magnet
          data-cursor="Resume"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
