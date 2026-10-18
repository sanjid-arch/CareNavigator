# CareNavigator — AI-Assisted Clinical Triage & Care Navigation Platform

**CareNavigator** is a full-stack, HIPAA-conscious healthcare assessment and care-navigation web application built around the **"Sanctuary of Clinical Clarity"** design system. It combines multimodal AI symptom intake (chat, voice, clinical photos, and lab PDFs), a deterministic clinical red-flag safety engine, grounded clinical guideline retrieval (GINA, ACP, NICE), longitudinal health records, human-in-the-loop clinician verification, and smart specialist routing.

> **Medical Disclaimer**: CareNavigator provides AI-assisted clinical decision support and care navigation. All AI outputs are non-diagnostic considerations and do not replace professional medical advice, diagnosis, or treatment. In a medical emergency, call **911** or proceed to the nearest emergency department immediately.

---

## 1. Repository Structure & Reference Documentation

- [`PROJECT_PLAN.md`](./PROJECT_PLAN.md) — Complete 11-screen inventory, 4-variant design-system audit, token normalization specification, full-stack architecture, external service matrix, and 6-milestone implementation plan.
- [`AGENTS.md`](./AGENTS.md) — Permanent engineering, design-system, clinical safety, security, and verification rules governing all development on CareNavigator.
- [`prisma/schema.prisma`](./prisma/schema.prisma) & [`prisma/seed.ts`](./prisma/seed.ts) — Relational database schema and clinical fixture seeder (`isSeedFixture: true`).
- [`stitch_remix_of_healthcare_saas_design_system.zip`](./stitch_remix_of_healthcare_saas_design_system.zip) & [`design-reference:/`](./design-reference:) — Original Stitch design archive containing all 11 screen directories (`code.html` + `screen.png`) and 4 `DESIGN.md` specifications. *(Read-only visual reference; never overwrite.)*

---

## 2. Application Screens & Route Architecture

| # | Screen Name | Design Reference Directory | Application Route | Shell Layout | Primary Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Public Landing Page** | `carenavigator_ai_assisted_triage_care_navigation` | `/` | Public Marketing Shell | Public / Patient |
| 2 | **Patient Dashboard** | `carenavigator_patient_dashboard` | `/dashboard` | Patient Workspace (`w-64` Sidebar) | Patient |
| 3 | **AI Health Assessment & Triage Workspace** | `ai_health_assessment_triage_workspace` | `/assessments/new` | Patient Workspace (`w-64` Sidebar) | Patient |
| 4 | **Media & Voice Assessment** | `media_voice_assessment` | `/assessments/media-voice` | Patient Workspace (`w-64` Sidebar) | Patient |
| 5 | **Patient Health Profile & Documents** | `patient_health_profile_documents` | `/records` | Patient Workspace (`w-64` Sidebar) | Patient |
| 6 | **Clinical Assessment Results** | `clinical_assessment_results` | `/assessments/[id]/results` | Patient Workspace (`w-64` Sidebar) | Patient / Clinician |
| 7 | **Assessment History & Clinician Review Tracker** | `assessment_history_clinician_review_tracker` | `/assessments/history` | Patient Workspace (`w-64` Sidebar) | Patient / Clinician |
| 8 | **Doctor & Facility Directory** | `doctor_directory` | `/care-directory` | Public / Patient Responsive Shell | Public / Patient |
| 9 | **Privacy, Consent & Communication Settings** | `carenavigator_privacy_communication_settings` | `/settings/privacy` | Patient Workspace (`w-64` Sidebar) | Patient |
| 10 | **Notification Center** | `carenavigator_notification_center` | `/notifications` | Patient Workspace (`w-64` Sidebar) | Patient |
| 11 | **Admin & Clinical Operations Impact Dashboard** | `admin_impact_dashboard` | `/admin/impact` | Clinician & Admin Portal Shell | Admin / CMO |

---

## 3. Tech Stack & External Dependencies

