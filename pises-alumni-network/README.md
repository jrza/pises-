# PISES Alumni Network

A full-stack web application that lets PISES alumni register themselves and appear as interactive pins on a 3-D globe. Built with Vite + React + TypeScript, Tailwind CSS, Supabase (auth + database + RLS), and `react-globe.gl`.

---

## Features

| Feature | Details |
|---|---|
| 🌍 Interactive Globe | Explore where alumni live using a 3-D globe powered by `react-globe.gl` |
| 📋 Alumni Directory | Searchable, card-based list of all approved alumni |
| 📝 Submit Form | Any visitor can submit their profile (stored as `pending`) |
| 🔒 Row-Level Security | Only `@pises.edu.sa` email holders can view approved alumni; admins have full access |
| 🤖 AI-ready | `vector(1536)` column for future OpenAI embedding-based semantic search |

---

## Project Structure

```
pises-alumni-network/
├── frontend/                 # Vite + React + TypeScript app
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── AlumniCard.tsx
│   │   │   └── Navbar.tsx
│   │   ├── lib/              # Supabase client & shared types
│   │   │   ├── supabase.ts
│   │   │   └── types.ts
│   │   ├── pages/            # Route-level page components
│   │   │   ├── DirectoryPage.tsx
│   │   │   ├── MapPage.tsx
│   │   │   └── SubmitPage.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.local            # Environment variables (not committed)
│   └── package.json
├── supabase/
│   └── schema.sql            # Full database schema with RLS policies
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Supabase](https://supabase.com/) project (free tier is fine)
- (Optional) An [OpenAI](https://platform.openai.com/) API key for future semantic-search features

---

## Supabase Setup

### 1. Create a Supabase project

Go to [app.supabase.com](https://app.supabase.com) and create a new project.

### 2. Enable the pgvector extension

In your Supabase dashboard → **Database → Extensions**, search for **vector** and enable it.  
*(The schema.sql also runs `create extension if not exists vector` as a safety net.)*

### 3. Run the schema

In the Supabase dashboard, open **SQL Editor** and paste the contents of `supabase/schema.sql`, then click **Run**.

This will:
- Create the `alumni` table with all required columns
- Enable Row Level Security (RLS)
- Create policies for public inserts, PISES-email reads, and admin full access
- Add performance indexes (including an IVFFlat index for vector similarity search)

### 4. (Optional) Update the admin email

In `supabase/schema.sql`, find the line:

```sql
auth.jwt() ->> 'email' = 'admin@pises.edu.sa'
```

Replace `admin@pises.edu.sa` with the actual admin email address, then re-run that policy block.

---

## Local Setup

### 1. Clone the repository

```bash
# Repository name: pises-
git clone https://github.com/jrza/pises-.git
cd pises-/pises-alumni-network/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.local` (already present with empty placeholders) and fill in your values:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_OPENAI_API_KEY=<your-openai-key>   # optional, for future AI features
```

You can find `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your Supabase dashboard under **Project Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite 7](https://vite.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Globe | [react-globe.gl](https://github.com/vasturiano/react-globe.gl) |
| Backend / DB | [Supabase](https://supabase.com/) (Postgres + Auth + RLS) |
| Vector search | [pgvector](https://github.com/pgvector/pgvector) |
| Routing | [React Router v7](https://reactrouter.com/) |

---

## RLS Policy Summary

| Role | Allowed operations |
|---|---|
| `anon` (unauthenticated) | `INSERT` only (submit form) |
| `authenticated` with `@pises.edu.sa` email | `SELECT` where `status = 'approved'` |
| Admin (hardcoded email in policy) | Full `SELECT / INSERT / UPDATE / DELETE` |

---

## Roadmap

- [ ] Admin dashboard for approving/rejecting pending profiles
- [ ] OpenAI embedding generation on profile submit
- [ ] Semantic search ("find alumni who work in AI in Europe")
- [ ] Supabase Auth login gate for the Directory page
- [ ] Image upload via Supabase Storage
