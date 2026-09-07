const PROJECTS = [
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
          {PROJECTS.map((project) => (
            <article className="project-card" key={project.title}>
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
