# Ripple Chat

Premium landing page for a real-time chat SaaS. Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Radix UI, and Lucide icons.

## Getting started

```bash
pnpm install    # or: npm install / yarn
pnpm dev
```

Open http://localhost:3000

## Structure

- `app/` — Next.js App Router entry (`layout.tsx`, `page.tsx`, `globals.css`).
- `components/sections/` — One file per landing section.
- `components/shared/` — Reusable visual primitives (glass card, counters, mockup).
- `components/ui/` — Button and accordion primitives.
- `lib/` — Utilities and static data.

## Design tokens

- Primary background `#0A0A0A`, elevated `#111111`.
- Accent `#D9FF66` → `#C5F56A` gradient.
- Secondary accent `#A8F5FF`.
- 24px rounded cards, 20px glass blur, WCAG-AA contrast.