| Layer | Package / Dependency | Purpose |
| :--- | :--- | :--- |
| **Application Framework** | `next@^15.1.7`, `react@^19.0.0`, `typescript@^5.7.3` | Full-stack App Router, Server Components, Route Handlers, strict type system |
| **Styling & Design System** | `tailwindcss@^3.4.17`, `clsx`, `tailwind-merge` | Canonical CareNavigator M3 color tokens, semantic acuity tokens, responsive layouts |
| **Database & Schema ORM** | `@prisma/client@^6.4.1`, `prisma@^6.4.1`, `tsx` | Relational persistence (`file:./dev.db` local SQLite out-of-the-box; PostgreSQL ready) |
| **Authentication & Security** | `jose@^6.0.8`, `zod@^3.24.2` | HMAC-SHA256 HTTP-only JWT session signing, server RBAC & ownership guards, env/input validation |
| **AI & Multimodal SDK** | `@google/genai` | Google Gemini API integration for symptom intake, lab OCR, and voice transcription |
| **Testing & Quality** | `vitest@^3.0.6`, `@testing-library/react`, `eslint` | Automated unit/integration testing, static analysis, and build checks |

---

## 4. Setup Commands & Local Development Workflow

### 4.1 Environment Configuration
Copy [`.env.example`](./.env.example) to `.env` (or `.env.local`) in the project root:

```bash
cp .env.example .env
```

All variables in [`.env.example`](./.env.example) are validated at server startup by [`src/lib/env.ts`](./src/lib/env.ts):
- `DATABASE_URL`: Defaults to `"file:./dev.db"` for zero-config local relational persistence (can be pointed to PostgreSQL in production).
- `AUTH_SECRET`: Secret key (`>=16` chars) used to sign HTTP-only session JWTs.
- `GEMINI_API_KEY`: Optional in local offline testing; when omitted, `/api/health` and the triage engine transparently report `DETERMINISTIC_FALLBACK_MODE`.
- `LOCAL_VAULT_DIR`: Private medical document storage directory outside `public/` (defaults to `.local-vault`).

> **Security Rule**: Never prefix `GEMINI_API_KEY`, `DATABASE_URL`, `AUTH_SECRET`, or storage keys with `NEXT_PUBLIC_`. [`src/lib/env.ts`](./src/lib/env.ts) actively throws a security error if any secret is exposed via `NEXT_PUBLIC_`.

### 4.2 Install, Migrate & Seed
Run the following commands from the repository root:

```bash
# 1. Install all dependencies
npm install

# 2. Apply Prisma migrations & generate Prisma Client
npm run db:migrate

# 3. Seed longitudinal clinical fixtures (isSeedFixture: true)
npm run db:seed

# 4. Start the local development server
npm run dev
```

### 4.3 Quality, Typecheck, Lint & Test Scripts

```bash
# Run TypeScript compiler typecheck
npm run typecheck

# Run ESLint code-quality checks
npm run lint

# Run automated unit & database integration tests (Vitest)
npm test

# Build production application bundle
npm run build
```

---

## 5. Pre-Seeded Demo Personas (RBAC Evaluation)

All seeded development fixtures are tagged with `isSeedFixture: true` in the database and can be switched anytime using the **Active Session Persona** menu in the top-right header (backed by `POST /api/auth/session`):

1. **Patient Persona (`PATIENT`)**: **Sarah Jenkins** (`MRN: #CN-84920`) — Pre-populated with vitals (`118/76 mmHg`, `68 bpm`), conditions (`Bronchial Asthma`, `Type 2 Diabetes`, `Migraine`), medications (`Albuterol`, `Metformin`, `Lisinopril`), severe allergy (`Penicillin`), lab reports (`Comprehensive Metabolic Panel & HbA1c`), and active triage session `#CN-2026-8841`.
2. **Attending Clinician Reviewer (`CLINICIAN`)**: **Dr. Aris Thorne, MD** (`Internal Medicine & Pulmonology`) — Authorized to review triage sessions, sign clinical notes, and request supplemental patient files.
3. **Clinical Operations Admin (`ADMIN`)**: **Dr. Clara Vance, MD** (`Chief Medical Officer`) — Authorized to inspect `/admin/impact` telemetry and immutable `AuditLog` entries.
