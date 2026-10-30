# SRH Software design system

This document is the source of truth for visual design. New screens, components, and marketing sections follow these rules. Color values come from `src/assets/images/logo.png`.

## Brand Color System

Source of truth: `src/assets/images/logo.png`. Every UI color must feel like it belongs to this family. Do not introduce unrelated blues, greens, oranges, or generic Material reds.

### Logo-derived primaries

| Role | Hex | Notes |
| --- | --- | --- |
| Primary Purple | `#4301B2` | Logo mark. Structural brand color. |
| Primary Magenta (Red) | `#E01060` | Logo wordmark. Accent / emphasis. |

### Supporting colors

| Name | Hex | Role |
| --- | --- | --- |
| Deep Navy | `#120B22` | Header glass base, footer, dark overlays |
| Dark Purple | `#28016B` | Hover on purple fills, deep panels |
| Soft Purple | `#EDE5FF` | Soft fills, selected rows |
| Light Lavender | `#F6F2FF` | Section tint, card hover wash |
| Light Red | `#FFE0EA` | Soft accent surfaces |
| Soft Pink Tint | `#FFF1F5` | Magenta-tint backgrounds, timeline wash |

### Neutral colors

| Name | Hex | Role |
| --- | --- | --- |
| White | `#FFFFFF` | Cards, inputs, logo plate |
| Off White | `#FAFAFB` | Alternate section canvas |
| Light Gray | `#F7F8FC` | Default soft section background |
| Soft Gray | `#F3F5F8` / `#EEF2F7` | Deeper soft sections, stage fills |
| Medium Gray | `#8B90A0` | Muted icons, tertiary text |
| Dark Gray | `#5C5370` | Secondary / body support text |
| Near Black | `#1A1030` | Primary headings and body ink |

### Semantic aliases (existing tokens)

| Token | Maps to | Tailwind |
| --- | --- | --- |
| `primary` / `violet` | Purple 600 `#4301B2` | `bg-primary`, `text-violet` |
| `accent` / `magenta` | Magenta 500 `#E01060` | `bg-accent`, `text-magenta` |
| `foreground` | Near Black `#1A1030` | `text-foreground` |
| `muted-foreground` | Dark Gray `#5C5370` | `text-muted-foreground` |
| `background` | Light Gray `#F7F8FC` | `bg-background` |
| `muted` | Soft Purple `#F4EEF8` | `bg-muted` |
| `border` | Line `#E7DCF3` | `border-border` |
| `navbar` | Purple 600 | nav chrome |

Purple is structural. Magenta is the accent. One strong magenta moment per view when possible. Text on purple or magenta is white. The full-color logo always sits on a white plate.

### Shade scale (50–900)

**Purple (`brand`)** — primary `#4301B2` = 600

| Step | Hex |
| --- | --- |
| 50 | `#F6F2FF` |
| 100 | `#EDE5FF` |
| 200 | `#D9C8FF` |
| 300 | `#B995FF` |
| 400 | `#8B4DFF` |
| 500 | `#6418E0` |
| 600 | `#4301B2` |
| 700 | `#35018E` |
| 800 | `#28016B` |
| 900 | `#1A1030` |

**Magenta / Red (`magenta`)** — primary `#E01060` = 500

| Step | Hex |
| --- | --- |
| 50 | `#FFF1F5` |
| 100 | `#FFE0EA` |
| 200 | `#FFB8CD` |
| 300 | `#FF7AA3` |
| 400 | `#F93D78` |
| 500 | `#E01060` |
| 600 | `#C40D52` |
| 700 | `#A00B44` |
| 800 | `#7C0935` |
| 900 | `#580626` |

**Neutral (`neutral`)** — violet-tinted grays

| Step | Hex |
| --- | --- |
| 50 | `#FAFAFB` |
| 100 | `#F7F8FC` |
| 200 | `#EEF2F7` |
| 300 | `#E5E7EF` |
| 400 | `#C5C8D4` |
| 500 | `#8B90A0` |
| 600 | `#5C5370` |
| 700 | `#3D384D` |
| 800 | `#2A2640` |
| 900 | `#1A1030` |

Use Tailwind tokens: `bg-brand-600`, `text-magenta-500`, `border-neutral-200`, etc. Prefer semantic aliases (`primary`, `accent`, `muted`) for app chrome.

### Where each color is used

