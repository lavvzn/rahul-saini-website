const fs = require('fs');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const posts = await fetchJson('https://rahul-saini.com/wp-json/wp/v2/posts?per_page=100');
    console.log('--- POSTS COUNT:', Array.isArray(posts) ? posts.length : 'not array');
    if (Array.isArray(posts)) {
      posts.forEach(p => {
        console.log(`POST [${p.id}]: ${p.title.rendered} (${p.slug})`);
        console.log(`LINK: ${p.link}`);
      });
      fs.writeFileSync('scratch/wp_posts.json', JSON.stringify(posts, null, 2));
    }

    const pages = await fetchJson('https://rahul-saini.com/wp-json/wp/v2/pages?per_page=100');
    console.log('--- PAGES COUNT:', Array.isArray(pages) ? pages.length : 'not array');
    if (Array.isArray(pages)) {
      pages.forEach(p => {
        console.log(`PAGE [${p.id}]: ${p.title.rendered} (${p.slug})`);
      });
      fs.writeFileSync('scratch/wp_pages.json', JSON.stringify(pages, null, 2));
    }

    const media = await fetchJson('https://rahul-saini.com/wp-json/wp/v2/media?per_page=100');
    console.log('--- MEDIA COUNT:', Array.isArray(media) ? media.length : 'not array');
    if (Array.isArray(media)) {
      const imgUrls = media.map(m => m.source_url);
      console.log('MEDIA URLS:', imgUrls);
      fs.writeFileSync('scratch/wp_media.json', JSON.stringify(media, null, 2));
    }
  } catch (err) {
    console.error('Error fetching WP REST:', err);
  }
}

run();
