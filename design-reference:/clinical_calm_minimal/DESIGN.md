---
name: Clinical Calm Minimal
colors:
  surface: '#f8f9ff'
  surface-dim: '#c3dcff'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dbe9ff'
  surface-container-highest: '#d2e4ff'
  on-surface: '#001d37'
  on-surface-variant: '#3e494a'
  inverse-surface: '#16324f'
  inverse-on-surface: '#eaf1ff'
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
  background: '#f8f9ff'
  on-background: '#001d37'
  surface-variant: '#d2e4ff'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.025em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an environment of clinical reassurance, uncompromising clarity, and quiet precision. Designed for an AI-assisted triage and care navigation platform, it rejects theatrical tech tropes, high-saturation gradients, and sensory-overload patterns in favor of structured visual serenity. 

The aesthetic is anchored in contemporary clinical minimalism: functional white space, structured tabular alignments, and low-cognitive-load layouts that reduce panic and guide patients and triage staff effortlessly. Every interaction communicates clinical authority, trust, and empathetic efficiency. Visual urgency is communicated strictly through deliberate semantic signals rather than aggressive visual weight.

## Colors

The color architecture is built around stabilizing, therapeutic oceanic and slate tones. The foundation relies on a sterile yet gentle `#F7FAFC` page background with pure `#FFFFFF` surfaces, framed by faint `#E2E8F0` borders.

### Semantic & Functional Roles
- **Primary Teal (`#087F8C`)**: Main brand color, primary actions, core navigation elements, active progress states.
- **Cyan Accent (`#36BFCB`)**: Focus states, interactive highlights, subtle informative tags, and interactive indicators.
- **Medical Blue (`#2563A6`)**: System-level communications, informational banners, clinical data highlights, and secondary actions.
- **Deep Navy (`#16324F`)**: Primary structural frames, dark toolbars, authoritative headers, and deep contrast anchors.
- **Pale Cyan Tint (`#E7F7F8`)**: Interactive hover states, active list selections, background fills for clinical callouts, and triage prompt panels.
- **Text Primary (`#243746`)**: High-contrast, fatigue-reducing primary typographic content (ensuring AA/AAA compliance against `#FFFFFF` and `#F7FAFC`).
- **Text Secondary (`#64748B`)**: Metadata, supporting timestamps, form field labels, and secondary guidance.
- **Triage & Status Tokens**:
  - **Success / Routine (`#21865B`)**: Resolved conditions, non-urgent care recommendations, stable metrics.
  - **Warning / Moderate (`#B7791F`)**: Semi-urgent review, delayed triage flags, scheduling warnings.
  - **Emergency / High Acuity (`#C62828`)**: Immediate medical attention warnings, severe alert states, critical contradictions. Never used decoratively.

## Typography

Typography prioritizes legibility, scanning efficiency, and typographic hierarchy. Powered uniformly by `Inter`, the type scale guarantees sharp rendering across dense clinical telemetry, diagnostic summaries, and mobile triage flows.

### Typographic Principles
- Headings maintain restrained negative tracking to enforce cohesion without sacrificing optical clearance.
- Body copy relies on generous line heights (`1.5` to `1.6`) to prevent eye fatigue during prolonged intake sessions.
- Clinical metadata, status badges, and vitals rely on `label-sm` or `label-md` with subtle letter spacing to preserve distinction in dense interfaces.
- Critical symptom summaries must never be smaller than `body-sm` (14px) to comply with patient safety standards.

## Layout & Spacing

The layout is anchored on an uncompromising 8-point spatial rhythm (`0.5rem`, `1rem`, `1.5rem`, `2rem`), allowing micro-adjustments via `space-xs` (4px) only for compact indicators and form element padding.

### Grid & Form Factors
- **Desktop (1200px+)**: 12-column responsive grid with `2rem` outer margin and `1.5rem` gutters. Maximum application canvas width is capped at 1440px to prevent visual tracking strain in clinical dashboards.
- **Tablet (768px - 1199px)**: 8-column grid with `1.5rem` outer margins and `1rem` gutters. Persistent sidebars collapse into accessible drawer panels or a minimal icon navigation strip.
- **Mobile (< 768px)**: 4-column fluid layout with `1rem` outer margins and `1rem` gutters. Triage question steps convert to full-bleed vertical stacks, pinning primary triage actions to the bottom safe area.

