# Design System: Agentic Summer — Inner Circle

## 1. Visual Theme & Atmosphere
A cinematic, editorial-grade landing experience with bold typographic authority and restrained material warmth. The atmosphere is conference-keynote confident — dark immersive hero with video backdrop fading into bright, airy white content sections scattered with hand-crafted polaroid textures. It feels like a premium tech event brand that takes its visual identity as seriously as its mission.

- **Density:** 4 — Art Gallery Airy. Generous whitespace between sections, content breathes.
- **Variance:** 7 — Offset Asymmetric. Hero split layout, staggered carousel, scattered polaroid photos at organic angles.
- **Motion:** 6 — Fluid CSS. Center-focused carousel with spring-scale transitions, FAQ grid reveal, subtle hover state shifts.

## 2. Color Palette & Roles
- **Pure Surface** (#FFFFFF) — Primary background for content sections, cards, polaroid frames
- **Charcoal Ink** (#18181B) — Primary text color. Zinc-950 depth. Never pure `#000000`
- **Muted Steel** (rgba(0,0,0,0.6)) — Secondary text, descriptions, metadata, tag labels
- **Fog Tint** (rgba(0,0,0,0.04)) — FAQ item backgrounds, subtle surface differentiation
- **Ash Divider** (rgba(0,0,0,0.06)) — Tag pill backgrounds, structural separation
- **Hero Dark** — Video/image background with gradient overlay (rgba(0,0,0,0.7) at 29.56%)
- **Frosted Glass** (rgba(255,255,255,0.1)) — Glass-morphism buttons over dark surfaces
- **Translucent White** (rgba(255,255,255,0.6)) — Secondary text on dark backgrounds
- **Warm White** (rgba(255,255,255,0.3)) — Input backgrounds in footer

**No dedicated accent color.** The brand relies on photographic color from event imagery and video as its vibrancy. CTAs are black-on-white or black-outline — no colored buttons anywhere.

**Banned:** Purple, neon, gradients on text, outer glow shadows, oversaturated accents.

## 3. Typography Rules
- **Display/Headlines:** `Geist Medium` (500) — Track-tight (-3.5px on 70px, -3px on 60px). Hierarchy through size and weight only. Headlines use text-balance.
- **Body:** `Geist Regular` (400) — Relaxed leading (1.2), letter-spacing -0.6px to -1.2px. Max 65ch. Body uses text-pretty.
- **Handwritten:** `Bradley Hand Bold` — Polaroid captions only. 12px, tight leading. Not used anywhere else.
- **Mono:** Not present in current design. If needed for data: `Geist Mono` with tabular-nums.

**Scale (descending):**
| Role | Size | Weight | Tracking |
|------|------|--------|----------|
| Section Heading | 70px | 500 | -3.5px |
| Quote / Mission | 60px | 500 | -3px |
| Card Title | 32px | 500 | -1.6px |
| FAQ Question | 26px | 500 | -1.3px |
| Hero Subtitle / Body | 24px | 400 | -1.2px |
| Body / Description | 20px | 400 | -0.6px to -1px |
| Tag | 18px | 400 | -0.9px |
| City Card Date / Meta | 16px | 400 | -0.48px |
| Footer Small | 14px | 400 | -0.7px |
| Polaroid Caption | 12px | Bold | -0.36px |

**Banned:** Inter, Times New Roman, Georgia, Garamond, Palatino. No serif fonts anywhere in this project.

## 4. Component Stylings

### Buttons
- **Primary (Join In Now):** White fill, 14px radius, 45px height, 140px width. Contains gradient blob image for subtle color wash. Inner inset shadow for tactile depth. No outer glow.
- **Ghost (Explore Events):** Frosted glass (rgba(255,255,255,0.1)), backdrop-blur 4.5px, 14px radius. White text. Hover brightens to 0.16 alpha.
- **Outline (Section CTAs):** 1px solid black border, transparent fill, 14px radius. Hover inverts to black fill + white text. Transition 200ms ease-out.
- **Active State:** No custom cursors. Standard pointer.

### Cards — Event Cards
- 16px border-radius. Full-width images at 536px height. No elevation shadow — images do the heavy lifting.
- Below image: title, description, tag row. Clean vertical stack with 24px gap.

### Cards — City Carousel Cards
- 16px border-radius, overflow hidden. Gradient overlay from bottom (rgba(0,0,0,0.76) to transparent at 69.47%).
- Text info pinned 26px from bottom-left.
- Three sizes via transform scale: center (1x, 337x452), adjacent (0.926x), outer (0.863x), edge (0.77x).

### Tags
- Pill shape (10px radius), padding 5px 10px. Background rgba(0,0,0,0.06). Muted text color.

### Polaroids
- White frame with padding 7.332px, bottom padding 10.082px. Border-radius 4.583px.
- Box-shadow: 0 3.666px 21.446px rgba(0,0,0,0.11). Organic rotation transforms (-5.95deg to +12.7deg).
- Handwritten captions centered below image.

### FAQ Accordion
- 16px border-radius, rgba(0,0,0,0.04) background. Hover to 0.07 alpha.
- Icon: CSS-only plus/minus using ::before/::after pseudo-elements. Vertical bar fades via opacity + rotate on open.
- Answer reveal: `grid-template-rows: 0fr to 1fr` — no max-height animation. 200ms ease-out.

### Footer
- Full-bleed background image with gradient overlay (top-down, 0.2 opacity fading to transparent at 55%).
- Email input: frosted glass (rgba(255,255,255,0.3)), backdrop-blur, 10px radius.
- Subscribe button: white fill, 10px radius.

## 5. Layout Principles
- **Max-width:** 1440px centered container for all content sections.
- **Section Padding:** Horizontal 50px (nav, events, footer). Mission section 276px horizontal padding for text containment.
- **Section Gaps:** 140px vertical padding between major sections.
- **Hero:** Full viewport height (100vh, min 700px). Content pinned 60px from bottom.
- **Grid Strategy:** Flexbox for card rows (3-column events grid with 20px gap). CSS positioning for carousel.
- **Asymmetry:** Hero uses split layout (left: headline/CTA, right: partners). Mission section has organic polaroid scatter. Carousel uses center-weighted stagger.
- **Responsive Collapse:** Single column below 768px. Headlines scale with viewport.
- **No Overlap:** Every element occupies its own spatial zone. Polaroids are positioned in corners around central text, not overlapping it.

## 6. Motion & Interaction
- **Carousel:** Center-focused staggered layout. Active card at full scale, adjacent cards scale down progressively. `transform` and `opacity` only — 500ms cubic-bezier(0.4, 0, 0.2, 1). Auto-advances every 1800ms. Pauses on hover and when off-screen (IntersectionObserver).
- **FAQ:** Grid-based reveal (0fr to 1fr). Icon rotation via transform. 200ms ease-out.
- **Buttons:** Background color transition 200ms. No transform animations on buttons.
- **Links:** Opacity transition 200ms on nav links.
- **Performance:** Animate exclusively via `transform` and `opacity`. No `width`, `height`, `top`, `left`, `margin`, `padding` animation. No static `will-change`.
- **Reduced Motion:** Respect `prefers-reduced-motion` — disable carousel auto-scroll and FAQ animation.

## 7. Anti-Patterns (Banned)
- No emojis anywhere in the interface
- No `Inter` font — Geist is the system typeface
- No generic serif fonts
- No pure black (`#000000`) for text — use Zinc-950 (#18181B)
- No neon or outer glow shadows
- No purple, no multicolor gradients
- No gradient text on headers
- No custom mouse cursors
- No overlapping elements
- No centered Hero layouts (hero is split left/right)
- No 3-equal-column feature grids without visual variance
- No AI copywriting cliches ("Elevate", "Seamless", "Unleash", "Next-Gen")
- No filler UI text ("Scroll to explore", bouncing chevrons, scroll arrows)
- No broken Unsplash links — local assets only
- No generic placeholder names
- No circular loading spinners — skeletal loaders only
- No `h-screen` — use `100vh` with `min-height` fallback (dvh when Tailwind available)
- No animating layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`)
- No static `will-change` — only during active animations
