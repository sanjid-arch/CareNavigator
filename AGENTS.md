# AGENTS.md — Permanent Development & Governance Rules for CareNavigator

This document defines the mandatory, permanent engineering, design-system, clinical safety, security, and verification rules for **CareNavigator** — a full-stack AI-powered healthcare assessment and care-navigation web application. All contributors and autonomous coding agents must strictly follow these rules across every task and milestone.

---

## 1. Visual Reference & Design-System Fidelity

### 1.1 Primary Visual Reference
- **Treat the extracted Stitch design files as the primary visual reference.**
  - All 11 screen directories (`code.html` + `screen.png`) and 4 design-system specifications (`DESIGN.md`) reside in `design-reference:/` (extracted from `stitch_remix_of_healthcare_saas_design_system.zip`).
  - Never overwrite, modify, or delete the original files in `stitch_remix_of_healthcare_saas_design_system.zip` or `design-reference:/`.
  - Before implementing or modifying any screen or component, inspect both its `code.html` markup and `screen.png` visual reference in `design-reference:/`.

### 1.2 Single Canonical Design System & Documented Tokens
- **Maintain a single canonical design system and document all design tokens.**
  - The raw design archive contains 4 variants (`clinical_calm_minimal`, `clinical_clarity_1`, `clinical_clarity_2`, `clinical_clarity_3`) that conflict on `secondary` vs. `tertiary` colors, font size units (`rem` vs. `px`), and border-radius overrides.
  - All application code must use the single **Canonical CareNavigator Theme** defined below and configured in `tailwind.config.ts` and `src/app/globals.css`. Do not copy per-page inline `<script id="tailwind-config">` blocks with conflicting token definitions.

#### Canonical Color Tokens ("The Sanctuary of Clinical Clarity")

| Token Category | Token Name | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary (Deep Clinical Teal)** | `primary` | `#00646f` | Primary interactive text, active icons, focus rings, primary links |
| | `primary-container` | `#087f8c` | Primary CTA gradient endpoint (`135deg` from `#00646f` to `#087f8c`), active badges |
| | `on-primary` | `#ffffff` | Text and icons on `primary` / `primary-container` surfaces |
| | `primary-fixed` | `#9df0fb` | Soft teal highlight fills, active step accents |
| | `on-primary-fixed` | `#001f24` | High-contrast text on `primary-fixed` |
| **Secondary (Medical Trust Blue)** | `secondary` | `#2060a3` | Informational badges, clinical verification indicators, secondary actions |
| | `secondary-container` | `#d4e3ff` | Soft medical blue pill backgrounds, active sidebar/tab highlights |
| | `on-secondary-container` | `#001c3a` | Text/icons inside `secondary-container` |
| **Tertiary (Calm Cyan/Teal Accent)** | `tertiary` | `#006970` | Supporting clinical accents, progress indicators, subtle highlights |
| | `tertiary-container` | `#74f5ff` | Light cyan accent containers |
| | `on-tertiary-container` | `#002022` | Text/icons inside `tertiary-container` |
| **Tonal Surfaces (No-Line Layering)** | `surface` | `#f6f9ff` | Default application canvas background |
| | `surface-bright` | `#f8f9ff` | Elevated canvas / public marketing background |
| | `surface-container-lowest` | `#ffffff` | Primary content cards, modals, input fields, floating drawers |
| | `surface-container-low` | `#ecf5ff` | Secondary section backgrounds, sidebar background, subtle grouping |
| | `surface-container` | `#e5eeff` | Hover states, table headers, inactive tab tracks |
| | `surface-container-high` | `#dde9ff` | Emphasized containers, selected rows |
| | `surface-container-highest` | `#d6e3ff` | Dividers, progress bar tracks, skeleton loaders |
| | `inverse-surface` | `#16324f` | Dark clinical governance banners, tooltips, toast notifications |
| | `inverse-on-surface` | `#eef4ff` | Text on `inverse-surface` |
| **Typography & Outlines** | `on-surface` | `#091d2b` | Primary deep-navy body and headline text (never pure `#000000`) |
| | `on-surface-variant` | `#3f484a` | Secondary labels, metadata, captions, muted descriptions |
| | `outline` | `#6f797b` | Input borders, secondary button borders |
| | `outline-variant` | `#bec8ca` | Ghost borders (`rgba(190, 200, 202, 0.15)` to `0.25`) |
| **Semantic Clinical Acuity** | `acuity-selfcare` | `#21865b` | Self-Care / Normal Biomarker (`bg: #dcfce7`, `text: #14532d`, `border: #86efac`) |
| | `acuity-routine` | `#2060a3` | Routine Consultation (`bg: #dbeafe`, `text: #1e3a8a`, `border: #93c5fd`) |
| | `acuity-urgent` | `#b7791f` | Urgent Care `<24h` / Elevated Flag (`bg: #fef3c7`, `text: #78350f`, `border: #fcd34d`) |
| | `acuity-emergency` / `error` | `#ba1a1a` | Emergency ER / 911 / Critical Red Flag (`bg: #fee2e2`, `text: #7f1d1d`, `border: #fca5a5`) |

