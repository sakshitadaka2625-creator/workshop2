---
name: Midnight Electric
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system establishes an electric, midnight-atmosphere experience tailored for collegiate campus life. Designed to maximize retention and engagement among Gen Z students and campus organizers, the visual aesthetic blends sleek dark glassmorphism with high-contrast neon accents. It evokes the kinetic energy of evening student life—hackathons, underground campus gigs, club rush fairs, and late-night study marathons.

The visual direction centers on ultra-refined frosted glass planes hovering over a deep midnight background (`slate-950` to `midnight-900`). Tactile translucency, ambient neon glow highlights, and razor-sharp typographic hierarchies ensure heavy daily usage without visual fatigue, turning transactional event signups into an immersive social hub.

## Colors
The palette leverages a deep, light-absorbing base paired with tri-chromatic neon highlights to denote status, urgency, and category.

- **Primary (`#8B5CF6` Electric Violet):** The dominant action color for primary CTAs, active tab strokes, interactive card states, and personal student identity nodes.
- **Secondary (`#06B6D4` Cyan Pulse):** Denotes live happenings, campus map nodes, real-time RSVP counts, and tech/academic club taxonomies.
- **Tertiary (`#F59E0B` Amber Spark):** Flags high-priority notifications, limited seating, flash pop-up events, and administrative leadership roles.
- **Neutral Base (`#0B0F19` Deep Midnight):** The foundational infinite canvas that allows translucent glass layers (`rgba(17, 24, 39, 0.65)`) to float without high ambient glare.

Subordinate surfaces use subtle cold-slate translucent borders (`rgba(148, 163, 184, 0.12)`) to capture refraction along edges.

## Typography
The system balances structural futurism with high-legibility social reading:

- **Display & Headlines (Space Grotesk):** Gives titles, event banners, and organizational headers a sharp, modern collegiate identity with crisp geometric punch.
- **Body & Content (Plus Jakarta Sans):** Supplies a warm, approachable, hyper-legible cadence across event briefs, discussions, and time-stamped schedules.
- **System Identifiers & Roles (JetBrains Mono):** Reserved for technical indicators, student ID badges, pass authentication tokens, room numbers, and role switcher metadata.

## Layout & Spacing
A responsive fluid-grid architecture tailored for mobile handheld usage, extending into modular horizontal card rails and multi-column dashboards on desktop.

- **Mobile (< 768px):** 4-column layout with 16px margins and gutters. Single-column card stacking, sticky bottom navigation, and horizontal chip scrolls.
- **Tablet (768px – 1024px):** 8-column layout with 24px margins. Two-column event grids with persistent category side-drawers.
- **Desktop (> 1024px):** 12-column layout capped at 1280px max-width, 40px outer margins, and 24px gutters. Tri-column layout housing navigation, central dynamic feed, and pinned user/ticket telemetry.

## Elevation & Depth
Depth is created through frosted glassmorphism rather than heavy opaque drop shadows:

- **Canvas Base:** `#0B0F19` with subtle multi-stop radial gradient light pools (`rgba(139, 92, 246, 0.08)` and `rgba(6, 182, 212, 0.05)`).
- **Glass Panel Surface:** `rgba(15, 23, 42, 0.65)` layered over an 18px backdrop blur (`backdrop-filter: blur(18px) -webkit-backdrop-filter: blur(18px)`).
- **Border Refraction:** `1px solid rgba(255, 255, 255, 0.08)` on neutral containers; active containers use `1px solid rgba(139, 92, 246, 0.35)` or `1px solid rgba(6, 182, 212, 0.35)`.
- **Atmospheric Glow:** Interactive hovering elements project an ambient colored glow: `0 10px 25px -5px rgba(139, 92, 246, 0.25)`.

## Shapes
A pill-forward shape hierarchy is employed to convey an intuitive, mobile-native touch experience. 

- Interactive controls, status tags, role badges, and filter chips leverage full pill radii (`9999px`).
- Surface wrappers and event modal cards utilize `rounded-xl` (32px) and `rounded-lg` (24px) corners to preserve a soft, touchable presence against dark, luminous layers.

## Components

### Buttons
- **Primary Action:** Pill-shaped, gradient-infused background (`linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)`), crisp white text, and a focused glow on hover.
- **Secondary Action:** Translucent glass surface (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(255, 255, 255, 0.12)`, text color slate-200.
- **Tertiary Ghost:** Zero-fill button with violet or cyan text, accompanied by underlined indicators on focus.

### Chips & Filter Selectors
- **Default State:** Fully rounded pill container, dark slate-800/50 glass, subtle border (`1px solid rgba(255, 255, 255, 0.08)`), text in `body-sm`.
- **Selected State:** Glow border (`#06B6D4` or `#8B5CF6`), text color inverted to pure white, accompanied by a pulsing status dot indicator.

### Role Switcher & Database ID Header
- Header element framing the student's status (`Student`, `Club Lead`, `Admin`) in an inline monospaced container (`JetBrains Mono`, `label-code`).
- Combines an avatar node, a status indicator dot (Green: Live, Violet: Busy, Amber: Away), and an ID hash (`#CC-8942-STU`) enclosed inside an etched glass frame.

### Frosted Glass Cards
- Built using `rgba(15, 23, 42, 0.65)` with an 18px backdrop blur and `rounded-xl` corners.
- Displays responsive image ratio banners, electric micro-badges for tags (e.g., `#HACKATHON`, `#FREE-FOOD`), real-time attendee avatars, and quick RSVP action triggers.

### Checkboxes & Radio Controls
- Circular and rounded radio buttons embedded in neon accent rings. Active states pop with an inner solid cyan `#06B6D4` pip and localized radial diffusion.

### Input Fields
- Frosted text inputs (`rgba(15, 23, 42, 0.8)`) with `rounded-lg` or pill profiles, subtle placeholder text (`slate-400`), transitioning to an electric violet border stroke upon focus.