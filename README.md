# MrLionX Portfolio

A responsive one-page portfolio site for MrLionX, built with React + Vite.

## Structure

```
src/
  assets/logo.jpg          Company logo
  components/
    Header.jsx              Sticky nav with mobile menu
    Hero.jsx                 Hero / intro section
    Services.jsx             What we do
    Process.jsx               How we work (4-step process)
    Projects.jsx              Portfolio / selected work
    Pricing.jsx                Pricing tiers
    About.jsx                   About the team
    Contact.jsx                 Contact form
    Footer.jsx                    Footer
  App.jsx                    Composes all sections
  index.css                  All styling (design tokens + responsive rules)
  main.jsx                   React entry point
index.html                  HTML shell (loads Google Fonts)
```

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — upload that folder to any static host (Vercel,
Netlify, GitHub Pages, etc.).

## Customizing

- **Colors**: all in the `:root` block at the top of `src/index.css`
  (`--cyan`, `--blue`, `--gradient`, backgrounds, text colors).
- **Copy**: each section's text lives directly in its component file —
  edit the arrays/strings in `Services.jsx`, `Projects.jsx`, `Pricing.jsx`,
  etc.
- **Projects**: the `PROJECTS` array in `Projects.jsx` — swap in your real
  case studies, screenshots, or links as you complete them.
- **Contact form**: currently shows a confirmation message on submit but
  doesn't send anywhere. Wire `handleSubmit` in `Contact.jsx` up to an API,
  Formspree, EmailJS, or similar when you're ready.
