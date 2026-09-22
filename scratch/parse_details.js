const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('scratch/wp_posts.json', 'utf8'));
console.log('=== REAL POSTS / BOOKS / ARTICLES ===');
posts.forEach(p => {
  console.log('-----------------------------------');
  console.log('TITLE:', p.title.rendered);
  console.log('SLUG:', p.slug);
  console.log('DATE:', p.date);
  console.log('LINK:', p.link);
  console.log('CONTENT:', p.content.rendered.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
});

const pages = JSON.parse(fs.readFileSync('scratch/wp_pages.json', 'utf8'));
console.log('=== REAL PAGES ===');
pages.forEach(p => {
  console.log('-----------------------------------');
  console.log('TITLE:', p.title.rendered);
  console.log('SLUG:', p.slug);
  console.log('CONTENT:', p.content.rendered.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
});
