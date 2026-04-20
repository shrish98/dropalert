# 📉 DropAlert

**Live Demo:** [https://dropalert-app.netlify.app/](https://dropalert-app.netlify.app/)

DropAlert is a beautiful, intelligent automated price-tracking application built to save you money. Paste the URL of any product from any e-commerce site, and DropAlert's extraction engine will monitor the daily market value, keeping you informed via automated email notifications the exact moment the price drops.

## ✨ Features

- **Intelligent Web Scraping:** Uses the powerful Firecrawl SDK to effortlessly punch through bot protections and scrape accurate data (Price, Currency, Image, Name) directly from dynamic JS-heavy store pages.
- **Automated Price Checks:** Backed by an encrypted Cron Job executing automated background updates daily to compare market history against your initial targets.
- **Smart Email Alerts:** Sends beautifully styled HTML email alerts via Resend featuring the original price, the dropped price, and exactly how much you can save, straight to your inbox.
- **Visually Stunning UI:** Built with Tailwind V4, Next-Themes, and Framer Motion for a fluid, glassmorphic layout starring seamless dark mode support and staggered interactive load-in animations.
- **Market Trend Visualization:** Plots historical price fluctuations using smoothed Area charts mapped dynamically to the component's dark/light thematic modes using Recharts.
- **Secure Authentication:** Frictionless OAuth powered by Supabase, allowing users to securely log in with Google and maintain a private tracking dashboard.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Glassmorphism
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL & Next.js SSR Auth)
- **Extraction Engine:** [Firecrawl API v4](https://firecrawl.dev/)
- **Email Dispatch:** [Resend](https://resend.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Hosting:** [Netlify](https://www.netlify.com/)

---

## 🚀 Local Development

### Prerequisites
You will need Node.js installed on your machine and accounts configured for Supabase, Resend, and Firecrawl.

### Environment Setup
Create a `.env` file in the root of the project with your API keys:

```bash
# Firecrawl
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Security
CRON_SECRET=your_custom_secure_cron_secret

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Installation

1. Install the dependencies via npm:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [https://dropalert-app.netlify.app/) with your browser to see the application!

---

## ⏰ Background Cron configuration

To enable the automated price checking module in production, trigger a `POST` request to `/api/cron/check-prices` containing an `Authorization` header mapping to your environmental `CRON_SECRET`. In Netlify, this can be automated via Scheduled Functions or any external ping service (like cron-job.org).

```json
Authorization: Bearer <your-secure-cron-secret>
```

---

*Enjoy tracking your favorite products!*
