const IMAGE_HELP =
  'Upload an image, or paste a full URL (https://...) or a path from this site, e.g. /images/wedding/wedding-hero.png'

export const PROJECTS_CONFIG = {
  title: 'Projects',
  resource: 'projects',
  singular: 'project',
  emptyItem: { title: '', tag: '', description: '', demoUrl: '', images: [''], stack: [], published: true },
  summary: (p) => ({ title: p.title, subtitle: p.tag, image: p.images?.[0] }),
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Wedding invitation website' },
    { name: 'tag', label: 'Tag', type: 'text', placeholder: 'Wedding website' },
    { name: 'description', label: 'Description', type: 'textarea', wide: true },
    { name: 'demoUrl', label: 'Live demo URL', type: 'text', placeholder: 'https://...', wide: true },
    { name: 'images', label: 'Preview images', type: 'imageList', placeholder: 'https://...', help: IMAGE_HELP, wide: true },
    { name: 'stack', label: 'Tech / highlights', type: 'list', placeholder: 'React' },
    { name: 'order', label: 'Display order', type: 'number', help: 'Lower numbers show first.' },
    { name: 'published', label: 'Show on website', type: 'checkbox' },
  ],
}

export const PLANS_CONFIG = {
  title: 'Pricing packages',
  resource: 'plans',
  singular: 'package',
  emptyItem: { name: '', price: '', unit: 'all inclusive', note: '', image: '', features: [''], cta: 'Get started', featured: false, published: true },
  summary: (p) => ({ title: p.name, subtitle: `${p.price} ${p.unit || ''}`.trim(), image: p.image }),
  fields: [
    { name: 'name', label: 'Package name', type: 'text', required: true, placeholder: 'Wedding Website' },
    { name: 'price', label: 'Price', type: 'text', required: true, placeholder: 'Rs.5000' },
    { name: 'unit', label: 'Price label', type: 'text', placeholder: 'all inclusive' },
    { name: 'note', label: 'Short description', type: 'text', placeholder: 'A beautiful site for your big day' },
    { name: 'image', label: 'Image', type: 'image', placeholder: 'https://...', help: IMAGE_HELP, wide: true },
    { name: 'features', label: "What's included", type: 'list', placeholder: 'RSVP form', wide: true },
    { name: 'cta', label: 'Button text', type: 'text', placeholder: 'Get started' },
    { name: 'order', label: 'Display order', type: 'number', help: 'Lower numbers show first.' },
    { name: 'featured', label: 'Highlight as "Most requested"', type: 'checkbox' },
    { name: 'published', label: 'Show on website', type: 'checkbox' },
  ],
}