#### Canonical Typography, Spacing & Elevation Tokens
- **Font Families**:
  - `font-sans` / `font-headline` / `font-body`: `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif` (weights: `400, 500, 600, 700, 800`).
  - `font-mono`: `'JetBrains Mono', monospace` (used for MRNs, Assessment IDs `#CN-xxxx`, timestamps, biomarker values, and audit log IDs).
- **Typographic Scale**:
  - `display` / `headline-xl`: `2.25rem` (`36px`), line-height `1.2`, weight `700`, tracking `-0.02em`.
  - `headline-lg`: `1.75rem` (`28px`), line-height `1.25`, weight `600`, tracking `-0.015em`.
  - `headline-md`: `1.375rem` (`22px`), line-height `1.3`, weight `600`.
  - `headline-sm` / `title-md`: `1.0rem` (`16px`), line-height `1.4`, weight `600`.
  - `body-lg`: `1.0rem` (`16px`), line-height `1.6`, weight `400` (used for patient-facing clinical explanations and landing copy).
  - `body-md`: `0.875rem` (`14px`), line-height `1.5`, weight `400` (default workspace UI text).
  - `body-sm` / `label`: `0.75rem` (`12px`), line-height `1.4`, weight `600`, uppercase tracking `0.05em` for category overlines.
- **Border Radii**:
  - Do **not** shrink Tailwind's default radii. Preserve standard soft clinical geometry: `rounded-sm` (`4px`), `rounded` (`6px`), `rounded-md` (`8px`), `rounded-lg` (`12px`), `rounded-xl` (`16px`), `rounded-2xl` (`20px`), `rounded-full` (`9999px` for status chips, quick-symptom pills, and toggles).
- **Ambient Elevation & Glassmorphism**:
  - Ambient card shadow: `0 10px 30px -5px rgba(9, 29, 43, 0.04), 0 4px 12px -2px rgba(0, 100, 111, 0.03)`.
  - Sticky headers & floating bars: `bg-white/80` or `bg-surface/85` with `backdrop-blur-md`.

### 1.3 Navigation, Tab Dimensions, Icon Identity & Active-State Consistency
- **Preserve consistent navigation, tab dimensions, icon identity, spacing, colors, typography, and active-state behavior.**
  - **Sidebar Width & Structure**: All authenticated workspace screens must use a consistent `w-64` (`256px`) fixed desktop sidebar (collapsible to an accessible drawer on mobile/tablet) and a fixed `h-16` (`64px`) top header bar. Never alternate sidebar widths (`w-64` vs `w-72`) or reorder sidebar links between pages.
  - **Active Navigation State**: Active sidebar items must display `bg-secondary-container/60` (or `bg-primary/10`), `text-primary`, `font-semibold`, a left accent indicator or pill rounding (`rounded-xl`), and a filled Material Symbol (`font-variation-settings: 'FILL' 1`).
  - **Tab Dimensions**: Horizontal tab bars (e.g., Media/Voice mode switcher, Health Profile sub-tabs, Assessment History status filters) must maintain uniform height (`h-10` or `h-11`), consistent horizontal padding (`px-4`), identical font weight (`text-sm font-semibold`), and smooth active indicator transitions without layout shift.
  - **Icon Identity**: Use `Material Symbols Outlined` (`opsz 24, wght 400, FILL 0..1, GRAD 0`) consistently across the entire application. Keep icon names semantically identical across screens (e.g., `vital_signs` / `health_and_safety` for brand/triage, `mic` for voice intake, `description` / `folder_shared` for medical records, `stethoscope` / `person_search` for doctor directory, `notifications` for alerts, `shield_lock` for privacy, `emergency` / `e911_emergency` for 911 escalation).
  - **Role-Consistent Header Persona**: Patient-facing screens must always display the active Patient persona in the top-right header (resolving the reference mockup inconsistency where clinician names appeared in the header of patient screens). Clinician/Admin screens display the active Clinician or Admin persona.

