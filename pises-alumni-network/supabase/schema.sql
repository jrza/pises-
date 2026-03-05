-- ============================================================
-- PISES Alumni Network — Supabase Schema
-- ============================================================

-- Enable pgvector extension for AI-powered semantic search
create extension if not exists vector;

-- ============================================================
-- Alumni table
-- ============================================================
create table alumni (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  graduation_year  int         not null,
  university       text        not null,
  city             text        not null,
  country          text        not null,
  lat              float       not null,
  lng              float       not null,
  field_of_study   text        not null,
  bio              text        not null,
  photo_url        text,
  linkedin         text,
  instagram        text,
  github           text,
  other_link       text,
  status           text        default 'pending'
                               check (status in ('pending', 'approved')),
  embedding        vector(1536),
  created_at       timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table alumni enable row level security;

-- ----------------------------------------------------------
-- 1. Public: anyone can INSERT (submit a profile form)
-- ----------------------------------------------------------
create policy "Public can submit alumni profiles"
  on alumni
  for insert
  to anon
  with check (true);

-- ----------------------------------------------------------
-- 2. Authenticated @pises.edu.sa users: can SELECT approved
-- ----------------------------------------------------------
create policy "PISES users can view approved alumni"
  on alumni
  for select
  to authenticated
  using (
    status = 'approved'
    and right(auth.jwt() ->> 'email', length('@pises.edu.sa')) = '@pises.edu.sa'
  );

-- ----------------------------------------------------------
-- 3. Admin (hardcoded email): full access
--    Replace 'admin@pises.edu.sa' with the real admin email.
-- ----------------------------------------------------------
create policy "Admin has full access"
  on alumni
  for all
  to authenticated
  using (
    auth.jwt() ->> 'email' = 'admin@pises.edu.sa'
  )
  with check (
    auth.jwt() ->> 'email' = 'admin@pises.edu.sa'
  );

-- ============================================================
-- Indexes
-- ============================================================

-- Speed up status-filtered queries (the most common query)
create index alumni_status_idx on alumni (status);

-- Speed up graduation year sort in directory view
create index alumni_graduation_year_idx on alumni (graduation_year desc);

-- IVFFlat index for approximate nearest-neighbour search on embeddings
-- (adjust lists count after you have at least 1000 rows)
create index alumni_embedding_idx
  on alumni
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);
