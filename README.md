# Dixsa Labs

Marketing site for a boutique studio that designs and builds custom web applications, high-performance websites, and AI automation for small and mid-sized businesses.

The stack is Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Motion, next-themes, React Hook Form, and Zod. It is ready to deploy on Vercel.

## Customize

| What | Where |
| --- | --- |
| Name, email, positioning, booking link, investment note | `lib/site.ts` |
| Colors (light and dark) and the copper accent | `app/globals.css` (`:root` and `.dark`, plus `--brand`) |
| Wordmark mark | `components/layout/logo.tsx` and `app/icon.svg` |
| Services | `lib/services.ts` |
| Case studies | `lib/work.ts` |
| Insights | `lib/insights.ts` |
| Team, process, metrics, fit | `lib/studio.ts` |
| Public site URL for canonicals, sitemap, and Open Graph | `NEXT_PUBLIC_SITE_URL` (see `.env.example`) |

Case studies, metrics, testimonials, and the team are realistic placeholders. Replace them before you launch.

## Contact form

`app/contact/actions.ts` validates each inquiry with the same Zod schema the form uses. It does not send email yet. Connect Resend, Postmark, or your CRM inside `submitInquiry` using the parsed payload.

The scheduling button reads `site.bookingUrl`. Replace the Calendly placeholder in `lib/site.ts`.

## Content model

Copy lives in typed modules under `lib/`, not in the page components. Add a case study or an insight by appending an object and the matching route is generated from `generateStaticParams`. A post body is a list of paragraphs, headings, and lists so you do not need MDX. If you later want MDX, keep the same fields (`slug`, `title`, `description`, `date`) and swap the body renderer.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Deploy

Connect the repository to Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production origin, for example `https://dixsalabs.com`. No other environment variables are required until you wire the contact form to an email provider.