## Elevation & Depth

This design system avoids theatrical depth. It relies on a flat, tonal surface model supplemented by crisp 1px borders and two minimal shadow tiers:

- **Base Layer (0dp)**: Surface `#FFFFFF` resting on Canvas `#F7FAFC`, demarcated purely by a 1px solid `#E2E8F0` border. This is the primary presentation state for all clinical cards, triage step containers, and data tables.
- **Elevated Interactive (1dp)**: `box-shadow: 0 1px 3px 0 rgba(22, 50, 79, 0.05), 0 1px 2px -1px rgba(22, 50, 79, 0.05)`. Used on hover states for selectable triage options, standard dropdowns, and resting floating bars.
- **Overlays & Modals (2dp)**: `box-shadow: 0 10px 15px -3px rgba(22, 50, 79, 0.08), 0 4px 6px -4px rgba(22, 50, 79, 0.04)`. Applied to emergency modals, provider profile slide-overs, and diagnostic review dialogs. Modals rest atop a backdrop tint of `#16324F` at 35% opacity.

## Shapes

The geometric architecture uses balanced, friendly roundedness to project calm and modern approachability while retaining professional structure.

- **Interactive Controls (Inputs, Buttons, Dropdowns, Chips)**: Fixed at `0.5rem` (8px) to `0.625rem` (10px) border-radius, presenting an accessible, click-friendly appearance without entering child-like pill forms.
- **Cards, Panels & Modal Containers**: Styled with `rounded-lg` (`1rem` / 16px) border-radius for outer contours. Internal nested containers scale down to `0.5rem` (8px) to maintain geometric harmony.
- **Status Pills & Inline Tags**: Fully rounded caps (`rounded-full` / 9999px) strictly reserved for small status badges, ensuring they read instantly as meta-information rather than actionable buttons.

## Components

### Buttons
- **Primary**: Solid `#087F8C` background, white text, 8px border-radius, font-weight 600. Hover transitions to `#066570`. No shadow; active state shifts slightly darker. Focus ring uses `#36BFCB` with a 2px offset.
- **Secondary / Outline**: `#FFFFFF` background, `#087F8C` text, 1px solid `#087F8C`. Hover applies `#E7F7F8` fill.
- **Tertiary / Ghost**: Transparent background, `#243746` text. Hover uses `#F7FAFC`.
- **Destructive / Emergency**: `#C62828` background, white text. Exclusively reserved for urgent interventions or high-risk confirmations.

### Form Inputs & Selects
- 1px solid `#E2E8F0` border, `#FFFFFF` background, 8px radius, height 40px (desktop) or 44px (mobile).
- Focused: `#087F8C` border accompanied by an ambient 2px `#36BFCB` glow (opacity 30%).
- Error state: 1px solid `#C62828` border with accompanying inline icon and text below.

### Cards & Care Navigators
- Resting state: `#FFFFFF` surface, 1px solid `#E2E8F0`, 16px border-radius, padded with `1.5rem` (`space-lg`).
- Interactive selection cards (e.g., triage answer selection): 1px solid `#E2E8F0` shifting to 2px solid `#087F8C` with `#E7F7F8` background tint when selected.

### Triage & Urgency Badges
- High Acuity / Immediate Attention: Background `#FDE8E8`, text `#C62828`, border `#F8B4B4`. Must always be paired with a clinical exclamation mark or emergency icon and explicit textual label (e.g., "Immediate Action Required").
- Routine / Low Acuity: Background `#DEF7EC`, text `#21865B`, border `#BCF0DA`.
- Moderate / Review: Background `#FEF08A`, text `#B7791F`, border `#FDE047`.

### AI Assistant & Clinical Disclaimers
- AI recommendations and reasoning cards feature an `#E7F7F8` pale tint, 1px `#36BFCB` border, and an authoritative clinical disclaimer footer rendered in `#64748B` (`body-sm`) stating algorithmic boundaries clearly.