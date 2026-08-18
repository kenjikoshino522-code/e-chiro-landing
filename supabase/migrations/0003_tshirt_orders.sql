-- Applied directly to the production Supabase project via MCP.

create table if not exists tshirt_orders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  size text not null check (size in ('S','M','L','XL')),
  quantity integer not null check (quantity > 0),
  shipping_address text not null,
  status text not null default 'pending' check (status in ('pending','confirmed','shipped','cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists tshirt_orders_created_at_idx on tshirt_orders (created_at desc);

alter table tshirt_orders enable row level security;

create policy "authenticated users can manage tshirt_orders"
  on tshirt_orders for all
  to authenticated
  using (true)
  with check (true);
