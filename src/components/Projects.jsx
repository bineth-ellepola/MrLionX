import { useState } from 'react'
import useContent from '../lib/useContent.js'
import { DEFAULT_PROJECTS } from '../data/defaults.js'

export default function Projects() {
  const projects = useContent('/api/projects', DEFAULT_PROJECTS)
  const [activeProject, setActiveProject] = useState(null)

  const closeModal = () => setActiveProject(null)

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Selected work</div>
          <h2>A few things we've shipped</h2>
          <p>
            Live invitation sites we build for clients celebrating weddings,
            birthdays, and other milestones — tap a card for a closer look.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const hasDemo = Boolean(project.demoUrl)
            return (
              <article
                className={`project-card${hasDemo ? ' project-card-interactive' : ''}`}
                key={project._id || project.title}
                onClick={hasDemo ? () => setActiveProject(project) : undefined}
                role={hasDemo ? 'button' : undefined}
                tabIndex={hasDemo ? 0 : undefined}
                onKeyDown={
                  hasDemo
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setActiveProject(project)
                        }
                      }
                    : undefined
                }
              >
                <div className="project-top">
                  <h3>{project.title}</h3>
                  <span className="project-tag">{project.tag}</span>
                </div>
                <p>{project.description}</p>
                <ul className="project-stack">
                  {(project.stack || []).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                {hasDemo && <span className="project-view-link">View live demo →</span>}
              </article>
            )
          })}
        </div>
      </div>

      {activeProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="project-modal-close" aria-label="Close" onClick={closeModal}>
              ×
            </button>
            <h3 id="project-modal-title">{activeProject.title}</h3>
            <p>{activeProject.description}</p>

            {activeProject.images?.length > 0 && (
              <div className="project-modal-gallery">
                {activeProject.images.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt={`${activeProject.title} preview ${i + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <a
              href={activeProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open live demo
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
