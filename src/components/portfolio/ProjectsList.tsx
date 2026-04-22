"use client";

import { Link } from "next-view-transitions";
import { projects } from "@/lib/projects";

export default function ProjectsList() {
  const sortedProjects = [...projects].sort((a, b) =>
    b.createdAtISO.localeCompare(a.createdAtISO)
  );

  return (
    <section className="section-block" data-reveal>
      <div className="section-center space-y-4">
        <h1
          className="section-title outline-fill blob-text"
          data-fill
          data-blob-text="Projects."
        >
          Projects.
        </h1>
        <p className="section-subtitle">All projects in one place.</p>
      </div>

      <div className="archive-stack mt-12">
        <div className="archive-grid">
          {sortedProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="archive-card"
              data-reveal
            >
              <div className="archive-card__top">
                <span className="work-meta">{project.createdAt}</span>
                <span className="work-meta">{project.repo}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="work-tags">
                {project.tags.slice(0, 5).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
