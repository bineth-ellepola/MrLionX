import Project from '../models/Project.js'
import Plan from '../models/Plan.js'

// The site's original hardcoded content. Image paths point at the frontend's
// public/images folder, so they resolve on the Vercel site.
export const DEFAULT_PROJECTS = [
  {
    tag: 'Wedding website',
    title: 'Wedding invitation website',
    description:
      "A digital wedding invitation with a countdown, our-story timeline, venue details, photo gallery, and a built-in RSVP form — the kind of site we build for clients planning their big day.",
    stack: ['React', 'Vite', 'RSVP form', 'Netlify'],
    demoUrl: 'https://neon-kheer-224786.netlify.app/#rsvp',
    images: [
      '/images/wedding/wedding-hero.png',
      '/images/wedding/wedding-story.png',
      '/images/wedding/wedding-countdown.png',
    ],
    order: 1,
  },
  {
    tag: 'Birthday website',
    title: 'Birthday invitation website',
    description:
      'A vibrant birthday invitation with event details, an evening timeline, a memories gallery, and a built-in RSVP form — the kind of site we build for clients celebrating a milestone.',
    stack: ['React', 'Vite', 'RSVP form', 'Netlify'],
    demoUrl: 'https://lively-valkyrie-c1d794.netlify.app',
    images: [
      '/images/birthday/bday-hero.png',
      '/images/birthday/bday-details.png',
      '/images/birthday/bday-timeline.png',
    ],
    order: 2,
  },
  {
    tag: 'Party website',
    title: 'Get-together event website',
    description:
      'A stylish event page for a casual get-together, with event details, a location map, and an RSVP form — the kind of site we build for clients hosting any kind of party.',
    stack: ['React', 'Vite', 'RSVP form', 'Netlify'],
    demoUrl: 'https://illustrious-sundae-37527d.netlify.app',
    images: [
      '/images/party/party-hero.png',
      '/images/party/party-details.png',
      '/images/party/party-location.png',
    ],
    order: 3,
  },
]

export const DEFAULT_PLANS = [
  {
    name: 'Wedding Website',
    image: '/images/plans/wedding.svg',
    note: 'A beautiful site for your big day',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: ['Our story & photo gallery', 'Event date, time & venue details', 'RSVP form', '1 round of revisions'],
    cta: 'Get started',
    featured: true,
    order: 1,
  },
  {
    name: 'Birthday Website',
    image: '/images/plans/birthday.svg',
    note: 'A fun page to celebrate the day',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: ['Celebrant photos & gallery', 'Party details & countdown', 'RSVP form', '1 round of revisions'],
    cta: 'Get started',
    featured: false,
    order: 2,
  },
  {
    name: 'Party Website',
    image: '/images/plans/party.svg',
    note: 'A simple site for any celebration',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: ['Event details & schedule', 'Photo gallery', 'RSVP form', '1 round of revisions'],
    cta: 'Get started',
    featured: false,
    order: 3,
  },
]

// Inserts the defaults into any collection that is still empty. Never overwrites.
export async function seedDefaults() {
  const result = { projects: 0, plans: 0 }
  if ((await Project.estimatedDocumentCount()) === 0) {
    result.projects = (await Project.insertMany(DEFAULT_PROJECTS)).length
  }
  if ((await Plan.estimatedDocumentCount()) === 0) {
    result.plans = (await Plan.insertMany(DEFAULT_PLANS)).length
  }
  return result
}
