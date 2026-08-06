-- Run this against the real Supabase project once it's connected.
-- Not applied automatically by this codebase.

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  menu text not null check (menu in ('1', '2', '3')),
  preferred_datetime_1 timestamptz not null,
  preferred_datetime_2 timestamptz,
  preferred_datetime_3 timestamptz,
  note text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists reservations_created_at_idx on reservations (created_at desc);
