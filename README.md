# MrLionX Portfolio

A responsive one-page portfolio site for MrLionX, built with React + Vite,
with an Express + MongoDB backend and an admin dashboard.

## Structure

```
src/
  admin/                   Admin dashboard (loaded only on /admin)
  assets/logo.jpg          Company logo
  components/
    Header.jsx              Sticky nav with mobile menu
    Hero.jsx                 Hero / intro section
    Services.jsx             What we do
    Process.jsx               How we work (4-step process)
    Projects.jsx              Portfolio / selected work (from the API)
    Pricing.jsx                Pricing packages (from the API)
    About.jsx                   About the team
    Contact.jsx                 Contact form (posts to the API)
    Footer.jsx                    Footer (includes the Admin login link)
  data/defaults.js         Fallback content if the API is unreachable
  lib/                     API client + useContent hook
  App.jsx                    Composes all sections
  index.css                  All styling (design tokens + responsive rules)
  main.jsx                   React entry point (routes /admin to the dashboard)
public/images/              Project & pricing images (served at /images/...)
server/                     Express + MongoDB API (see Backend below)
index.html                  HTML shell (loads Google Fonts)
render.yaml                 Render deployment blueprint for server/
vercel.json                 Vercel config (/admin rewrite)
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

Output goes to `dist/`.

## Customizing

- **Colors**: all in the `:root` block at the top of `src/index.css`
  (`--cyan`, `--blue`, `--gradient`, backgrounds, text colors).
- **Projects & pricing**: edit them in the admin dashboard at `/admin`
  (see below), not in code.
- **Other copy**: each remaining section's text lives directly in its
  component file (`Services.jsx`, `About.jsx`, etc.).

## Backend (Express + MongoDB, deployed on Render)

The API lives in `server/`. It stores the **Projects** and **Pricing**
content shown on the site, saves contact-form enquiries, and powers the admin
dashboard at **`/admin`** (linked as *Admin login* in the footer).

Project and pricing images can be **uploaded from the dashboard** (stored in
Cloudinary), or entered as any `https://` image link or a path to a file in
this repo's `public/` folder (e.g. `/images/wedding/wedding-hero.png`).

| Method       | Route                       | Auth  | Purpose                                            |
| ------------ | --------------------------- | ----- | -------------------------------------------------- |
| GET          | `/api/health`               | —     | Health check (used by Render)                      |
| GET          | `/api/projects`             | —     | Published projects                                 |
| GET          | `/api/plans`                | —     | Published pricing packages                         |
| POST         | `/api/contact`              | —     | Submit enquiry (rate-limited 5 / 15 min)           |
| POST         | `/api/auth/login`           | —     | `{ username, password }` → `{ token }`             |
| GET          | `/api/auth/me`              | Admin | Check a token                                      |
| GET / POST   | `/api/admin/projects`       | Admin | List all / create                                  |
| PUT / DELETE | `/api/admin/projects/:id`   | Admin | Update / delete                                    |
| GET / POST   | `/api/admin/plans`          | Admin | List all / create                                  |
| PUT / DELETE | `/api/admin/plans/:id`      | Admin | Update / delete                                    |
| POST         | `/api/admin/upload`         | Admin | Upload an image (multipart field `image`, ≤ 5 MB) → `{ url }` |
| POST         | `/api/admin/seed`           | Admin | Fill *empty* collections with the original content |
| GET          | `/api/admin/messages`       | Admin | Enquiries (`?status=new&page=1&limit=20`)          |
| PATCH / DELETE | `/api/admin/messages/:id` | Admin | Update status / delete                             |

Admin routes need `Authorization: Bearer <token>` from `/api/auth/login`.

If the API is unreachable, the site shows the last content it loaded (or the
built-in copy in `src/data/defaults.js`), so sections never sit empty while
Render's free tier wakes up.

### Environment variables (`server/.env`)

| Variable | Purpose |
| --- | --- |
| `PORT` | Local port (default `5001`; Render sets its own) |
| `MONGO_URI` | MongoDB Atlas connection string (required) |
| `MONGO_DB_NAME` | Database name in the cluster (default `mrlionx`) |
| `CLIENT_URL` | Comma-separated frontend origins allowed to call the API |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Dashboard login |
| `JWT_SECRET` | Signs login tokens |
| `CLOUD_NAME` / `CLOUD_API_KEY` / `CLOUD_API_SECRET` | Cloudinary image uploads |
| `SMTP_*`, `NOTIFY_EMAIL` | Optional email alerts for new enquiries |
| `DNS_SERVERS` | Local-only fix if `mongodb+srv` fails with `querySrv ECONNREFUSED` |

### Run locally

```bash
cd server
cp .env.example .env      # then fill in the values above
npm install
npm run dev               # http://localhost:5001
```

Then make sure the project root has `.env.local` with
`VITE_API_URL=http://localhost:5001`, run `npm run dev`, and open
http://localhost:5173/admin.

### Deploy

1. **MongoDB Atlas**: under *Network Access* allow `0.0.0.0/0` (Render's free
   tier has no fixed IP).
2. **Render**: *New + → Blueprint*, pick this repo. `render.yaml` creates the
   `mrlionx-api` service from `server/` with `CLIENT_URL` already set to
   `https://mr-lion-x.vercel.app`. When prompted, enter `MONGO_URI`,
   `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CLOUD_NAME`,
   `CLOUD_API_KEY`, `CLOUD_API_SECRET` (same values as your local `.env`), and
   optionally the SMTP settings. Leave out `PORT` and `DNS_SERVERS`.
3. **Vercel**: nothing to set. Production builds read the API URL
   (`https://mrlionx.onrender.com`) from `.env.production`. If the backend
   URL ever changes, edit that file, or set `VITE_API_URL` in Vercel's
   Environment Variables (which overrides it) and redeploy.
4. Open https://mr-lion-x.vercel.app/admin, log in, and click **Import the
   original site content** to load the current projects and pricing into the
   database. Until you do, the Projects and Pricing sections will be empty.

Note: Render's free tier sleeps after ~15 minutes idle, so the first request
after a quiet period (including logging in) can take 30–60 seconds.
