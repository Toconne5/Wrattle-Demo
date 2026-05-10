# Wrattle

A social investing app that turns every dollar into a conversation — and an investment. Wrattle combines peer-to-peer stock gifting, social feeds, and investment education into a mobile-first experience.

## Features

- **Social Feed** — See what friends are investing in, like, comment, and share
- **Send & Invest** — Send stock investments to friends or your own brokerage accounts
- **Friends** — Add friends, view their activity, and chat
- **Portfolio** — Track holdings, asset allocation, and stock performance with interactive charts
- **Education** — Courses, quick tips, and community learning for all skill levels
- **AI Assistant** — Chat-based assistant for investment questions
- **Investment Challenges** — Gamified goals to encourage consistent investing

## Tech Stack

- **Runtime:** Vite + React 18 (client-side SPA)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Radix UI primitives)
- **State/Data:** TanStack React Query, React Context
- **Routing:** React Router DOM v6
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Auth/Database:** Firebase (Auth + Firestore)
- **Stock Data:** Alpha Vantage API (requires backend proxy — see note below)

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm (comes with Node.js)

## Getting Started

```sh
git clone git@github.com:Toconne5/Wrattle-Demo.git
cd Wrattle-Demo
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development build (unminified) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── pages/           # Route-level page components
├── components/
│   ├── ui/          # shadcn/ui primitives
│   ├── feed/        # Social feed components
│   ├── friends/     # Friend management components
│   ├── stock/       # Stock detail modal and charts
│   ├── education/   # Learning content
│   ├── chat/        # Chat/messaging
│   └── ...          # Shared components (tabs, nav, modals)
├── hooks/           # Custom React hooks
├── services/        # API clients (stock data, friends)
├── contexts/        # React context providers (auth, transactions, notifications)
├── types/           # TypeScript type definitions
├── lib/             # Firebase config, utilities
└── assets/          # Static assets
```

## Configuration

### Firebase

The app uses Firebase for authentication and Firestore for data persistence. Firebase config lives in `src/lib/firebase.ts`.

### Stock Data API

> **Note:** The Alpha Vantage API key has been removed from the codebase. The app currently falls back to mock data. A backend proxy (e.g. Firebase Cloud Function) is needed to securely handle API keys before connecting to live stock data.

## Deployment

The app builds to static files (`npm run build` → `dist/`). It can be deployed to any static hosting provider (Firebase Hosting, Vercel, Netlify, S3 + CloudFront, etc.).
