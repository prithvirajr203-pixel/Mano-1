-- ============================================================
-- DD ART ACADEMY — Admin Panel Supabase Setup
-- ============================================================
-- Run this entire file once in your Supabase project's SQL Editor:
-- Supabase Dashboard → SQL Editor → New Query → paste this → Run.
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES (extends Supabase auth users with role + approval)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Automatically create a profile row (status = pending) whenever
-- someone signs up through "Request Access".
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Helper functions used by RLS policies below.
create or replace function public.is_approved()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and status = 'approved'
  );
$$ language sql security definer stable set search_path = public;

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and status = 'approved' and role = 'admin'
  );
$$ language sql security definer stable set search_path = public;

-- Profiles policies: everyone can see their own row; admins can see
-- and manage everyone (needed for the Access Requests screen).
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "admins read all profiles" on public.profiles;
create policy "admins read all profiles" on public.profiles
  for select using (public.is_admin());

drop policy if exists "admins update profiles" on public.profiles;
create policy "admins update profiles" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- 2. CONTENT TABLES
-- ------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  image_url text,
  learning_mode text[] default '{}',
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.art_forms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.student_works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  image_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  feedback text not null,
  rating int default 5,
  photo_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  youtube_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.settings (
  id int primary key default 1,
  phone text,
  whatsapp text,
  email text,
  address text,
  youtube_url text,
  instagram_links jsonb default '[]',
  founder_name text,
  founder_bio text,
  founder_photo_url text,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

insert into public.settings (
  id, phone, whatsapp, email, address, youtube_url, instagram_links
) values (
  1,
  '7395818183',
  '917395818183',
  'dhivyaartist@gmail.com',
  '45/2 Jeevanagar, Sr Agency Opposite, Deevattipatti, Salem, Tamil Nadu - 636351',
  'https://youtube.com/@ddartacademy?si=6rGCCzOVepWMbozJ',
  '[
    {"label": "Main Page", "url": "https://www.instagram.com/dd_artist__?igsh=MzVqc2h3cTdpMWlk"},
    {"label": "Academy Page", "url": "https://www.instagram.com/ddartacademy?igsh=b3ozMGQ5c2w1enl4"},
    {"label": "Studio Page", "url": "https://www.instagram.com/dd_fabricboutique_and_studio?igsh=MXViOGtva2h1b3pzag=="}
  ]'::jsonb
)
on conflict (id) do nothing;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  course text,
  mode text,
  message text,
  status text default 'new' check (status in ('new', 'read', 'resolved')),
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 2b. SEED CONTENT — matches what the public website already ships
--     with, so switching it to "live" mode doesn't leave it blank.
--     Add real photos to any of these from the admin panel any time.
-- ------------------------------------------------------------
insert into public.courses (title, category, description, learning_mode, sort_order)
select * from (values
  ('Kids Courses', 'Kids', 'Fun, guided art classes designed to build confidence and creativity in young learners.', array['Online','Offline'], 1),
  ('Certificate Courses', 'Certificate', 'Structured learning opportunities with certificate options for dedicated learners.', array['Online','Offline'], 2),
  ('Diploma Courses', 'Diploma', 'In-depth, structured diploma-level training for students pursuing art seriously.', array['Offline'], 3),
  ('Drawing Courses', 'Drawing', 'Learn drawing fundamentals through guided, practical, step-by-step practice.', array['Online','Offline'], 4),
  ('Painting Courses', 'Painting', 'Explore acrylic, watercolour, oil and fabric painting with professional guidance.', array['Online','Offline'], 5),
  ('Fine Arts', 'Fine Arts', 'Build a strong foundation across core fine arts techniques and concepts.', array['Offline'], 6),
  ('Art & Craft', 'Art & Craft', 'Hands-on art and craft sessions that blend creativity with practical skills.', array['Offline'], 7),
  ('Teacher Training', 'Teacher Training', 'Professional training for aspiring art teachers, focused on teaching methods.', array['Offline'], 8),
  ('Professional Art Courses', 'Professional', 'Advanced, practical training for students building a professional art career.', array['Online','Offline'], 9)
) as v(title, category, description, learning_mode, sort_order)
where not exists (select 1 from public.courses);

