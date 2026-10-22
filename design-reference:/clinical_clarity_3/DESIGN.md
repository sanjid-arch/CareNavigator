---
name: Clinical Clarity
colors:
  surface: '#f6f9ff'
  surface-dim: '#c8dcf0'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf5ff'
  surface-container: '#e1f0ff'
  surface-container-high: '#d6ebfe'
  surface-container-highest: '#d1e5f8'
  on-surface: '#091d2b'
  on-surface-variant: '#3e494a'
  inverse-surface: '#1f3241'
  inverse-on-surface: '#e6f2ff'
  outline: '#6e797b'
  outline-variant: '#bdc9ca'
  surface-tint: '#006874'
  primary: '#00646f'
  on-primary: '#ffffff'
  primary-container: '#087f8c'
  on-primary-container: '#effdff'
  inverse-primary: '#79d4e2'
  secondary: '#2060a3'
  on-secondary: '#ffffff'
  secondary-container: '#80b6fe'
  on-secondary-container: '#004681'
  tertiary: '#00656c'
  on-tertiary: '#ffffff'
  tertiary-container: '#008089'
  on-tertiary-container: '#effeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f1ff'
  primary-fixed-dim: '#79d4e2'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f57'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#82f3ff'
  tertiary-fixed-dim: '#57d8e4'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f55'
  background: '#f6f9ff'
  on-background: '#091d2b'
  surface-variant: '#d1e5f8'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: '0'
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: '0'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an environment of clinical precision, reassurance, and absolute operational clarity. Built for modern healthcare SaaS workflows—spanning practitioner consoles, patient triage feeds, and longitudinal health records—it rejects decorative flourishes, skeuomorphic noise, and gratuitous gradients in favor of structural legibility, unshakeable stability, and calm focus.

### Tone & Personality
- **Authoritative & Measured:** Every layout choice communicates procedural discipline and clinical trustworthiness.
- **Calm Under Stress:** High-stress medical situations demand rapid comprehension. Interfaces are low-fatigue, balanced, and orderly.
- **Accessible & Transparent:** Visual cues never conceal crucial state data. Meaning is unmistakable, deliberate, and accessible to varied cognitive and physical needs.

### Aesthetic Foundation
- **Modern Minimal Clinical:** Generous white space, disciplined 8-point spatial cadence, razor-sharp typographic scale, and subdued surface boundaries.
- **Pure Solid Surfaces:** Flat, authentic surface tiers with no ambient gradients or chromatic lighting effects. Visual differentiation is achieved strictly through deliberate contrast, purposeful line work, and disciplined layout rhythm.

## Colors

The palette balances clinical precision with reassuring undertones. Light mode serves as the canonical environment, anchored by a soft clinical slate canvas (`#F7FAFC`) that eliminates eye strain from harsh pure-white screens while preserving high contrast against pure white (`#FFFFFF`) card surfaces.

### Core Roles
- **Primary Teal (`#087F8C`):** Core interactive states, active navigational anchors, primary action triggers, and authoritative focus rings.
- **Secondary Medical Blue (`#2563A6`):** Secondary interactive elements, analytical charts, administrative identifiers, and navigational wayfinding.
- **Cyan Accent (`#36BFCB`):** Informational callouts, active timeline markers, and subtle high-priority highlights.
- **Deep Navy (`#16324F`):** High-level structural containers, static top-level app chrome, and deep categorical headers.
- **Pale Cyan Tint (`#E7F7F8`):** Low-contrast active surface fills, selected table rows, hover container backgrounds, and mild informational banners.

### Neutrals & Structural Palette
- **Canvas / Page Background:** `#F7FAFC`
- **Surface / Card Background:** `#FFFFFF`
- **Primary Text:** `#243746` (Delivers an accessible contrast ratio > 9:1 against white)
- **Secondary Text:** `#64748B` (Supporting metadata, timestamps, and field labels; passes WCAG AA contrast)
- **Border / Dividers:** `#E2E8F0` (Structural definition and card container outlines)

