# LegalMate AI – AI-Powered Contract Drafting & Review

LegalMate AI helps professionals draft and review contracts in minutes. Choose a contract template, add clauses, auto-fill important fields, and export to PDF. Review existing contracts to identify missing clauses, risky terms, and actionable improvements. Built with React, TypeScript, and a modern design system.

## Demo Screens (Key Flows)
- Draft: Select template → Add clauses → Provide details → Generate → Edit/Save/Export PDF
- Review: Paste contract text → Run analysis → See missing clauses, risky terms, suggestions
- Dashboard: Quick actions and recent activity scaffold

## Features
- Contract Drafting (NDA, Service Agreement, Lease Agreement)
- Language Support (English/Hindi)
- Clause Library + Compliance Hints
- Auto Summary of Generated Contract
- Edit/Copy/Save (localStorage)
- Export as PDF
- Contract Review (missing clauses, risky terms with severity, suggestions)
- Responsive, modern UI with shadcn/ui & Tailwind

## Tech Stack
- Frontend: React 18, TypeScript, Vite
- UI: Tailwind CSS, shadcn/ui, lucide-react
- Routing: React Router
- Data Layer: TanStack Query (scaffolded)
- Validation: zod (available)
- Charts/UX helpers: recharts, framer-motion (available)
- Build/Quality: ESLint, TypeScript

## Architecture & Notable Files
- [index.html](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/index.html:0:0-0:0): App mount and metadata
- [src/main.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/main.tsx:0:0-0:0): App bootstrap
- [src/App.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/App.tsx:0:0-0:0): Providers + Router (`/`, `/auth`, `/dashboard`, `/draft`, `/review`)
- [src/pages/Index.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Index.tsx:0:0-0:0): Marketing landing page (Header, Hero, Features, etc.)
- [src/pages/Dashboard.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Dashboard.tsx:0:0-0:0): Quick actions and recent contracts scaffold
- [src/pages/Draft.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Draft.tsx:0:0-0:0): Draft flow (templates, clauses, language, summary, PDF export)
- [src/pages/Review.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Review.tsx:0:0-0:0): Review flow (analysis results: missing clauses, risks, suggestions)
- `src/components/…`: Reusable UI and feature components (shadcn/ui based)
- `src/utils/contractParser.ts`: `parseAdditionalInfo`, `formatContract`
- `src/utils/pdfExport.ts`: PDF generation via `jspdf` + `html2canvas`

## How It Works (Today vs. Future)
- Today: Drafting and Review flows simulate AI responses for a smooth UX demo.
- Future: Replace simulated timeouts with real AI endpoints (e.g., REST call in [Draft.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Draft.tsx:0:0-0:0) [handleGenerate](cci:1://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Draft.tsx:43:2-139:4) and [Review.tsx](cci:7://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Review.tsx:0:0-0:0) [handleReview](cci:1://file:///c:/Users/INDIA/Downloads/legalmate-ai-suite-main%20%281%29/legalmate-ai-suite-main/src/pages/Review.tsx:14:2-74:4)).

## Getting Started
Prerequisites: Node.js and npm

```bash
npm i
npm run dev