| Use | Color |
| --- | --- |
| Active states, links, focus rings, progress (structural) | Purple 600 / `primary` |
| Hover on purple fills | Purple 700 `#35018E` |
| CTA emphasis, timeline dots, highlight words, badges | Magenta 500 / `accent` |
| Hover on magenta fills | Magenta 600 `#C40D52` |
| Header / footer / hero overlays | Deep Navy / Purple 900 overlays |
| Soft section backgrounds | Neutral 50–200 or Purple 50 |
| Cards | White + Neutral 200 / `border` |
| Body text | Near Black / Dark Gray |
| Muted text | Neutral 500–600 |
| Icons (primary) | Purple 600 |
| Icons (accent) | Magenta 500 |
| Icons (neutral) | Neutral 500–600 |

### Background rules

Avoid flat pure-white page sections. Alternate:

- White `#FFFFFF` — cards, forms, elevated surfaces
- Off White `#FAFAFB` — quiet sections
- Light Gray `#F7F8FC` — default page / soft sections
- Soft Gray `#F3F5F8` / `#EEF2F7` — deeper resting surfaces
- Light Lavender `#F6F2FF` — rare brand-tinted highlights

### Typography colors

| Role | Color |
| --- | --- |
| Primary heading | Near Black `#1A1030` |
| Secondary heading | Dark Gray `#5C5370` or Neutral 700 |
| Body | Near Black / Dark Gray |
| Muted | Neutral 500 |
| Links | Purple 600 |
| Link hover | Purple 700 or Magenta 500 (short labels) |

### Button colors

| Variant | Default | Hover |
| --- | --- | --- |
| Primary | Purple 600 `#4301B2` + white text | Purple 700 `#35018E` |
| Secondary | White + Purple 600 border + purple text | Soft Purple (`brand-50`) fill |
| Accent | Magenta 500 `#E01060` + white text | Magenta 600 `#C40D52` |
| Nav / Contact pill | Magenta 500 + white text | Magenta 600 |
| Glass | White/10 on dark overlays | White/18 |

Primary CTA may keep a subtle shine animation; fill color stays purple. Do not use off-brand gradients.

### Border colors

| State | Color |
| --- | --- |
| Default | `#E7DCF3` / Neutral 200–300 |
| Hover | Soft Purple `#EDE5FF` edge or Purple 200 |
| Active / focus | Purple 500–600 |
| Error | Magenta 500 |
| Success | Muted green only when required (status), never as brand chrome |

### Shadows

Violet-tinted, soft, realistic. No hard black drops.

| Level | Use | Example |
| --- | --- | --- |
| Small | Cards | `0 1px 2px rgba(26,16,48,0.04), 0 12px 32px -16px rgba(26,16,48,0.10)` |
| Medium | Dropdowns / sticky | `0 16px 48px -24px rgba(26,16,48,0.85)` |
| Large | Modals / mega menu | `0 30px 80px -24px rgba(26,16,48,0.45)` |

### Gradients

Use sparingly. Only purple ↔ magenta from this palette (e.g. primary button, hero word emphasis). Never add unrelated hues.

### Hover states

Subtle only: slight lift, soft shadow, light lavender / mist fill, border emphasis, 200–300ms color transition. No neon glow.

### Accessibility

- White text on Purple 600 and Magenta 500 meets contrast for buttons.
- Body text uses Near Black on light surfaces — never light gray under 16px for primary reading.
- Focus rings stay visible (2px outline, 2px offset). Purple on light; white on dark overlays.
- Color is never the only state signal (also weight, underline, or aria).

### Do not

- Do not use Material red (`#C62828`), Tailwind blue, teal, orange, or random greens for brand chrome.
- Do not place the full-color logo on purple, magenta, or photography.
- Do not paint large areas in both purple and magenta at full strength in one view.

## Typography

Three families. They are loaded in the root layout.

| Family | Role | Tailwind |
| --- | --- | --- |
| Inter | Interface and reading text: body, navigation, buttons, labels, eyebrows, card titles, H2/H3 | `font-sans` (default on `body`) |
| Merriweather | Display voice: hero headline and page H1 only | `font-serif` |
| Plus Jakarta Sans | Marketing display titles in featured sections (e.g. portfolio names, featured headings) | `font-display` |

Inter keeps the product clear and modern. Merriweather adds warmth and authority on the largest page titles. Plus Jakarta Sans is the modern display voice for portfolio and similar marketing blocks. Do not use Merriweather for navigation, buttons, forms, or dense card titles.

