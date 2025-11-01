-- Lecture publique des tables principales
alter table public.region enable row level security;
alter table public.regionstat enable row level security;
alter table public.actor enable row level security;
alter table public.filiere enable row level security;
alter table public.project enable row level security;
alter table public.submission enable row level security;

create policy "public_read_region" on public.region
for select using (true);

create policy "public_read_regionstat" on public.regionstat
for select using (true);

create policy "public_read_actor" on public.actor
for select using (true);

create policy "public_read_filiere" on public.filiere
for select using (true);

create policy "public_read_project" on public.project
for select using (true);

create policy "insert_own_submission" on public.submission
for insert with check (auth.uid()::text = createdby);

create policy "select_own_submission" on public.submission
for select using (createdby = auth.uid()::text);

create policy "admin_submissions" on public.submission
for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');

create policy "admin_mutations_actor" on public.actor
for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');

create policy "admin_mutations_filiere" on public.filiere
for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');

create policy "admin_mutations_project" on public.project
for all using (auth.jwt() ->> 'role' = 'admin') with check (auth.jwt() ->> 'role' = 'admin');
