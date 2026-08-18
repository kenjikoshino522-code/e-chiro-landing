-- Applied directly to the production Supabase project via MCP on 2026-08-19.
-- The original 0001_create_reservations.sql table was never actually applied
-- to the live database, so this creates the table fresh with the final
-- schema (email required, phone optional, single preferred_datetime,
-- location, referral_source) rather than migrating existing data.

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  menu text not null check (menu in ('1', '2', '3')),
  preferred_datetime timestamptz not null,
  location text not null check (location in ('渋谷','新宿','池袋','赤羽','横浜','津田沼','自宅')),
  referral_source text not null check (referral_source in ('X','Google','紹介','その他')),
  referral_source_other text,
  note text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists reservations_created_at_idx on reservations (created_at desc);

alter table reservations enable row level security;

create policy "authenticated users can manage reservations"
  on reservations for all
  to authenticated
  using (true)
  with check (true);
