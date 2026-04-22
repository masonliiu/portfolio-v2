"use client";

export default function FixedFooter() {
  return (
    <div className="fixed-footer" aria-label="Footer links">
      <div className="fixed-footer__links">
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
      <div className="fixed-footer__mark">Mason Liu™ {new Date().getFullYear()}</div>
      <div className="fixed-footer__spacer" aria-hidden="true" />
    </div>
  );
}
