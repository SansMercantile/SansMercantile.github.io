const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BLOG_DIR = path.join(__dirname, 'blogs');
const OUTPUT_FILE = path.join(__dirname, 'blog.html');

// Define hashtags per blog post filename
const hashtagMap = {
  'redefining-risk.html': ['#EmergingMarkets', '#InclusiveFinance', '#AIInfrastructure', '#MarketResilience'],
  'blog-compliance-framework.html': ['#RegulatoryCompliance', '#GovernanceTech', '#TrustByDesign', '#FintechFrameworks'],
  'blog-ai-revolution.html': ['#AITrading', '#CFDMarkets', '#MachineLearning', '#QuantFinance'],
  'blog-human-edge.html': ['#EthicalAI', '#HumanCenteredTech', '#AILeadership', '#FintechInnovation']
};

// Inject SEO metadata into each blog post
function injectSEO(fileName, html) {
  const $ = cheerio.load(html);

  // Remove existing SEO tags
  $('meta[name="description"]').remove();
  $('meta[name="keywords"]').remove();
  $('link[rel="canonical"]').remove();
  $('meta[property^="og:"]').remove();
  $('meta[name^="twitter:"]').remove();

  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || 'Sans Mercantile™ blog post.';
  const rawImage = $('img').first().attr('src') || '/img/default.jpg';
  const imagePath = rawImage.startsWith('/') ? rawImage : '/' + rawImage.replace(/^\.\.\//, '');
  const canonical = `https://www.sansmercantile.com/blog/${fileName}`;
  const keywords = hashtagMap[fileName] || ['#Uncategorized'];

  const seoBlock = `
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="https://www.sansmercantile.com${imagePath}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Sans Mercantile™" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://www.sansmercantile.com${imagePath}" />
    <meta name="twitter:site" content="@SansMercantile" />
    <meta name="keywords" content="${keywords.join(', ')}" />
  `;

  $('head').append(seoBlock);

  // Use XML-style serialization to preserve self-closing slashes
  return $.xml();
}

const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.html'));
const categories = {};

blogFiles.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const updatedHtml = injectSEO(file, html);
  fs.writeFileSync(filePath, updatedHtml, 'utf8');

  const $ = cheerio.load(updatedHtml);
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
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
    <section class="blog-category-section" data-aos="fade-up" id="${tag.slice(1)}">
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
  <link rel="icon" type="image/svg+xml" href="img/logo.svg" />
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
