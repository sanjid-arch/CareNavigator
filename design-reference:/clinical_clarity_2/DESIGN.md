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
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
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
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
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

This design system delivers a serene, distraction-free environment engineered for clinical workflows, medical staff efficiency, and healthcare operations. The visual atmosphere emphasizes clinical precision, psychological calm, and rapid legibility under cognitive strain. 

The aesthetic is functional minimalism: pure whites, rational alignments, disciplined spacing, and purposeful color usage without gradients or decorative novelties. The interface behaves strictly as a trustworthy decision-support instrument, explicitly avoiding any anthropomorphic or autonomous diagnostic framing. Visual hierarchy is established via deliberate typographic scale and structure rather than excessive ornamentation.

## Colors

The palette balances clinical precision with reassuring undertones:
- **Primary Teal (`#087F8C`)**: Anchors primary workflows, high-priority actions, and brand presence.
- **Medical Blue (`#2563A6`)**: Distinguishes clinical metadata, secondary navigation, and calm contextual indicators.
- **Cyan (`#36BFCB`)**: Serves as a crisp accent for active tab highlights and interactive elements.
- **Deep Navy (`#16324F`)**: Used for persistent structural navigation bars and high-contrast section headers.
- **Pale Cyan (`#E7F7F8`)**: Provides light surface fills for patient focus banners and active selection states.
- **Neutral Primary Text (`#243746`)** and **Secondary Text (`#64748B`)**: Ensure accessible optical contrast across clinical documentation.
- **Canvas (`#F7FAFC`)** and **Cards (`#FFFFFF`)**: Maintain a crisp, hygienic background hierarchy separated by structural borders (`#E2E8F0`).

### Semantic Status Tokens
- **Success (`#21865B`)**: Stable clinical indicators, completed orders.
- **Warning (`#B7791F`)**: Pending lab validations, review advisories.
- **Emergency / High Priority (`#C62828`)**: Critical alerts, abnormal ranges.

### Critical Safety Rule
Urgency, status deviations, and triage levels must never rely solely on color. Every semantic state must be accompanied by a legible text descriptor (e.g., "Critical", "Pending Validation") paired with a distinct, unambiguous line icon.

## Typography

Inter serves as the universal typeface across all roles to ensure maximum optical clarity across data-heavy tables, lab values, and clinical notes. Tabular lining figures (`tnum`) should be enabled across all numerical metrics, timestamps, and laboratory references to guarantee vertical column alignment.

## Layout & Spacing

A strict 8-point spatial system underpins the entire layout, utilizing an occasional 4px half-step (`0.25rem`) exclusively for micro-alignments, tag padding, and dense table rows.

- **Desktop (≥1024px)**: 12-column fluid grid, `2rem` (32px) margins, `1.5rem` (24px) gutters. Complex layouts should partition cleanly into an optional collapsible navigation rail (240px fixed), primary work area, and contextual side-tray (360px–420px).
- **Tablet (768px - 1023px)**: 8-column layout, `1.5rem` (24px) margins, `1.5rem` (24px) gutters. Ancillary panels collapse into overlays or stacked sheets.
- **Mobile (<768px)**: 4-column layout, `1rem` (16px) margins, `1rem` (16px) gutters. Multi-column metric comparisons transition into structured vertical cards.

## Elevation & Depth

To avoid visual pollution and maintain an aseptic, calm atmosphere, depth is communicated primarily through architectural 1px borders (`#E2E8F0`) over shadows.

- **Default Surfaces**: Pure flat white (`#FFFFFF`) on top of the tinted base canvas (`#F7FAFC`), separated by a clean 1px stroke.
- **Floating Modals and Menus**: Use a faint, highly dispersed ambient elevation: `0 4px 16px -2px rgba(22, 50, 79, 0.06), 0 1px 3px 0 rgba(22, 50, 79, 0.04)`.
- **Active / Drag State**: `0 8px 24px -4px rgba(22, 50, 79, 0.08)`.
- No colored shadows, heavy drop shadows, or decorative blur fills are permitted.

## Shapes

The geometry reflects approachable precision:
- **Cards, Panels, and Containers**: Utilize `12px` to `16px` border radii (`rounded-lg` to `rounded-xl`).
- **Interactive Controls (Inputs, Buttons, Dropdowns)**: Standardize on `8px` (`0.5rem`, level `2`), stepping up to `10px` for large touch targets.
- **Status Tags, Micro-Badges, and Chips**: Use `4px` or `6px` radii for structured technical data; never use fully rounded pill shapes for critical clinical telemetry, preserving an authoritative, structured form.

## Components

### Buttons
- **Primary**: Solid teal (`#087F8C`) fill, white text, 8px border radius, 40px height (`py-2 px-4`). Hover: `#066772`.
- **Secondary**: Medical blue outline (1px stroke `#2563A6`), transparent fill, text `#2563A6`. Hover: Pale cyan tint.
- **Tertiary / Ghost**: Transparent fill, text `#243746`. Hover: `#F1F5F9`.
- **Emergency Action**: Solid emergency red (`#C62828`), white text, accompanied by an explicit warning icon. Never display bare red buttons without descriptive confirmation labels.

### Inputs & Selects
- Height: 40px, 8px radius, border: 1px `#E2E8F0`, background: `#FFFFFF`, placeholder: `#64748B`.
- Focus state: Crisp 1px `#087F8C` border with an unobtrusive `0 0 0 2px rgba(8, 127, 140, 0.15)` focus ring. Never remove focus outlines.

### Checkboxes & Radios
- 18px box, 1px `#CBD5E1` border.
- Selected state: Primary teal fill with clean white check or bullet icon. Radios maintain standard circular geometry.

### Cards & Patient Summaries
- Background `#FFFFFF`, border `1px solid #E2E8F0`, border-radius 12px or 16px. Internal padding standard: 24px (`space-lg`).
- Header divider lines must use the same `#E2E8F0` stroke with 16px vertical padding.

### Clinical Status Chips & Badges
- Format: Fixed layout containing a 14px line icon + concise uppercase/sentence-case label (e.g., `[!] High Priority`, `[✓] Normal`).
- Styles: Light tinted backgrounds (e.g., `#FEE2E2` for emergency alerts, `#E7F7F8` for active teal) with 1px coordinated borders. Never communicate priority solely via a colored dot.

### Sample Data & Decision-Support Disclaimers
- All mock records must explicitly display `"Fictional Sample Data - For Evaluation Only"`.
- Bottom viewports and analysis panels must include the persistent statement: *"Decision-support output only. Validate all recommendations with licensed clinical protocols."*