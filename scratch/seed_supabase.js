const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env = {}
envContent.split('\n').forEach((line) => {
  const [key, ...vals] = line.split('=')
  if (key && vals.length) env[key.trim()] = vals.join('=').trim()
})

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

async function seed() {
  console.log('Seeding Supabase database...')

  // 1. Books
  const books = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'books.json'), 'utf-8'))
  for (const b of books) {
    const { error } = await supabase.from('books').upsert({
      slug: b.slug,
      title: b.title,
      year: b.year,
      cover: b.cover,
      short_description: b.shortDescription,
      description: b.description,
      publisher: b.publisher,
      isbn: b.isbn,
      pages: b.pages,
      language: b.language,
      price: b.price,
      availability: b.availability,
      published: b.published,
      featured: b.featured,
      sort_order: b.order,
    }, { onConflict: 'slug' })
    if (error) console.error('Book error:', b.title, error.message)
    else console.log('✓ Seeded book:', b.title)
  }

  // 2. Blog Posts
  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'blog.json'), 'utf-8'))
  for (const p of posts) {
    const { error } = await supabase.from('blog_posts').upsert({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      image: p.image,
      excerpt: p.excerpt,
      reading_time: p.readingTime,
      content: p.content,
      published: p.published,
      featured: p.featured,
      sort_order: p.order,
    }, { onConflict: 'slug' })
    if (error) console.error('Blog post error:', p.title, error.message)
    else console.log('✓ Seeded blog post:', p.title)
  }

  // 3. Writings
  const writings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'writings.json'), 'utf-8'))
  for (const w of writings) {
    const { error } = await supabase.from('writings').upsert({
      slug: w.slug,
      title: w.title,
      date: w.date,
      excerpt: w.excerpt,
      image: w.image || '',
      content: w.content,
      published: w.published,
      sort_order: w.order,
    }, { onConflict: 'slug' })
    if (error) console.error('Writing error:', w.title, error.message)
    else console.log('✓ Seeded writing:', w.title)
  }

  // 4. Press Items
  const press = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'press.json'), 'utf-8'))
  for (const pr of press) {
    const { error } = await supabase.from('press_items').upsert({
      slug: pr.slug,
      publication: pr.publication,
      headline: pr.headline,
      date: pr.date,
      excerpt: pr.excerpt,
      url: pr.url || null,
      published: pr.published,
      sort_order: pr.order,
    }, { onConflict: 'slug' })
    if (error) console.error('Press error:', pr.headline, error.message)
    else console.log('✓ Seeded press item:', pr.headline)
  }

  // 5. Praise Quotes
  const praise = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'praise.json'), 'utf-8'))
  for (const pq of praise) {
    const { error } = await supabase.from('praise_quotes').insert({
      quote: pq.quote,
      publication: pq.publication,
      published: pq.published,
      sort_order: pq.order,
    })
    if (error) console.error('Praise error:', pq.publication, error.message)
    else console.log('✓ Seeded praise quote:', pq.publication)
  }

  // 6. Site Content
  const site = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'site.json'), 'utf-8'))
  const { error: siteErr } = await supabase.from('site_content').upsert({
    id: 1,
    author_name: site.authorName,
    role: site.role,
    tagline: site.tagline,
    email: site.email,
    meta_title: site.metaTitle,
    meta_description: site.metaDescription,
    footer_text: site.footerText,
    social: site.social,
    about_short: site.aboutShort,
    about_long: site.aboutLong,
    portrait_hero: site.portraitHero,
    portrait_about: site.portraitAbout,
    nav: site.nav,
  }, { onConflict: 'id' })
  if (siteErr) console.error('Site content error:', siteErr.message)
  else console.log('✓ Seeded site content')

  console.log('Seeding complete!')
}

seed()