### 1.4 Responsive Multi-Device Layouts
- **Build responsive mobile, tablet, laptop, and desktop layouts.**
  - Every page and modal must be usable and visually balanced across:
    - **Mobile (`< 640px`)**: Single-column stacking, slide-over navigation drawer, horizontally scrollable filter chips/tabs, accessible bottom action bars, and responsive data cards/tables.
    - **Tablet (`640px – 1023px`)**: Collapsible sidebar, adaptive 2-column grids, stacked master-detail views or slide-over detail drawers.
    - **Laptop (`1024px – 1279px`)**: Persistent `w-64` sidebar + 12-column workspace grid (`7/5` or `8/4` splits).
    - **Desktop (`>= 1280px`)**: Full `max-w-7xl` / `max-w-[1440px]` workspace with side-by-side master-detail panels, sticky clinical context panels, and split list/map views.

---

## 2. Code Architecture & Maintainability

### 2.1 Reusable, Typed Components & Modular Server Logic
- **Use reusable, typed, maintainable components and modular server-side logic.**
  - Enforce strict TypeScript (`"strict": true`, zero `any` types without explicit justification).
  - Decompose UI into reusable components under `src/components/` (`layout/`, `triage/`, `records/`, `directory/`, `governance/`, `admin/`, `ui/`).
  - Keep server-side domain logic modularized under `src/lib/` and `src/server/`:
    - `src/server/triage/` — Deterministic red-flag rule engine, LLM triage orchestrator, entity extraction schemas.
    - `src/server/guidelines/` — Clinical guideline RAG retrieval and citation grounding.
    - `src/server/documents/` — Private file storage vault, Lab PDF/image OCR, and biomarker parsing.
    - `src/server/auth/` — Session validation, RBAC guards (`PATIENT`, `CLINICIAN`, `ADMIN`), and ownership verification.
    - `src/server/audit/` — Immutable audit trail logging.

### 2.2 Preservation of Existing Working Code & Dependencies
- **Preserve existing working code and dependencies unless a documented reason justifies changing them.**
  - Once packages, database models, API contracts, or UI components are established and verified in a milestone, do not rewrite, remove, or replace them in later milestones without documenting a clear technical justification in the commit/PR or `PROJECT_PLAN.md`.
  - Maintain backward compatibility for existing seeded records, tests, and routes as new features are layered on.

---

## 3. Security, Privacy & Data Integrity

### 3.1 Zero Exposure of Secrets & Private Medical Data (PHI)
- **Never expose API keys, secrets, or private medical data to client code or logs.**
  - Never prefix server secrets (`GEMINI_API_KEY`, `DATABASE_URL`, `AUTH_SECRET`, `STORAGE_SECRET_ACCESS_KEY`) with `NEXT_PUBLIC_`.
  - Never hardcode credentials in source files or commit `.env` / `.env.local` files to version control.
  - Uploaded patient files (lab PDFs, clinical photos, voice recordings) must **never** be stored in `public/`. Store them in private storage (S3/R2 or `.local-vault/` outside the web root) and serve them exclusively through authenticated, ownership-verified server routes (`/api/files/[id]`).
  - Redact or omit sensitive patient health narratives, biomarkers, and PII from `console.log` and server error traces.

### 3.2 Real Persistent Storage & Separation of Fixtures vs. Live Data
- **Use real persistent storage for user-generated records and clearly distinguish development fixtures from actual data.**
  - All user-generated records (triage sessions, chat messages, uploaded documents, extracted biomarkers, voice transcripts, booked appointments, clinician review notes, notification read/dismiss states, and privacy consent toggles) must persist to the real database (PostgreSQL / Prisma).
  - Do not rely on ephemeral in-memory arrays or `localStorage`-only state for domain entities.
  - Seed data (`prisma/seed.ts`) used to populate initial demo personas (`Sarah Jenkins`, `Elena Rostova`, `Dr. Aris Thorne`, `Dr. Clara Vance`) must be explicitly flagged in the database (e.g., `isSeedFixture: true` or via clear metadata badges) so development/demo fixtures are cleanly distinguished from user-created records.

### 3.3 Server-Side Input Validation, AuthN, AuthZ & Record Ownership
- **Validate all input and enforce authentication, authorization, and record ownership on the server.**
  - Validate every API request body, query parameter, and multipart file upload (MIME type, size limits `<= 25MB`, filename sanitization) on the server using **Zod** schemas.
  - Every protected API route and Server Action must verify:
    1. **Authentication**: A valid user session exists.
    2. **Role Authorization (RBAC)**: Only `CLINICIAN` or `ADMIN` roles can sign off on clinician reviews or override triage acuity; only `ADMIN` (or authorized clinical operations roles) can access `/admin/impact` and audit logs.
    3. **Record Ownership**: A `PATIENT` can only view, modify, export, or delete their own `PatientProfile`, `TriageSession`, `MedicalDocument`, `Appointment`, `Notification`, and `ConsentPreference` records.
  - Enforce the patient's **Longitudinal EHR Consent Toggle** (`includeEhrContext`) on the server before injecting medical history, medications, or allergies into any AI prompt.

