import { useState } from 'react'
import weddingHero from '../assets/wedding/wedding-hero.png'
import weddingStory from '../assets/wedding/wedding-story.png'
import weddingCountdown from '../assets/wedding/wedding-countdown.png'

const PROJECTS = [
  {
    tag: 'Wedding website',
    title: 'Wedding invitation website',
    description:
      "A digital wedding invitation with a countdown, our-story timeline, venue details, photo gallery, and a built-in RSVP form — the kind of site we build for clients planning their big day.",
    stack: ['React', 'Vite', 'RSVP form', 'Netlify'],
    demoUrl: 'https://neon-kheer-224786.netlify.app/#rsvp',
    previews: [weddingHero, weddingStory, weddingCountdown],
  },
  {
    tag: 'Web app',
    title: 'Inventory management platform',
    description:
      'A full inventory system with role-based access for store keepers and managers, plus a material request and approval workflow, built in an industrial-themed UI.',
    stack: ['React', 'Node.js', 'MongoDB Atlas', 'Tailwind CSS'],
  },
  {
    tag: 'Mobile + web',
    title: 'Freelance gig marketplace',
    description:
      'A cross-platform marketplace connecting freelancers with clients, built on a shared design token system with a strict, reusable component architecture.',
    stack: ['React Native', 'Expo', 'NativeWind', 'MongoDB'],
  },
  {
    tag: 'UI/UX',
    title: 'Hospital appointment booking app',
    description:
      'Booking flows designed for three separate user roles — patients, staff, and doctors — mapped screen by screen before a single line of code was written.',
    stack: ['Figma', 'UI/UX design', 'Mobile-first'],
  },
  {
    tag: 'Web app',
    title: 'Food donation platform',
    description:
      'A four-role donation platform (donors, recipients, drivers, admins) taken from interactive prototypes to a fully mapped, screen-accurate build.',
    stack: ['React', 'Responsive design', 'Multi-role UX'],
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  const closeModal = () => setActiveProject(null)

  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Selected work</div>
          <h2>A few things we've shipped</h2>
          <p>
            Real builds across web and mobile, spanning inventory, marketplace,
            healthcare, and social-impact products.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => {
            const hasDemo = Boolean(project.demoUrl)
            return (
              <article
                className={`project-card${hasDemo ? ' project-card-interactive' : ''}`}
                key={project.title}
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
                  {project.stack.map((tech) => (
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

            {activeProject.previews && (
              <div className="project-modal-gallery">
                {activeProject.previews.map((src, i) => (
                  <img
                    key={src}
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
