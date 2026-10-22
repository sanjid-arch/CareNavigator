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
  secondary: '#006970'
  on-secondary: '#ffffff'
  secondary-container: '#75f2fe'
  on-secondary-container: '#006d75'
  tertiary: '#1a5c9e'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b75b9'
  on-tertiary-container: '#fafaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#95f1ff'
  primary-fixed-dim: '#79d4e2'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f57'
  secondary-fixed: '#82f3ff'
  secondary-fixed-dim: '#57d8e4'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f55'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a4c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004883'
  background: '#f6f9ff'
  on-background: '#091d2b'
  surface-variant: '#d1e5f8'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
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

This design system serves a modern healthcare SaaS environment designed for clinical operators, care teams, and patient administrators. The aesthetic is built on restraint, quiet precision, and high legibility. In high-pressure clinical workflows, visual noise translates directly into cognitive fatigue and administrative risk; this system neutralizes both through systematic white space, balanced contrast, and structured information density.

The visual direction combines **Minimalism** with structural **Modern Corporate** clarity:
- **Atmosphere:** Calm, sterile yet humane, orderly, and highly stable.
- **Visual Weight:** Surfaces are flat or gently layered, avoiding decorative treatments, exaggerated blurs, or saturated gradients.
- **Accessibility & Safety:** Form follows clarity. Critical telemetry, alerts, and vital indicators require explicit typography, paired iconographic reinforcement, and dedicated layout real estate.

## Colors

The palette establishes an immediate sense of biological safety and clinical composure.

### Palette Architecture
- **Primary Teal (`#087F8C`):** Anchors primary actions, brand presence, navigation selections, and key interactive controls.
- **Secondary Cyan (`#36BFCB`):** Acts as an active accent, progress indicator, and interactive hover highlight.
- **Medical Blue (`#2563A6`):** Dedicated to technical data visualizations, non-urgent informational callouts, and longitudinal tracking.
- **Deep Navy (`#16324F`):** Used for deep chrome, mastheads, high-contrast headers, and high-emphasis structural frames.
- **Pale Cyan Tint (`#E7F7F8`):** Subtle wash for active rows, selected chips, and primary surface container backgrounds.
- **Page Canvas (`#F7FAFC`):** A soft, cool off-white neutral that eliminates optical glare during prolonged clinical shifts.
- **Card Surface (`#FFFFFF`):** High-purity white used to foreground data containers, patient charts, and interactive modals.
- **Text Primary (`#243746`):** Deep slate-teal providing high contrast without the harshness of pure black.
- **Text Secondary (`#64748B`):** Neutral slate for metadata, supporting timestamps, labels, and helper copy.
- **Subtle Borders (`#E2E8F0`):** Crisp 1px boundary lines that organize dense clinical tables and cards without visual weight.

### Semantic Triage States
State colors are strictly reserved for clinical status communication and system warnings:
- **Success (`#21865B`):** Normal test ranges, confirmed appointments, completed chart notes.
- **Warning (`#B7791F`):** Pending approvals, non-critical lab anomalies, drug interaction checks.
- **Emergency / Urgent (`#C62828`):** Critical lab values, statutory triage levels, vital organ distress alerts. Urgency states are strictly forbidden from relying on color alone; every critical instance must couple this hue with an unambiguous icon and a clear text label (e.g., `[Alert Triangle] Critical High: 142 mg/dL`).

## Typography

The design system exclusively utilizes **Inter** for its neutral grotesque proportions, uniform stroke weights, and tall x-height, guaranteeing legibility across compact data views and dense clinical charts.

### Implementation Guidelines
- **Tabular Numerics:** All numeric telemetry, vital sign values, dosages, and medical record identifiers must utilize tabular figures (`font-variant-numeric: tabular-nums;`) to prevent shifting layouts across updating dashboards.
- **Hierarchy Rules:** 
  - `headline-xl` and `headline-lg` are reserved for top-level operational dashboards and clinical patient summaries.
  - `headline-sm` acts as the standard section title inside cards and diagnostic panels.
  - `body-md` is the primary interface reading size for clinical notes, diagnostic reports, and table cell data.
  - `label-sm` is explicitly styled with slight tracking (`0.04em`) and uppercase transformation when used for categorical clinical chips and vital markers (e.g., `SPO2`, `BPM`, `STAT`).

## Layout & Spacing

Layout geometry follows a strict 8-point base grid system, creating clear cadences between patient data cards, diagnostic columns, and form fields. Spacing tokens equate directly to multiples of 4 and 8 pixels:
- `space-xs`: 4px (micro-adjustments, badge inner padding)
- `space-sm`: 8px (icon-to-label gaps, tight item lists)
- `space-md`: 16px (standard component padding, form element stacks)
- `space-lg`: 24px (card interior padding, module separation)
- `space-xl`: 32px (major layout blocks, section divisions)

### Grid Structure
- **Desktop (1200px+):** 12-column responsive fluid grid with `gutter: 1.5rem` (24px) and maximum bounded container width of 1440px. Persistent navigation drawer is fixed at 256px width.
- **Tablet (768px – 1199px):** 8-column layout with `gutter-sm: 1rem` (16px), navigation collapses to an interactive side rail.
- **Mobile (320px – 767px):** 4-column layout with `margin-mobile: 1rem` (16px) margins. Side rails reflow to off-canvas sheets or segmented bottom sheets.

