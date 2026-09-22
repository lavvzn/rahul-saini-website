-- ─── Rahul Saini Official Website — Supabase Schema Migration ───

-- 1. Books Table
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  cover TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description JSONB NOT NULL DEFAULT '[]'::jsonb,
  publisher TEXT,
  isbn TEXT,
  pages TEXT,
  language TEXT DEFAULT 'English',
  price TEXT,
  availability TEXT DEFAULT 'In Stock',
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  date TEXT NOT NULL,
  image TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  reading_time TEXT DEFAULT '5 min read',
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Writings Table
CREATE TABLE IF NOT EXISTS writings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image TEXT DEFAULT '',
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Press Items Table
CREATE TABLE IF NOT EXISTS press_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  publication TEXT NOT NULL,
  headline TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  url TEXT,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Praise Quotes Table
CREATE TABLE IF NOT EXISTS praise_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote TEXT NOT NULL,
  publication TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Site Content / Settings Table
CREATE TABLE IF NOT EXISTS site_content (
  id INT PRIMARY KEY DEFAULT 1,
  author_name TEXT NOT NULL DEFAULT 'Rahul Saini',
  role TEXT NOT NULL DEFAULT 'Author & Novelist',
  tagline TEXT NOT NULL,
  email TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  footer_text TEXT,
  social JSONB NOT NULL DEFAULT '[]'::jsonb,
  about_short TEXT NOT NULL,
  about_long JSONB NOT NULL DEFAULT '[]'::jsonb,
  portrait_hero TEXT NOT NULL,
  portrait_about TEXT NOT NULL,
  nav JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 7. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  message TEXT,
  status TEXT DEFAULT 'pending'
);

-- 8. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false
);

-- ─── Enable Row Level Security (RLS) ─────────────────────────────────────────

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE writings ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE praise_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Allow public read on books" ON books FOR SELECT USING (true);
CREATE POLICY "Allow public read on blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read on writings" ON writings FOR SELECT USING (true);
CREATE POLICY "Allow public read on press_items" ON press_items FOR SELECT USING (true);
CREATE POLICY "Allow public read on praise_quotes" ON praise_quotes FOR SELECT USING (true);
CREATE POLICY "Allow public read on site_content" ON site_content FOR SELECT USING (true);

-- Public Insert Policies (Forms)
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on messages" ON messages FOR INSERT WITH CHECK (true);

-- Full Access for Service Role / Anon with key
CREATE POLICY "Allow full access on books" ON books FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on blog_posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on writings" ON writings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on press_items" ON press_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on praise_quotes" ON praise_quotes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on site_content" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access on messages" ON messages FOR ALL USING (true) WITH CHECK (true);
