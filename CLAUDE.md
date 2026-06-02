# Portfolio — CLAUDE.md

## Project Overview
Single-page personal portfolio for Md Samad. Positioning: Cloud Security & AI Infrastructure Engineer.
Target roles: Cloud Engineering, DevOps, AI Infrastructure (primary) + SDE (secondary).

## File Structure
```
portfolio/
  index.html                          — all markup; uses Tailwind CDN + custom CSS classes
  style.css                           — custom classes (glass-panel, mesh-glow, reveal, accordion, form status)
  main.js                             — particles, typewriter, scroll reveal, accordion, Web3Forms form, count-up
  CLAUDE.md                           — this file (not pushed to GitHub)
  .github/workflows/deploy.yml        — deploys to GitHub Pages on push to main
  .github/workflows/keepalive.yml     — Playwright cron every 20 min, wakes Streamlit apps
```

## Aesthetic
- Dark background: `#10131a`
- Primary (indigo): `#6366f1`; Secondary (cyan): `#4cd7f6`
- Glass panels: `.glass-panel` — `rgba(22,27,34,0.6)` + `backdrop-filter: blur(16px)` + `border: 1px solid rgba(255,255,255,0.1)`
- Fonts: Syne (headlines, `font-syne`), JetBrains Mono (labels/code, `font-code`), Inter (body, `font-body`)
- Scroll reveal: add `.reveal-hidden` to sections; JS adds `.reveal-visible` on scroll
- Accent colors for badges: green `#4ade80` / `rgba(74,222,128,...)` for GPA and Hackathon Winner

## Tailwind Config
Custom colors defined in inline `<script id="tailwind-config">`:
`primary`, `secondary`, `surface`, `on-surface`, `on-surface-variant`, `surface-variant`, `surface-container`, `surface-container-low`, `outline-variant`

Custom font families: `font-syne`, `font-code`, `font-body`

## Content Rules
- All content must come from the actual resume/experience — do not invent metrics or technologies
- No em dashes anywhere; use hyphens (`-`) or slashes (`/`)
- Contact: samadmd@uchicago.edu | samadmd6020@gmail.com | (614) 806-0483 | linkedin.com/in/md-samad-msu | github.com/samadmd786
- Resume: https://drive.google.com/file/d/1qJ8ClLprFbKt8ermTH-tFzcbbm4FhfBw/view
- Web3Forms key: `f8b497c5-59f1-40d0-ba7b-ac6384e7da2a`

## Hero Section
- Positioning statement under h1: "Cloud Security & AI Infrastructure Engineer — 4 years building enterprise auth at Vanguard scale, now shipping agentic systems"
- h1 font: `text-[34px] sm:text-[52px]`
- 2-col layout on desktop (lg:grid-cols-2); photo column hidden on mobile

## Nav Bar
Desktop + mobile menu links (in order): Experience, Projects, Skills, Education, Contact, Resume button

## Section Layout
1. Fixed header — "Md Samad" brand (links to top via `href="#"`), nav links, Resume button
2. Hero — particle canvas bg, mesh glows, 2-col (terminal card + photo with AWS badge), positioning statement
3. Experience — accordion rows (`.exp-row`, click toggles `.open` class)
4. Projects — 3 featured cards (3-col): CloudGuard AI, Cheetah.ai, NucleusCloud + 2 full cards (2-col): Labyrinth, SubRecon
5. Skills — console-aesthetic glass panel, 6 skill groups with pill tags
6. Achievements — 4-cell grid
7. Education — id="education"; 2-col (education cards left, certifications right; AWS SAA only)
8. Contact — links list (left) + Web3Forms form (right)
9. Footer

## Experience Roles (in order — reverse chronological)
1. Graduate Teaching Assistant — University of Chicago · Mar 2026 - Jun 2026 · MPCS 51083 Cloud Computing (Graduate)
2. Senior Software Engineer / Sr. Cloud Security Engineer — Vanguard · Dec 2023 - Jun 2025
3. Software Engineer — Vanguard · Jun 2022 - Dec 2023
4. DevOps & Automation Engineer — Delta Dental · Nov 2021 - May 2022
5. Software Engineer Intern — TIAA · Jun-Aug 2021

**Auto-expand on load**: JS opens `rows[1]` (Vanguard Senior) not `rows[0]` (TA) — see `DOMContentLoaded` in main.js.