## Elevation & Depth

Visual hierarchy uses flat containment over dramatic visual depth. Surfaces avoid heavy multi-tier drop shadows in favor of crisp 1px borders and delicate ambient separation.

### Elevation Levels
- **Layer 0 (Canvas Base):** Background `#F7FAFC`. Flat, zero elevation.
- **Layer 1 (Card & Module Surface):** Surface `#FFFFFF` enclosed by a continuous 1px outline of `#E2E8F0`. Shadow is faint and diffuse: `0 1px 3px 0 rgba(22, 50, 79, 0.04)`.
- **Layer 2 (Interactive Floating / Menus):** Dropdown menus, popover tooltips, and contextual action menus use `#FFFFFF` bordered with `#E2E8F0` and elevated with `0 4px 12px 0 rgba(22, 50, 79, 0.08)`.
- **Layer 3 (Modals & Clinical Overlays):** Medication confirmation dialogs and order-entry modals sit above a 40% `#16324F` translucent backdrop wash, styled with `0 12px 28px -4px rgba(22, 50, 79, 0.12)`.

Heavy atmospheric drop shadows, heavy colored glow rings, and glassy translucent surfaces are strictly prohibited to ensure maximum contrast and visual calmness.

## Shapes

The design uses balanced, intentional rounding that humanizes the software without feeling playful or casual.

- **Interactive Controls (Buttons, Inputs, Selects):** Standardized on `0.5rem` (8px) radius. This produces a dependable, clickable affordance while maintaining strict alignment alongside neighboring grid items.
- **Cards, Panels, and Data Modules:** Standardized on `rounded-lg` (`0.75rem` / 12px to `1rem` / 16px). Outer card frames use 16px radius; nested modules within them use 12px to ensure geometric harmony.
- **Status Tags, Badges & Pills:** Small state indicators use a full pill radius (`9999px`) to visually differentiate metadata chips from actionable rectangular controls.
- **Iconography Container Shapes:** 8px to 10px rounded squares with 1px border or light tint fill.

## Components

### Buttons & Interactive Controls
- **Primary Button:** `#087F8C` teal background, `#FFFFFF` text, 0.5rem (8px) radius, height 40px, padding `0 1rem`. Hover: `#076B76`. Active: `#065963`.
- **Secondary Button:** Surface `#FFFFFF`, 1px solid `#E2E8F0`, text `#243746`. Hover: `#E7F7F8` background tint with border `#36BFCB`.
- **Destructive Button:** Surface `#FFFFFF`, 1px solid `#C62828`, text `#C62828`. Hover: `#C62828` background with `#FFFFFF` text. Always paired with an alert icon.

### Form Inputs & Selects
- 40px default height, 8px corner radius, background `#FFFFFF`, border 1px solid `#E2E8F0`.
- Text color `#243746` using `body-md`. Placeholder text `#64748B`.
- Focus ring: 2px solid `#36BFCB` offset by 2px white gap.
- Error state: 1px solid `#C62828` border with accompanying `label-md` error copy positioned 4px beneath the field, prepended with a warning glyph.

### Cards & Data Panels
- Background `#FFFFFF`, 1px solid `#E2E8F0`, border-radius 16px, padding `1.5rem` (24px).
- Internal dividers between card header and body: 1px solid `#E2E8F0`, extending edge-to-edge.
- Section titles inside cards use `headline-sm` with text `#16324F`.

### Clinical Triage Badges & Chips
- Fully rounded pill radius, padding `2px 8px`, typography `label-sm`.
- **Urgent / Critical:** Background `#FDE8E8`, border 1px solid `#F8B4B4`, text `#C62828`. Mandatory icon prefix (e.g., `!` exclamation circle). Sample data: `[!] STAT - Immediate Review`.
- **Warning:** Background `#FEF3C7`, border 1px solid `#FCD34D`, text `#B7791F`. Sample data: `[⚠] Lab Delta: +14%`.
- **Normal / Clear:** Background `#DEF7EC`, border 1px solid `#BCF0DA`, text `#21865B`. Sample data: `[✓] Normal Sinus Rhythm`.

### Lists & Data Tables
- Header row: Background `#F7FAFC`, text `#64748B`, font `label-md`, uppercase, border-bottom 1px solid `#E2E8F0`.
- Body row: Background `#FFFFFF`, border-bottom 1px solid `#E2E8F0`, hover state `#E7F7F8` with smooth 150ms transition.
- Row padding: vertical `0.75rem` (12px), horizontal `1rem` (16px).
- Numeric telemetry (e.g., `128/82 mmHg`, `98.6°F`, `MRN #44092-B`) set in Inter with `tabular-nums`.

### Checkboxes & Radios
- Size: 18px × 18px. Border: 1.5px solid `#E2E8F0`, radius 4px (checkbox) or 50% (radio).
- Checked state: Primary teal background (`#087F8C`) with a crisp `#FFFFFF` tick or center dot. Focus ring: 2px solid `#36BFCB`.