| Role | Family | Size | Line height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- | --- |
| Display / Hero H1 | Merriweather | `clamp(2.15rem, 5.2vw, 4.5rem)` | 1.15 | 700 | -0.015em | One hero headline. |
| Heading 1 | Merriweather | 48px / 3rem, 36px on small screens | 1.15 | 700 | -0.015em | Page title. One per page. |
| Heading 2 | Inter | 36px / 2.25rem | 1.2 | 600 | -0.02em | Section title. |
| Heading 3 | Inter | 24px / 1.5rem | 1.3 | 600 | -0.015em | Card title, subsection. |
| Subheading | Inter | 20px / 1.25rem | 1.5 | 500 | -0.01em | Intro under a heading. Max two lines. |
| Body | Inter | 16px / 1rem | 1.6 | 400 | 0 | Paragraphs. |
| Body small | Inter | 14px / 0.875rem | 1.5 | 400 | 0 | Footer, dense support copy. |
| Label | Inter | 14px / 0.875rem | 1.4 | 500 | 0 | Form labels. Sentence case. |
| Navigation | Inter | 16px | 1 | 600 | 0.04em | Desktop navigation links. Contact pill stays uppercase at 12px. |
| Button | Inter | 14px / 0.875rem | 1 | 600 | 0 | Buttons in page content. Sentence case. |
| Helper | Inter | 12px / 0.75rem | 1.4 | 400 | 0 | Hints and errors under fields. |

Rules:

- Merriweather uses slightly open tracking. Do not apply Inter-style tight tracking to serif titles.
- Inter headings may use tight tracking. Body copy uses normal tracking.
- Do not set body text below 16px.
- Do not use all caps for headings or paragraphs. All caps is reserved for navigation, eyebrows, and the contact pill.
- Eyebrows stay in Inter: 14px, weight 600, tracking 0.16em, magenta, uppercase.
- Keep line length for paragraphs between 45 and 75 characters. The layout cap is `max-w-2xl` for reading text and `max-w-3xl` for headings.
- One H1 per page. Do not skip from H1 to H3.
- Never stack both fonts in the same short phrase except when a Merriweather title sits above Inter body copy.

## Spacing and layout

All spacing must come from this system. Do not invent one-off `mt-[37px]`, mixed arbitrary paddings, or random section gaps. Prefer the shared `Container` and `Section` components in `src/components/layout/`.

### Base scale (4px unit)

Every spacing value is a multiple of 4px. Map to Tailwind as follows:

| Token | px | rem | Tailwind | Typical use |
| --- | --- | --- | --- | --- |
| `space-1` | 4 | 0.25 | `1` | Hairline offsets, icon nudge |
| `space-2` | 8 | 0.5 | `2` | Label → field, tight related items |
| `space-3` | 12 | 0.75 | `3` | Compact stack, chip gaps |
| `space-4` | 16 | 1 | `4` | Default related gap, mobile page gutter |
| `space-5` | 20 | 1.25 | `5` | Form field separation |
| `space-6` | 24 | 1.5 | `6` | Card padding, sm page gutter, stack default |
| `space-8` | 32 | 2 | `8` | lg page gutter, medium block gap |
| `space-10` | 40 | 2.5 | `10` | Large card padding, loose stacks |
| `space-12` | 48 | 3 | `12` | Between related sections / blocks |
| `space-16` | 64 | 4 | `16` | Section padding (mobile / tablet) |
| `space-20` | 80 | 5 | `20` | Section padding (desktop) |
| `space-24` | 96 | 6 | `24` | Large marketing section breathing room |

Do not use values outside this table (no `18px`, `22px`, `28px`, `36px`, `44px`, `52px`, `72px` paddings or margins). If something feels between two steps, pick the larger step for luxury breathing room.

### Semantic layout tokens