insert into public.art_forms (name, description, sort_order)
select * from (values
  ('Pencil Drawing', 'Master shading, proportion and line work with graphite pencils.', 1),
  ('Colour Pencil', 'Build vibrant, layered artwork using coloured pencil techniques.', 2),
  ('Charcoal', 'Explore bold contrast and texture through charcoal drawing.', 3),
  ('Oil Pastels', 'Create rich, blendable artwork with oil pastel techniques.', 4),
  ('Soft Pastels', 'Learn soft blending and colour layering with pastel medium.', 5),
  ('Acrylic Painting', 'Practical training in acrylic techniques, from basics to detail work.', 6),
  ('Watercolour', 'Understand washes, blending and control with watercolour paints.', 7),
  ('Fabric Painting', 'Design and paint on fabric using structured, guided methods.', 8),
  ('Portrait Art', 'Study facial proportion and expression to create realistic portraits.', 9),
  ('Texture Art', 'Experiment with tactile, layered techniques for textured artwork.', 10),
  ('Oil Painting', 'Learn traditional oil painting methods, from underpainting to detail.', 11),
  ('Sculpture Painting', 'Combine sculpting and painting techniques for 3D artwork.', 12),
  ('Mixed Media Art', 'Blend multiple mediums and materials into a single creative piece.', 13)
) as v(name, description, sort_order)
where not exists (select 1 from public.art_forms);

insert into public.awards (title, description)
select * from (values
  ('Academy Recognition', 'Add details of this achievement from the admin panel.'),
  ('Student Achievement', 'Add details of this achievement from the admin panel.')
) as v(title, description)
where not exists (select 1 from public.awards);


-- Pattern for every content table:
--   - anyone (including the public website, using the anon key) can
--     read rows where published = true
--   - only approved admin-panel users can insert/update/delete, or
--     read unpublished drafts
alter table public.courses enable row level security;
alter table public.art_forms enable row level security;
alter table public.student_works enable row level security;
alter table public.awards enable row level security;
alter table public.testimonials enable row level security;
alter table public.videos enable row level security;
alter table public.settings enable row level security;
alter table public.enquiries enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['courses','art_forms','student_works','awards','testimonials','videos']
  loop
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format(
      'create policy "public read published" on public.%I for select using (published = true or public.is_approved())',
      t
    );
    execute format('drop policy if exists "approved manage" on public.%I', t);
    execute format(
      'create policy "approved manage" on public.%I for all using (public.is_approved()) with check (public.is_approved())',
      t
    );
  end loop;
end $$;

-- settings: public can read; only approved users can update
drop policy if exists "public read settings" on public.settings;
create policy "public read settings" on public.settings for select using (true);
drop policy if exists "approved update settings" on public.settings;
create policy "approved update settings" on public.settings
  for update using (public.is_approved()) with check (public.is_approved());

-- enquiries: anyone can submit (public contact form); only approved
-- users can read or update them
drop policy if exists "anyone can submit enquiry" on public.enquiries;
create policy "anyone can submit enquiry" on public.enquiries
  for insert with check (true);
drop policy if exists "approved read enquiries" on public.enquiries;
create policy "approved read enquiries" on public.enquiries
  for select using (public.is_approved());
drop policy if exists "approved update enquiries" on public.enquiries;
create policy "approved update enquiries" on public.enquiries
  for update using (public.is_approved()) with check (public.is_approved());

-- ------------------------------------------------------------
-- 4. STORAGE BUCKET for uploaded images
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('academy-images', 'academy-images', true)
on conflict (id) do nothing;

drop policy if exists "public read images" on storage.objects;
create policy "public read images" on storage.objects
  for select using (bucket_id = 'academy-images');

drop policy if exists "approved upload images" on storage.objects;
create policy "approved upload images" on storage.objects
  for insert with check (bucket_id = 'academy-images' and public.is_approved());

drop policy if exists "approved update images" on storage.objects;
create policy "approved update images" on storage.objects
  for update using (bucket_id = 'academy-images' and public.is_approved());

drop policy if exists "approved delete images" on storage.objects;
create policy "approved delete images" on storage.objects
  for delete using (bucket_id = 'academy-images' and public.is_approved());

-- ============================================================
-- 5. MAKE YOUR FIRST ADMIN ACCOUNT
-- ============================================================
-- After running everything above:
--   1. Go to the deployed admin panel → "Request admin access" →
--      sign up with your own email + password.
--   2. Come back here and run the two lines below, replacing the
--      email with the one you just signed up with. This makes YOU
--      the first approved admin so you can approve everyone else
--      from inside the panel itself from then on.
--
-- update public.profiles
--   set status = 'approved', role = 'admin'
--   where email = 'your-email@example.com';
-- ============================================================