### Functional & Clinical Status
- **Success (`#21865B`):** Normal parameters, confirmed actions, verified patient records.
- **Warning (`#B7791F`):** Approaching thresholds, non-critical alerts, incomplete documentation.
- **Emergency / Critical (`#C62828`):** Vitals out of bound, high-priority triage, contraindications, system errors.

### Accessibility Protocol
Status indicators must never rely on color hue in isolation. Every state or alert pairing must incorporate an explicit vector icon alongside descriptive textual labels to ensure safety across all visual abilities.

## Typography

The typography uses Inter across all hierarchical tiers to maximize legibility of technical clinical data, laboratory readings, and tabular patient documentation. 

### Typographic Hierarchy Rules
- **Numerical Alignment:** For vitals, dosage measurements, and time-stamped clinical notes, apply tabular figures (`font-variant-numeric: tabular-nums`) to preserve vertical column alignment.
- **Letter Spacing:** Tighter tracking on display and major headlines imparts crisp structural authority; positive tracking on small labels (`label-sm`, `label-md`) optimizes instant identification on dense screens.
- **Vertical Rhythm:** Line heights conform strictly to an even 4px/8px baselining convention, ensuring seamless co-existence alongside adjacent icons and input controls.

## Layout & Spacing

Layout geometry follows an exact 8-point spatial grid system, with a 4px sub-grid reserved for tight component micro-spacing (such as icon-to-label offsets and badge padding).

### Spatial Scale
- **4px (`space-xs`):** Micro-insets, inner chip padding, icon/label inline gap.
- **8px (`space-sm`):** Dense control padding, form element vertical rhythm, alert internal spacing.
- **16px (`space-md`):** Card inner content padding, standard field spacing, button horizontal padding.
- **24px (`space-lg`):** Section gaps, expansive container padding, primary card margins.
- **32px (`space-xl`):** Major module boundaries, dashboard widget separation.
- **48px & 64px:** Canonical page-level section breaks and landing layout transitions.

### Grid & Breakpoints
- **Desktop (≥1200px):** 12-column fluid grid, 24px (`1.5rem`) gutter, 32px (`2rem`) outer margin. Dashboard layouts use fixed 240px or 72px collapsed side navigation with fluid analytical viewports.
- **Tablet (768px – 1199px):** 8-column grid, 16px (`1rem`) gutter, 24px (`1.5rem`) outer margin. Side navigation collapses into an overlay or icon rail.
- **Mobile (<768px):** 4-column grid, 16px (`1rem`) gutter, 16px (`1rem`) outer margin. Multi-column forms and split metric cards reflow into a clean, single-column vertical stack.

## Elevation & Depth

To preserve clinical focus and reduce visual noise, this system minimizes reliance on heavy drop shadows. Depth is communicated primarily through distinct surface tiers and 1px structural borders, complemented by subtle, ultra-soft shadows.

### Surface Hierarchy
1. **Canvas Tier (`#F7FAFC`):** Lowest layer; hosts the structural layout, canvas backdrop, and workspace framing.
2. **Surface Tier (`#FFFFFF`):** Work surfaces, analytical cards, data tables, and structured form blocks. These elements employ a crisp 1px border (`#E2E8F0`) and an ambient shadow: `0 1px 3px rgba(22, 50, 79, 0.04), 0 1px 2px rgba(22, 50, 79, 0.02)`.
3. **Elevated Overlays (`#FFFFFF`):** Dropdowns, popovers, select menus, and contextual tooltips. Border remains 1px (`#E2E8F0`), elevated with an expanded ambient shadow: `0 4px 6px -1px rgba(22, 50, 79, 0.07), 0 2px 4px -2px rgba(22, 50, 79, 0.05)`.
4. **Modal & Critical Alert Dialogs (`#FFFFFF`):** Floating clinical prompts, medication verification confirmations, and triage overrides. Accompanied by a 30% deep navy backdrop tint (`#16324F` at 0.30 opacity) with an elevation shadow of `0 10px 15px -3px rgba(22, 50, 79, 0.08), 0 4px 6px -4px rgba(22, 50, 79, 0.04)`.

## Shapes

