# PetVan — Contribution Rules for AI Agents (Claude / Codex / others)

This repository is connected to **Lovable**. Every commit pushed to the connected
branch is synced back into the Lovable editor and preview. If a commit breaks the
build, the Lovable preview breaks for the user. Follow these rules exactly.

---

## 1. Stack — do not change it

| Area | What is used | Never use |
|---|---|---|
| Framework | TanStack Start v1 (React 19, SSR) | Next.js, Remix, CRA |
| Router | TanStack Router (file-based, `src/routes/`) | react-router-dom, BrowserRouter |
| Build | Vite 8 | Webpack, Parcel |
| Styling | Tailwind CSS v4 via `src/styles.css` (`@theme` tokens) | tailwind.config.js, styled-components, CSS-in-JS |
| Data | Prisma (`prisma/schema.prisma`) + server functions in `src/api/*.ts` | direct DB calls from components |
| State | Zustand (`src/lib/store.ts`) | Redux, MobX, Context rewrites |
| Icons | `lucide-react` | react-icons, font-awesome |
| Toasts | `sonner` | any `@/hooks/use-toast` (does NOT exist here) |
| i18n | `src/lib/i18n.ts` (`copy[lang]`) | i18next, react-intl |

Do not add new dependencies unless absolutely required. If you must, add them to
`package.json` **and** commit the lockfile in the same commit.

---

## 2. Routing rules (most common source of broken previews)

- Route files live in `src/routes/`. The string in `createFileRoute("...")`
  **must** match the file path exactly:
  - `src/routes/shop/cart.tsx` → `createFileRoute("/shop/cart")`
  - `src/routes/shop/index.tsx` → `createFileRoute("/shop/")`
  - `src/routes/pets/$petId.tsx` → `createFileRoute("/pets/$petId")`
  - `src/routes/services/tracking.$orderId.tsx` → `createFileRoute("/services/tracking/$orderId")`
- **Never edit, create, or delete `src/routeTree.gen.ts`** — it is generated.
  Commit it only as the result of running the dev server/build.
- Navigate with `<Link to="..." />` from `@tanstack/react-router`, never `<a href>`
  for internal routes.
- Dynamic routes need typed params, not template strings:
  ```tsx
  // WRONG
  <Link to={`/services/tracking/${order.id}`}>Track</Link>
  // RIGHT
  <Link to="/services/tracking/$orderId" params={{ orderId: String(order.id) }}>Track</Link>
  ```
- No module-scope statements referencing route components
  (`MyPage.displayName = ...`, `MyPage.head = ...`) — code-splitting removes the
  component and this throws `ReferenceError` at runtime.

---

## 3. Imports — the #1 cause of "X is not defined"

Before committing, verify **every** identifier used in JSX is imported:
`Link`, all `lucide-react` icons (`Twitter`, `Mail`, `PawPrint`, ...), `toast`, hooks.
A missing icon import passes typecheck in some setups but crashes the rendered page.

Also: every imported path must exist. These do **not** exist in this project:
`@/hooks/use-toast`, `@/components/ui/toaster`, `@/hooks/useAuth`,
`react-helmet-async`, `src/App.tsx`, `src/pages/`.

---

## 4. SSR safety

The app is server-rendered. Code in a component body runs on the server too.

- No `window`, `document`, `localStorage`, `navigator` during render.
  Read them inside `useEffect`, or guard with a mounted flag.
- No `Date.now()`, `Math.random()`, or locale date formatting in the first render
  output — it causes hydration mismatch errors.
- Browser-only libraries (maps, charts needing DOM) must be dynamically imported
  after hydration, never statically imported into a route module.

---

## 5. Server functions (`src/api/*.ts`)

- Use `createServerFn` from `@tanstack/react-start` only.
- Keep those files thin: imports, types, and exported server-function declarations.
  Move helpers/constants into a separate module — code splitting deletes runtime
  siblings and causes `ReferenceError`.
- `process.env.X` is read **inside** `.handler()`, never at module scope.
- Prisma is imported through `src/lib/prisma.ts` only, and only inside handlers.

---

## 6. Styling & design system

- Colors, shadows and gradients are semantic tokens in `src/styles.css`
  (dark theme, black + gold/yellow). Use `bg-primary`, `text-foreground`,
  `surface-card`, `shadow-[var(--shadow-card)]`.
- Never hardcode `text-white`, `bg-black`, `bg-[#ffcc00]` in components.
- Arabic support: `src/lib/i18n.ts` holds all strings. Any new user-facing text
  must be added to **both** `en` and `ar`. RTL is handled by `dir` + `.font-arabic`;
  use logical utilities (`ms-`, `me-`, `start-`, `end-`) instead of `ml-`, `mr-`,
  `left-`, `right-`.

---

## 7. Before every push (mandatory checklist)

```bash
bun install
bun run build      # must exit 0 with no errors in output
bun run lint
```

Then open the app locally and confirm `/`, `/login`, `/register`, `/profile`,
`/shop`, `/adopt`, `/services/book`, `/pets/add` all render without console errors.

- Never force-push, rebase, amend, or squash already-pushed commits — it destroys
  Lovable's project history.
- Keep the connected branch always in a working state; small, focused commits.
- Do not commit `.env`, secrets, `node_modules`, or build output.

---

## 8. Coordination with Lovable

Lovable edits the same branch. To avoid conflicts:
- Pull before starting, push small commits promptly.
- Do not reformat or restructure files you were not asked to change
  (no mass Prettier reformat, no file renames/moves without a reason).
- Do not touch: `src/routeTree.gen.ts`, `src/router.tsx`, `src/start.ts`,
  `src/server.ts`, `vite.config.ts`, `AGENTS.md` — unless the task is explicitly
  about them.