## Projects (current)
| Project | Card type | Card href (GitHub) | Image onclick (Demo) |
|---|---|---|---|
| CloudGuard AI | Featured (3-col) | github.com/samadmd786/cloudguard | cloudguard.streamlit.app |
| Cheetah.ai | Featured (3-col) | github.com/samadmd786/cheetah.ai | devpost.com/software/cheetah-ai |
| NucleusCloud | Featured (3-col) | github.com/samadmd786/nucleuscloud | (no demo) |
| Labyrinth | Full card (2-col) | labyrinth-rrkj.onrender.com | (no separate onclick) |
| SubRecon | Full card (2-col) | github.com/samadmd786/zombie_hunter | (no demo) |

**Card pattern**: each `.proj-card` is an `<a>` tag (href = GitHub). `.proj-visual` has inline `onclick` with `event.preventDefault(); event.stopPropagation(); window.open(demoUrl, '_blank')` for demo cards. `.preview-overlay` inside `.proj-visual` shows "▶ Live Demo" pill on hover. Footer uses `.proj-footer` + `.proj-gh-link`. No JS click handler needed.

## Adding a New Project Card
Copy an existing `.proj-card` `<a>` block. Set `href` to GitHub URL. Add `onclick` to `.proj-visual` if there's a live demo. Add `.preview-overlay` div. Update `.proj-name`, description, stack tags, `.proj-footer` text.

## Adding a New Experience Row
Copy an `.exp-row` block. Add `role="button"` `tabindex="0"` `aria-expanded="false"` `onkeydown`. Update `.exp-role-title`, company/date line, subtitle line, chips, and `.exp-bullets`. Use `<strong>` for key metrics. The accordion is automatic.

## JavaScript (main.js)
- `toggleExp(row)` — accordion; also syncs `aria-expanded`
- `toggleMenu(btn)` / `closeMenu()` — mobile nav
- Particle canvas: 70 particles, connecting lines (distance 150px), mouse repel; respects `REDUCE_MOTION`
- Typewriter: types bio text into `#typing-text` on load
- Scroll reveal: `IntersectionObserver` on `.reveal-hidden` elements
- Count-up: `data-target`, `data-decimals`, `data-suffix` on `.count-up` spans
- Web3Forms async submit with loading/success/error states
- `DOMContentLoaded`: opens `querySelectorAll('.exp-row')[1]` (Vanguard Senior) by default

## Key CSS Classes (style.css)
- `.glass-panel` — glass card base
- `.glow-indigo` — indigo box-shadow
- `.mesh-glow` — radial gradient blob (absolute positioned)
- `.reveal-hidden` / `.reveal-visible` — scroll reveal
- `.cursor-blink` — terminal cursor animation
- `.exp-body` — hidden by default; `.exp-row.open .exp-body` shows it
- `.exp-bullets` — bulleted list inside accordion with `→` prefix
- `.proj-card` — `<a>` tag; `position: relative; cursor: pointer`
- `.proj-visual` / `.proj-visual-overlay` — card image area + gradient tint
- `.preview-overlay` / `.preview-overlay-text` — hover overlay on image showing "▶ Live Demo"
- `.proj-footer` / `.proj-gh-link` — card footer with GitHub icon + "View on GitHub →"
- `.c-row` — contact link row with animated left border on hover
- `.form-status` — form feedback (add `.show` + `.success`/`.error`/`.loading`)

## Mobile Responsiveness
- All section containers: `px-4 sm:px-6 py-14 sm:py-24`
- Hero h1: `text-[34px] sm:text-[52px]`
- All section h2s: `text-2xl sm:text-4xl`; Contact h2: `text-3xl sm:text-5xl`
- CSS `@media (max-width: 640px)`: form row stacking (`form-row-2`), edu/contact gap reduction, exp-body padding

## Accessibility Conventions
- **Form fields**: `<label for="...">` + matching `id` on input (ids: `contact-name`, `contact-email`, `contact-subject`, `contact-message`)
- **Form inputs**: `focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30`
- **Nav links**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded px-1`
- **Buttons**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface`
- **Accordion rows**: `role="button"` `tabindex="0"` `aria-expanded="false"` + `onkeydown` Enter/Space handler
- **Transitions**: always include `duration-200`

## GitHub Actions
- **deploy.yml** — triggers on push to `main`; uploads repo root to GitHub Pages
- **keepalive.yml** — cron `*/20 * * * *`; Playwright/Chromium visits Streamlit apps and clicks wake button

## Installed Skills / MCP
- `.claude/skills/ui-ux-pro-max/` — UI/UX design intelligence. Run: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`
- MCP `magic` (21st.dev) — registered in `~/.claude.json`, `--scope user`

## Commit Convention
Do NOT add `Co-Authored-By: Claude` to commits — commits under Md Samad / samadmd@uchicago.edu only.