The design uses balanced, rounded geometry (level `2`) to project an approachable, calm demeanor without compromising structural compactness.

### Geometry Specifications
- **Controls & Form Elements (Inputs, Selectors, Buttons):** Configured with 8px (`0.5rem`) to 10px border radius for ergonomic clarity and defined tap targets.
- **Cards, Panels & Data Containers:** Configured with 12px (`0.75rem`) to 16px (`1rem`) border radius, framing data neatly without aggressive corner curvature.
- **Pills, Badges & Chips:** Completely rounded / circular endpoints (`9999px`) to immediately distinguish categorical statuses and contextual metadata from interactive input controls.

## Components

### Buttons
- **Primary:** Solid `#087F8C` background, white label, 8px border-radius, `label-lg` font. Height: 40px (desktop) / 44px (touch). Focus state: 2px offset with a 2px `#087F8C` ring. Hover: darkened to `#066B76`. Active: `#055861`.
- **Secondary:** Surface `#FFFFFF`, 1px border in `#E2E8F0`, text `#243746`. Hover: `#F7FAFC` surface with border `#CBD5E1`.
- **Tertiary / Ghost:** Transparent background, text `#087F8C`, hover fills with `#E7F7F8`.
- **Critical / Destructive:** Solid `#C62828` background (or ghost with `#C62828` text and border), paired with explicit warning icon.

### Form Inputs & Select Fields
- **Container:** Height 40px, 8px border-radius, background `#FFFFFF`, border 1px `#E2E8F0`.
- **Typography:** Value in `#243746` (`body-md`), placeholder in `#64748B`.
- **States:**
  - *Focus:* 1px border `#087F8C` accompanied by a 3px outward focus halo in `#36BFCB` at 25% opacity.
  - *Error:* 1px border `#C62828` accompanied by an inline alert icon and `#C62828` error text below the field.
- **Labels:** Positioned consistently above inputs in `label-md` weight using `#243746`.

### Cards & Container Modules
- **Geometry:** 12px or 16px border-radius, 1px solid `#E2E8F0` border, `#FFFFFF` solid fill.
- **Spacing:** Inner padding of 24px (`space-lg`) on desktop, collapsing to 16px (`space-md`) on mobile.
- **Header Structure:** Clear structural separation with optional bottom divider (1px `#E2E8F0`) isolating title (`headline-sm`) and contextual actions from the body metrics.

### Checkboxes & Radio Buttons
- **Geometry:** Checkboxes: 18x18px with 4px border radius. Radios: 18x18px full circle.
- **Border & Fill:** Unchecked: 1.5px border `#CBD5E1`, `#FFFFFF` fill. Checked: solid `#087F8C` fill with white checkmark or center pip.
- **Focus:** 2px focus halo in `#087F8C` (offset 2px).

### Chips & Clinical Status Badges
- **Shape:** Full pill radius (`9999px`), vertical padding 4px, horizontal padding 10px.
- **Structure:** Always composed of an 8px indicator circle or 14px vector line icon + explicit text (`label-sm`).
- **Variants:**
  - *Normal / Success:* Pale green tint (`#E8F5E9`), text `#21865B`, icon check.
  - *Caution / Warning:* Pale amber tint (`#FEF3C7`), text `#B7791F`, icon alert-triangle.
  - *Emergency / Critical:* Pale red tint (`#FFEBEE`), text `#C62828`, icon alert-circle.
  - *Informational:* Tint `#E7F7F8`, text `#087F8C`, icon info.

### Tables & Data Grids
- **Header:** Background `#F7FAFC`, text `#64748B` (`label-md`), height 44px, bottom border 1px `#E2E8F0`.
- **Row:** Height 52px, text `#243746` (`body-md`), bottom border 1px `#E2E8F0`. Hover state triggers background fill of `#E7F7F8` at 50% opacity.
- **Numbers & Vitals:** Right-aligned, using tabular numerals.

### Iconography
- **Style:** Clean, 1.5px to 2px stroke monoline vector icons (Lucide/heroicons style).
- **Sizing:** Standard functional icon size is 20x20px within controls; 16x16px for inline data indicators.