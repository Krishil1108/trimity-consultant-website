# Trimity Consultants Website

A modern, animated website for Trimity Consultants - Engineering Excellence Since 2019.

## Features

- ✨ Smooth animations using Framer Motion
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎯 SEO optimized
- 🔥 Performance focused

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local` from `.env.local.example` and set:

- `RESEND_API_KEY` for contact form email sending
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Google Analytics (GA4)

## Project Structure

```
trimity-consultants/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage with all sections
│   └── globals.css      # Global styles
├── public/              # Static assets
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Sections

- **Hero Section** - Eye-catching introduction with animated stats
- **Services** - 4 core services (Plumbing, HVAC, Electrical, Fire Fighting)
- **About** - Company information and founder profile
- **Contact** - Contact information and location

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Customization

### Colors
Edit `tailwind.config.js` to change the primary color scheme.

### Content
All content is in `app/page.tsx` and can be easily modified.

### Adding CMS
This project is ready for CMS integration. Recommended options:
- **Sanity.io** - For flexible content management
- **Contentful** - For enterprise solutions
- **Strapi** - For self-hosted option

## Build for Production

```bash
npm run build
npm start
```

## License

© 2026 Trimity Consultants. All rights reserved.
