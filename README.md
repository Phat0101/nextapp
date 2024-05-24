This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Website link
(https://nextapp-opal-delta.vercel.app/)

## Getting Started

Fist, install all dependecies
```bash
npm install
```
Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure
Root Layout at `src/app/layout.tsx`

Contacts homepage at `src/app/page.tsx`

Each profile at `src/app/profile/[id]/page.tsx`

Navigation component at `src/components/Navbar.tsx`

## Features
- Search
- Sorting by name, username, email, phone, etc;
- Toggle dark mode (everyone needs it nowsday)
- Pagination (if more rows)
- View location by map

## Dependencies and External Libraries
- tailwindcss
- react-icons
- Shadcn
- framer-motion
- nextui-org
