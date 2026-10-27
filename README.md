# Luxuriate Dental Solutions

Marketing website and demo admin portal for Luxuriate Dental Solutions, a dental clinic in Osogbo, Osun State, Nigeria.

There is no backend. Patients send appointment requests to the clinic **on WhatsApp**: both booking flows end by opening WhatsApp with the request details pre-filled. A copy is also kept in the visitor's browser (`localStorage`), which is what the demo admin portal at `/admin` reads. The admin portal accepts any credentials.

## How booking works

| Flow                 | Opened from                                      | Steps                                                                                                              |
| -------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Appointment request  | Any "Book" / "Request" button, or a service card | Reason → preferred date & time (tomorrow to 60 days ahead) → contact details → review & consent → send on WhatsApp |
| December reservation | Hero countdown card, December section            | Contact details → December date & time → review & consent → send on WhatsApp                                       |

Both flows share the same contact validation (`src/lib/validation.ts`), time slots, consent wording, and WhatsApp hand-off (`src/lib/whatsapp.ts`).

The December offer is defined once in `src/features/december/campaign.ts`: price, service, dates and available days. The countdown, December section, FAQ and reservation all read from that file and switch automatically between _upcoming_, _live_ and _ended_.

## Tech stack

- [React 19](https://react.dev) + TypeScript
- [Vite 8](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (base reset only; the styling itself is hand-written CSS in `src/styles/`)
- ESLint (typescript-eslint, React Hooks, React Refresh) and [oxfmt](https://oxc.rs) for formatting

## Getting started

Requires Node.js 22.12+ and pnpm. The pnpm version is pinned in `package.json`, so `corepack` installs the right one for you:

```sh
corepack enable        # once per machine; or prefix commands with `corepack pnpm`
pnpm install
pnpm dev               # http://localhost:5173
```

| Script           | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Start the dev server with hot reload             |
| `pnpm build`     | Type-check, then build to `dist/`                |
| `pnpm preview`   | Serve the production build locally               |
| `pnpm typecheck` | Run the TypeScript compiler (no output)          |
| `pnpm lint`      | Lint all TypeScript files                        |
| `pnpm format`    | Format the codebase with oxfmt (`.oxfmtrc.json`) |

## Routes

| Path     | Page                                                |
| -------- | --------------------------------------------------- |
| `/`      | Public website                                      |
| `/admin` | Demo admin portal (sign in with any email/password) |

Routing is a simple pathname check in `src/App.tsx`. When you deploy, configure the host to serve `index.html` for `/admin`, as you would for any single-page app.

## Project structure

```
src/
├── main.tsx                  # Entry point: mounts <App /> and global styles
├── App.tsx                   # Path-based routing (site vs. admin)
├── features/
│   ├── site/                 # Public marketing website
│   │   ├── HomePage.tsx      # Composes sections, header/footer and modals
│   │   ├── data.ts           # Copy, images, services, FAQs, nav links
│   │   ├── components/       # Header, footer, brand, booking & service modals
│   │   ├── sections/         # One component per page section
│   │   └── hooks/            # useBookingFlow: appointment request state
│   ├── december/             # December promotion: countdown + reservation flow
│   └── admin/                # Demo admin portal
│       ├── AdminApp.tsx      # Shell: sidebar, top bar, page switching, drawer
│       ├── pages/            # One component per admin page (incl. login)
│       ├── components/       # Tables, charts, drawer, dialogs, navigation
│       ├── data.ts           # Fictional sample records and nav config
│       └── types.ts
├── hooks/
│   ├── useDialog.ts          # Modal behaviour: focus trap, Escape, scroll lock
│   └── useReveal.ts          # Scroll-reveal animation
├── lib/
│   ├── bookings.ts           # localStorage persistence shared by site and admin
│   ├── dates.ts              # Calendar and date-format helpers
│   ├── validation.ts         # Contact-form validation
│   └── whatsapp.ts           # Clinic WhatsApp number and link builder
└── styles/
    ├── index.css             # Entry: fonts, Tailwind, then partials in order
    ├── site.css              # Public website
    ├── admin.css             # Admin portal
    ├── reservation.css       # December reservation modal
    └── motion.css            # Animations and reduced-motion overrides
```

The `@/` import alias points to `src/`.

The CSS partials are imported in a fixed order, and later files override earlier ones. Keep that order when adding styles.

## Before going live

- **Search indexing is disabled** on purpose: there's a `noindex` meta tag in `index.html` and `public/robots.txt` disallows everything. Remove both at launch.
- **Confirm the clinic WhatsApp number** in `src/lib/whatsapp.ts`; every booking is sent there.
- **Content still needed from the clinic:** street address and opening hours (the contact section currently points people to WhatsApp), final December offer terms, gallery before/after photos (with patient consent), and testimonials. The testimonials section stays hidden until `testimonials` in `src/features/site/data.ts` has approved entries.
- Stock photography is used throughout; replace it with the clinic's own images where possible.
- The admin portal is a demo with fictional data. It needs a real backend and authentication before it handles patient data.
