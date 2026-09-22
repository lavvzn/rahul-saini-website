const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const imagesToDownload = [
  { url: 'https://rahul-saini.com/wp-content/uploads/2023/06/rahul-saini.jpg', dest: 'public/images/author-portrait-hero.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2023/06/rahul-saini.jpg', dest: 'public/images/author-portrait-about.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2021/01/Love-to-hurt-you-cover.jpg', dest: 'public/images/books/book-01.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2020/12/The-Orange-Hangeover_front-small.jpg', dest: 'public/images/books/book-02.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2020/12/PAPERBACK-DREAMS-small.jpg', dest: 'public/images/books/book-03.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2020/12/Justfor-you-small-cover.jpg', dest: 'public/images/books/book-04.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2020/12/Those-Small-Lil-Things-Cover-small.jpg', dest: 'public/images/books/book-05.png' },
  { url: 'https://rahul-saini.com/wp-content/uploads/2020/12/Just-Like-In-The-Movies-Cover-small.jpg', dest: 'public/images/books/book-06.png' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const img of imagesToDownload) {
    try {
      console.log(`Downloading ${img.url} -> ${img.dest}...`);
      await download(img.url, img.dest);
      console.log(`Saved ${img.dest}`);
    } catch (e) {
      console.error(`Error downloading ${img.url}:`, e.message);
    }
  }
}

run();
