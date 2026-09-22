const fs = require('fs');
const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const pages = [
    'https://rahul-saini.com/',
    'https://rahul-saini.com/about/',
    'https://rahul-saini.com/blog/'
  ];

  for (const pageUrl of pages) {
    try {
      console.log('--- FETCHING:', pageUrl);
      const html = await fetchUrl(pageUrl);
      
      // Extract links
      const linkRegex = /href=["'](https?:\/\/rahul-saini\.com\/[^"']+)["']/g;
      let match;
      const links = new Set();
      while ((match = linkRegex.exec(html)) !== null) {
        links.add(match[1]);
      }
      console.log('LINKS FOUND:', Array.from(links).slice(0, 15));

      // Extract image srcs
      const imgRegex = /src=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp))["']/gi;
      const images = new Set();
      while ((match = imgRegex.exec(html)) !== null) {
        images.add(match[1]);
      }
      console.log('IMAGES FOUND:', Array.from(images).slice(0, 15));

      // Clean text
      const cleanText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                            .replace(/<[^>]+>/g, '\n')
                            .replace(/\n\s*\n/g, '\n');

      console.log('TEXT (first 2500 chars):\n', cleanText.slice(0, 2500));
      fs.writeFileSync(`scratch/scraped_${pageUrl.replace(/[^a-z0-9]/gi, '_')}.txt`, cleanText);
    } catch (err) {
      console.error('Error fetching', pageUrl, err.message);
    }
  }
}

run();
