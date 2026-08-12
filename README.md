# DD Art Academy — Website

A modern, responsive React + Vite + Tailwind website for **DD ART ACADEMY**,
built from the provided project spec and reference design.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

The production-ready site is generated in `dist/`. Deploy that folder to
Vercel, Netlify, or any static host.

## Add your images

See `public/images/README.txt` for the exact file names and folders to use.
Every image on the site has a graceful placeholder until you add the real
photo — just drop files into `public/images/...` using the listed names.

## Edit content without touching components

All text content lives in plain data files so you (or a developer) can edit
it safely:

- `src/config/siteConfig.js` — phone, WhatsApp, email, address, social links
- `src/data/courses.js` — course categories
- `src/data/artForms.js` — art forms list
- `src/data/studentWorks.js` — gallery items
- `src/data/testimonials.js` — student/parent feedback
- `src/data/awards.js` — awards & achievements
- `src/data/videos.js` — recorded video lessons
- `src/data/learningOptions.js` / `src/data/whyChooseUs.js`

## Notes

- Social icons in the top bar/footer are hidden until you add real
  Instagram/YouTube/Facebook URLs in `siteConfig.js`.
- The founder page (`/about-founder`) is a placeholder — add real founder
  details before publishing.
- Course duration, pricing and certification details are intentionally left
  out until confirmed, per the project brief.
- The contact form opens WhatsApp with the enquiry pre-filled (no backend
  required). Swap in a real form backend later if you want emailed
  submissions instead.