| Role | Mobile | `sm` | `lg` | Tailwind / component |
| --- | --- | --- | --- | --- |
| Page gutter (horizontal) | 16 | 24 | 32 | `px-4 sm:px-6 lg:px-8` · `Container` |
| Content max width | — | — | 1600 | `max-w-[100rem]` · `Container` / `.ds-container` |
| Reading measure | — | — | — | headings `max-w-3xl`, body `max-w-2xl` |
| Section Y (`md`) | 64 | 64 | 80 | `py-16 lg:py-20` · `Section size="md"` |
| Section Y (`sm`) | 48 | 48 | 64 | `py-12 lg:py-16` · `Section size="sm"` |
| Section Y (`lg`) | 80 | 80 | 96 | `py-20 lg:py-24` · `Section size="lg"` |
| Header clearance | 96 | 112 | 128 | `pt-24 sm:pt-28 lg:pt-32` · `Section clearHeader` |
| Nav height | 64 | 72 | 80 | `h-16 sm:h-[4.5rem] md:h-20` |
| Stack (related) | 16–24 | — | — | `gap-4` / `gap-6` |
| Stack (loose) | 32–48 | — | — | `gap-8` / `gap-12` |
| Grid gap | 16–24 | 24–32 | — | `gap-4 sm:gap-6` / `gap-6 lg:gap-8` |

### Hierarchy rules

1. **Page shell** — Every page of content sits in `Container` / `.ds-container` (`max-w-[100rem]` + standard gutters). Navbar and page sections share this width so edges align. Do not invent a second max-width for marketing pages.
2. **Sections** — Vertical rhythm comes from `Section` sizes only. Adjacent sections should not both add large custom `mt-*` on top of section padding.
3. **Blocks inside a section** — Title block to content: `mb-12` / `md:mb-16` (48 / 64). Prefer those two steps only.
4. **Related items** — 8–16px (`gap-2`–`gap-4`). Forms use 20px between fields (`gap-5`).
5. **Unrelated blocks** — 32–48px (`gap-8`–`gap-12`).
6. **Cards** — Padding `p-4` (16) on small, `p-6` (24) on `sm+`. Radius 16px (`rounded-2xl`) unless the element is a pill button.
7. **Lists / nav rows** — Vertical padding `py-3`–`py-4` (12–16). Do not mix `py-2.5`, `py-3.5`, and `py-5` in the same list without a reason.
8. **Fixed header** — Inner pages always clear the bar with the header-clearance token. Home hero manages its own top padding.

### Allowed Tailwind spacing classes

Prefer the default scale: `0 1 2 3 4 5 6 8 10 12 16 20 24`.

Avoid:

- Arbitrary spacing: `mt-[18px]`, `gap-[1.125rem]`, `p-[22px]`
- Half-steps used inconsistently: do not mix `gap-2.5`, `gap-3.5`, `py-2.5` across a page unless matching an existing dense control
- One-off max widths for page shells: stick to `max-w-[100rem]` / `.ds-container` for layout, `max-w-3xl` / `max-w-2xl` for type measure

### Shared components

| Component | Path | Responsibility |
| --- | --- | --- |
| `Container` | `src/components/layout/container.tsx` | Horizontal gutters + max width |
| `Section` | `src/components/layout/section.tsx` | Vertical section padding + optional header clear |
| `PageIntro` | `src/components/layout/page-intro.tsx` | Inner-page title block using the system |

New sections should compose `Section` → `Container` → content. Do not duplicate one-off max-width shells by hand unless the section cannot use those primitives (e.g. full-bleed media).

### Utility classes (`globals.css`)

| Class | Meaning |
| --- | --- |
| `.ds-container` | Same as `Container` |
| `.ds-section` | `Section` size `md` |
| `.ds-section-sm` | `Section` size `sm` |
| `.ds-section-lg` | `Section` size `lg` |
| `.ds-page-top` | Header clearance only |
| `.ds-stack` | `flex flex-col gap-6` |
| `.ds-stack-tight` | `flex flex-col gap-4` |
| `.ds-stack-loose` | `flex flex-col gap-12` |

CSS variables (for rare inline styles / GSAP): `--ds-space-1` … `--ds-space-24`, `--ds-gutter`, `--ds-section-y`, `--ds-page-top`.

## Hero

Asset: `src/assets/images/hero-img.png`.

| Breakpoint | Height |
| --- | --- |
| Mobile | about 70vh + 100px |
| Tablet | about 72vh + 100px |
| Laptop and desktop | about 78vh + 100px |

- Background uses `object-cover` with a center-upper focal point so the workspace stays visible.
- Overlay stack: vertical dark wash, soft vignette, and light brand glows. Text must stay readable without hiding the photograph.
- Content is centered. Label, heading, short paragraph, then two CTAs.
- Headline uses `clamp()` between about 2.15rem and 4.75rem. Emphasize one phrase with the brand gradient.
- Hero is the only section that centers marketing copy.

