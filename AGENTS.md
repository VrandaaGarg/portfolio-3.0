<!-- Added: 2026-06-09 -->
## Framework
This project uses TanStack Start with Vite and TanStack Router, not Next.js. Routes live under `src/routes`, API endpoints are TanStack Start server route handlers, builds output to `.output/`, and package scripts use `vite dev`, `vite build`, and `node .output/server/index.mjs`.

<!-- Added: 2026-06-09 -->
## Cal.com Scheduling Embed
Use `@calcom/embed-react` for scheduling popups. Configure it once in a client-only `CalProvider` mounted from the TanStack Start root route, call `getCalApi({ namespace })`, set theme/branding and `layout: "month_view"` via `cal("ui", ...)`, and trigger popups from buttons using matching `data-cal-link` and `data-cal-namespace` attributes instead of `onClick`. Keep shared Cal values in `src/lib/cal.ts`, keep button `data-cal-config` aligned with `layout: "month_view"`, keep `data-cal-link` as the clean `username/event-slug` value without query params, and bump the namespace when changing Cal UI config during development because Cal persists UI commands per namespace.
