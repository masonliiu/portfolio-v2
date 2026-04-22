"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { projects } from "@/lib/projects";

type WorkFocusProps = {
  className?: string;
  id?: string;
};

export default function WorkFocus({ className, id }: WorkFocusProps) {
  const [activeProjectSlug, setActiveProjectSlug] = useState(projects[0]?.slug ?? "");
  const activeProject =
    projects.find((project) => project.slug === activeProjectSlug) ?? projects[0];

  if (!activeProject) return null;

  return (
    <section id={id} className={className} data-reveal>
      <div className="work-focus">
        <h2
          className="section-title outline-fill blob-text"
          data-fill
          data-blob-text="Projects."
        >
          Projects.
        </h2>
        <div className="work-focus__grid">
          <div className="work-focus__list">
            {projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                className={`work-focus__item ${
                  project.slug === activeProject.slug ? "is-active" : ""
                }`}
                onClick={() => setActiveProjectSlug(project.slug)}
              >
                <span className="work-meta">{project.createdAt}</span>
                <span className="work-focus__title">{project.title}</span>
                <span className="work-focus__preview">{project.summary}</span>
              </button>
            ))}
          </div>
          <div className="work-focus__detail" aria-live="polite">
            <p className="work-meta">{activeProject.repo}</p>
            <h3 className="work-focus__headline">{activeProject.title}</h3>
            <p className="work-focus__summary">{activeProject.summary}</p>
            <div className="work-focus__sections">
              {activeProject.sections.slice(0, 3).map((section) => (
                <div key={section.title} className="work-focus__section">
                  <h4>{section.title}</h4>
                  {section.body ? <p>{section.body[0]}</p> : null}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.slice(0, 2).map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="work-tags">
              {activeProject.tags.slice(0, 6).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero-cta">
              <Link href={`/projects/${activeProject.slug}`}>Read case study</Link>
              {activeProject.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Link
          className="work-meta inline-flex"
          href="/projects"
        >
          Full archive
        </Link>
      </div>
    </section>
  );
}