## Shape, elevation, and motion

| Element | Radius |
| --- | --- |
| Inputs, cards, menus | 16px |
| Mega menu panel | 24px |
| Logo plate | 12px |
| Buttons and the contact pill | fully rounded |

Shadows stay violet-tinted and soft. Do not use hard black drop shadows.

- Sticky header: `0 16px 48px -24px rgba(26, 16, 48, 0.85)` with backdrop blur
- Mega menu: `0 30px 80px -24px rgba(26, 16, 48, 0.75)` with glass fill
- Primary button: brand gradient with a soft violet or magenta glow
- Contact pill: `0 10px 24px -12px rgba(224, 16, 96, 0.9)`

Motion stays short. Fade-up for hero copy. Hover lift on buttons. Navbar background transitions in about 500ms. Mega menu fades and rises a few pixels. Respect `prefers-reduced-motion`.

## Navigation

On the home hero the bar starts transparent. After a short scroll, or on any other page, it becomes a dark glass bar with blur.

- Logo sits on a white plate so both logo colors remain visible.
- Desktop links sit in the center. Contact us sits on the right as a magenta pill.
- Links are white at 80% opacity, full white on hover and when current.
- The current item has a 2px magenta underline.
- Services opens a multi-column glass mega menu with icons, short descriptions, and hover highlight. Escape closes it.
- Below the `xl` breakpoint, a hamburger opens a full-height panel under the bar and locks body scroll.

Do not add icons to top-level links. Do not put the contact action in the same style as a text link.

## Buttons

- Height 48px in page content. The navigation contact pill is 40px.
- Horizontal padding 20–24px.
- Primary: violet-to-magenta gradient, white text, slight hover lift and glow.
- Glass: translucent white fill, white border, used as the secondary hero action.
- Accent: magenta fill, white text. One filled magenta control per view when possible.
- Secondary: mist fill, ink text, for light page surfaces.
- Ghost: no fill, used sparingly.
- Focus: 2px outline, 2px offset. On dark surfaces the outline is white.
- Disabled: 50% opacity, no pointer events.

Do not use bordered ghost buttons as the primary action.

## Inputs

Every field has a visible label above it. Do not use placeholder text as the label.

| Part | Spec |
| --- | --- |
| Label | 14px, weight 500, ink, 8px above the field |
| Input height | 48px |
| Input text | 16px, weight 400, line height 1.5 |
| Textarea | 16px, padding 12px 16px, at least 5 rows |
| Placeholder | muted ink |
| Border | 1px line color, 16px radius, white fill |
| Focus | border becomes violet, plus a 2px violet outline |
| Helper | 12px muted ink, 8px under the field |
| Error | 12px magenta, border becomes magenta |
| Disabled | mist fill, 50% opacity |

Inputs stay at 16px so mobile browsers do not zoom on focus. Group label, field, and helper with 8px gaps. Separate fields by 20px. Place the submit button 20px under the last field, aligned left, not stretched full width unless the screen is narrow.

Required fields use the `required` attribute. Do not mark optional fields with an asterisk.

## Links and imagery

- Inline links are violet, underlined, with a 4px offset.
- Navigation links are not underlined except for the current magenta rule.
- The logo file is `src/assets/images/logo.png`. Do not redraw it, recolor it, or set it on violet.
- Leave clear space around the logo equal to the height of the “S” in the wordmark.
- The hero photograph is `src/assets/images/hero-img.png`. Load it with priority and a blur placeholder.
- Photographs may sit under a dark or violet wash. Do not put type smaller than 16px on a photograph.

## Accessibility

- Interactive targets are at least 40px tall. Page buttons and inputs are 48px.
- Every input has a label tied with `htmlFor` and `id`.
- Current pages set `aria-current="page"`.
- The services menu sets `aria-expanded` and `aria-haspopup`.
- Focus must stay visible. Do not remove outlines without replacing them.
- Color is not the only current-page signal. The navigation also uses weight and an underline.

## Do not

- Do not add colors outside this palette.
- Do not place the full-color logo on violet, magenta, or a photograph.
- Do not use more than one magenta filled control in the same view.
- Do not center long paragraphs outside the hero.
- Do not use light gray text for anything a visitor must read.
- Do not invent a second button shape. Pills for actions, 16px radius for surfaces.
