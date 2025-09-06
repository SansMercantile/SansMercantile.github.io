const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // npm install cheerio

const BLOG_DIR = path.join(__dirname, 'blogs');
const OUTPUT_FILE = path.join(__dirname, 'blog.html');

const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.html'));

const categories = {};

blogFiles.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);

  const title = $('title').text().trim() || 'Untitled';
  const description = $('meta[name="description"]').attr('content') || 'No description available.';
  const keywords = $('meta[name="keywords"]').attr('content') || '';
  const href = `/blogs/${file}`;

  const tags = keywords
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.startsWith('#'));

  if (tags.length === 0) tags.push('#Uncategorized');

  tags.forEach(tag => {
    if (!categories[tag]) categories[tag] = [];
    categories[tag].push(`
      <article class="blog-card">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${href}" class="blog-link">Read More &rarr;</a>
      </article>
    `);
  });
});

const categorySections = Object.entries(categories).map(([tag, posts]) => {
  return `
    <section class="blog-category-section" data-aos="fade-up">
      <h3>${tag}</h3>
      <div class="blog-articles-grid">
        ${posts.join('\n')}
      </div>
    </section>
  `;
}).join('\n');

const htmlOutput = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sans Mercantile™ | Thought Leadership</title>
  <link rel="stylesheet" href="css/style.css" />
  <meta name="description" content="Dive into Sans Mercantile's™ research, expert analysis, and thought leadership on AI-powered trading, compliance, and inclusive market development." />
</head>
<body>
  <div id="header-placeholder"></div>

  <main role="main" class="main-wrap">
    <section class="blog-hero" data-aos="fade-up">
      <h2>Insights & Innovation: Shaping the Future of AI Finance</h2>
      <p>Dive into Sans Mercantile’s™ research, expert analysis, and thought leadership on AI-powered trading, compliance, and inclusive market development.</p>
    </section>

    ${categorySections}

    <section class="blog-categories" data-aos="fade-up" data-aos-delay="200">
      <h3>Explore by Category</h3>
      <div class="category-tags">
        ${Object.keys(categories).map(tag => `<a href="#${tag.slice(1)}" class="tag">${tag}</a>`).join('\n')}
      </div>
    </section>
  </main>

  <div id="footer-placeholder"></div>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="/js/main.js"></script>
  <script src="js/blog-navigation.js"></script>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const blogLinks = Array.from(document.querySelectorAll('a.blog-link'))
        .map(link => {
          const href = link.getAttribute('href');
          return href.startsWith('/') ? href : '/' + href;
        })
        .filter(href => href.startsWith('/blogs/'));

      localStorage.setItem('sansBlogPosts', JSON.stringify(blogLinks));
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, htmlOutput, 'utf8');
console.log(`✅ Blog index generated with ${blogFiles.length} posts across ${Object.keys(categories).length} categories.`);
