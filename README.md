# Next.js Basics

A small **learning project** built while following a beginner Next.js tutorial (App Router + TypeScript). It covers only the fundamentals: project structure, file-based routing, client-side navigation, server vs client components and global styling setup. It is not a production app.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)

---

## What this project covers

| Concept | Where to look |
| --- | --- |
| App Router and root layout | `app/layout.tsx` |
| Home page | `app/page.tsx` |
| File-based routing (nested routes) | `app/users/page.tsx`, `app/users/new/page.tsx` |
| Client-side navigation with `<Link>` | `app/page.tsx` |
| Server component (default) vs client component (`'use client'`) | `app/page.tsx` vs `app/components/ProductCard.tsx` |
| Fonts with `next/font` and page `metadata` | `app/layout.tsx` |
| Global CSS and CSS variables (light/dark) | `app/globals.css` |
| TypeScript, PostCSS and Tailwind configuration | `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts` |

## Tech stack

- **Next.js 16** (App Router) and **React 19**
- **TypeScript 6** with `strict` mode
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **ESLint 9** with `eslint-config-next`
- Font: **Inter** through `next/font/google`

## Project structure

```
next-app/
├── app/                        # App Router: folders here become routes
│   ├── components/
│   │   └── ProductCard.tsx     # client component (has a button with onClick)
│   ├── users/
│   │   ├── new/
│   │   │   └── page.tsx        # route: /users/new
│   │   └── page.tsx            # route: /users
│   ├── favicon.ico
│   ├── globals.css             # global styles + CSS variables
│   ├── layout.tsx              # root layout (wraps every page)
│   └── page.tsx                # route: /
├── public/                     # static files served from "/"
│   ├── next.svg
│   └── vercel.svg
├── next.config.js              # Next.js config (empty defaults)
├── next-env.d.ts               # auto-generated types, do not edit
├── package.json                # scripts and dependencies
├── postcss.config.js           # PostCSS + Tailwind plugin
├── tailwind.config.ts          # Tailwind config (starter defaults)
└── tsconfig.json               # TypeScript config, "@/*" path alias
```

## Routes

| URL | File | Renders |
| --- | --- | --- |
| `/` | `app/page.tsx` | Heading, link to `/users`, and the `ProductCard` component |
| `/users` | `app/users/page.tsx` | Placeholder "UsersPage" |
| `/users/new` | `app/users/new/page.tsx` | Placeholder "NewUserPage" |

A folder becomes a route **only if it contains a `page.tsx`**. That is why `app/components/` is not reachable from the browser.

## Code walkthrough

### `app/layout.tsx` (root layout)

- `import './globals.css'` loads the global styles once, for the whole app.
- `Inter({ subsets: ['latin'] })` loads the Inter font at build time and self-hosts it (no extra request to Google, no layout shift). `inter.className` is applied to `<body>`.
- `export const metadata` sets the page `<title>` and description (still the create-next-app defaults).
- `RootLayout` receives `children` (the current page) and must render `<html>` and `<body>`. It wraps every route and does not re-render on navigation.

### `app/page.tsx` (home, server component)

- Runs on the server by default (no `'use client'`).
- `<Link href="/users">` from `next/link` gives **client-side navigation**: no full page reload, only the changed content is fetched, and links in view are prefetched in production.
- The commented-out `<a href="/users">` shows the alternative: a plain anchor reloads the page and re-downloads resources on every navigation, so `<Link>` is the better choice for internal links.
- `<ProductCard />` shows a **server component rendering a client component**. It must be imported at the top: `import ProductCard from './components/ProductCard'`.

### `app/components/ProductCard.tsx` (client component)

```tsx
'use client'
import React from 'react'

const ProductCard = () => {
  return (
    <div>
      <button onClick={() => console.log('Click')}>Add to Cart</button>
    </div>
  )
}

export default ProductCard
```

- `'use client'` is required because of the `onClick` event handler (server components cannot use event handlers, state or effects).
- The click logs to the **browser** console, not the terminal.
- Good practice shown here: keep the client component small and put only the interactive part in it.

### `app/users/page.tsx` and `app/users/new/page.tsx`

Minimal placeholder pages. Each default-exports a React component, and the folder path becomes the URL (`users/` -> `/users`, `users/new/` -> `/users/new`, a **nested route**).

### `app/globals.css`

- Pulls in Tailwind (see the note below).
- Defines CSS variables (`--foreground-rgb`, `--background-start-rgb`, `--background-end-rgb`) with a dark-mode override inside `@media (prefers-color-scheme: dark)`.
- `body` uses the foreground variable for text colour and adds `padding: 1rem`. The two background variables are defined but not used yet.

### Config files

| File | Purpose |
| --- | --- |
| `next.config.js` | Exports an empty `nextConfig` (all defaults). |
| `tsconfig.json` | `strict` type checking, `moduleResolution: bundler`, `jsx: react-jsx`, Next.js TS plugin, alias `@/*` -> project root (e.g. `@/app/components/ProductCard`). |
| `postcss.config.js` | Registers the `@tailwindcss/postcss` plugin. |
| `tailwind.config.ts` | Starter config: `content` globs and two extra gradient utilities. |
| `next-env.d.ts` | Generated by Next.js; never edit it. |

## Getting started

**Requirements:** Node.js 20+ (LTS recommended) and npm.

```bash
# 1. clone
git clone https://github.com/anushka-rodrigo/<repo-name>.git
cd <repo-name>

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Open <http://localhost:3000>. Edits hot-reload automatically.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm start` | Serve the production build |
| `npm run lint` | Currently `next lint`, which was removed in Next.js 16 (see notes) |

## Key concepts learned

- **File-based routing:** folders inside `app/` are URL segments, `page.tsx` makes them public.
- **Layouts:** `layout.tsx` wraps pages and persists across navigation.
- **Server components by default:** rendered on the server, ship no JavaScript, cannot use state or event handlers.
- **Client components:** opt in with `'use client'` for interactivity (`onClick`, `useState`, `useEffect`); keep them small.
- **`<Link>` vs `<a>`:** `<Link>` navigates on the client without a full reload.
- **Colocation:** non-page files (like `components/`) can live inside `app/` without becoming routes.

## Notes

- **Tailwind CSS 4:** the entry point in `globals.css` is `@import "tailwindcss";`. The older v3 lines (`@tailwind base; @tailwind components; @tailwind utilities;`) are silently ignored by v4. Tailwind v4 also does not read `tailwind.config.ts` unless it is referenced with `@config`. No Tailwind classes are used in the UI yet, so the pages are intentionally unstyled at this stage.
- **Linting:** Next.js 16 removed `next lint`. To lint, change the script to `"lint": "eslint"` and add an `eslint.config.mjs`.

## Roadmap

- [ ] Data fetching in `app/users/page.tsx` (server-side `fetch`)
- [ ] Dynamic routes (`app/users/[id]/page.tsx`)
- [ ] Caching, static vs dynamic rendering
- [ ] Styling with CSS Modules, Tailwind CSS and DaisyUI

## Acknowledgements

Built while following a Next.js 13 (App Router) with TypeScript beginner tutorial: <https://youtu.be/ZVnjOPwW4ZA>