---

## 4. Clinical Safety, AI Honesty & Protocol Governance

### 4.1 Zero Fabrication of AI Outputs, Citations, Records, or Integrations
- **Never fabricate AI outputs, clinical citations, medical records, doctor availability, or successful integrations.**
  - Do not claim an AI integration, OCR pipeline, voice transcription, or database query succeeded if it was mocked or failed.
  - If an external credential (such as `GEMINI_API_KEY`) is missing or an external API call fails, return a transparent, structured status (or clearly labeled deterministic fallback mode in local offline testing) rather than silently fabricating a fake LLM response.
  - Clinical guideline citations displayed on `/assessments/[id]/results` must be retrieved from the curated, persisted `ClinicalGuideline` database corpus (e.g., GINA, ACP, NICE, AHA/ACC, ADA) with real guideline titles, publication sources, and summaries—never hallucinated URLs or fictional studies.
  - Doctor profiles, time slots, and booked appointments must query and mutate real database tables (`DoctorProfile`, `AvailabilitySlot`, `Appointment`).

### 4.2 AI as Clinical Decision Support (Non-Diagnostic Framing)
- **Treat AI output as clinical decision support, not a confirmed diagnosis.**
  - All AI triage outputs, differential considerations, visual skin/photo observations, and lab biomarker explanations must use non-diagnostic clinical support language ("Potential Considerations", "Preliminary Acuity Signal", "Observations for Clinician Review").
  - Every assessment workspace, media/voice analysis panel, and results screen must prominently display the non-diagnostic medical disclaimer and confidence context.

### 4.3 Approved Triage Protocols, Clinician Review & Urgent Escalation Pathways
- **Use approved clinical protocols for triage and preserve clinician review and urgent escalation pathways.**
  - **Deterministic Red-Flag Guardrail Engine**: Before and alongside any AI evaluation, run deterministic clinical red-flag screening (covering acute chest pain/pressure, severe shortness of breath, stroke FAST symptoms, anaphylaxis, severe hemorrhage, hemodynamic instability, and self-harm/suicidal ideation).
  - Whenever a deterministic red flag is triggered:
    1. Immediately set acuity to `EMERGENCY` (`Seek Immediate Emergency Care / Call 911`).
    2. Surface the high-contrast crimson **Emergency Escalation Banner & 911 Action Modal**.
    3. Write an immutable `HIGH_RISK_ESCALATION` entry to `AuditLog`.
  - **Human-in-the-Loop Clinician Verification**: Preserve the complete 4-stage clinician verification workflow (`AI Triage Generated` → `Queued for Specialty Review` → `Clinician Reviewing` → `Final Care Plan Signed`), including the ability for clinicians to request supplemental patient files, add signed clinical notes, or override AI acuity.

---

## 5. Testing, Browser Verification & Honest Reporting

### 5.1 Automated Testing Requirement
- **Add tests for meaningful features and run relevant tests after changes.**
  - Write and maintain automated tests covering:
    - Deterministic clinical red-flag escalation rules (unit tests verifying emergency overrides).
    - Server-side input validation, RBAC authorization, record ownership, and EHR consent enforcement.
    - Core data mutations (triage session creation, document upload & biomarker persistence, clinician review sign-off, appointment booking, notification state updates, and account data purge).
  - Run `npm test`, `npx tsc --noEmit`, and `npm run build` after implementing changes and before declaring any milestone complete.

### 5.2 Live Browser Verification
- **Verify visual behavior in a running browser, not just by reading source code.**
  - Every UI screen, interactive control, responsive breakpoint, modal, filter, and navigation flow must be inspected in a live running browser against the reference `screen.png` designs.
  - Verify that zero console errors, hydration mismatches, broken links (`href="#"`), or unstyled states occur during real user interactions.

### 5.3 Transparent Completion Reporting
- **Never mark a task complete without reporting its implementation and verification status.**
  - Every task and milestone summary must explicitly report:
    1. **What was implemented** (files created/updated, database models, API endpoints, and UI screens).
    2. **What was verified** (automated test results, TypeScript/build checks, and live browser verification results).
    3. **Any known limitations, missing external credentials, or deferred items** (never claim a feature is working end-to-end if it has not been executed and verified).
