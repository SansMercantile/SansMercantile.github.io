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

  // Skip if already injected
  if (html.includes('<!-- SEO injected by generator -->')) return html;

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
    <!-- SEO injected by generator -->
  `;

  $('head').append(seoBlock);
  return $.html();
}

// Read and process blog files
const blogFiles = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith('.html') && file !== 'post.html');

const allPosts = [];

blogFiles.forEach(file => {
  const filePath = path.join(BLOG_DIR, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const updatedHtml = injectSEO(file, html);
  if (updatedHtml !== html) {
    fs.writeFileSync(filePath, updatedHtml, 'utf8');
  }

  const $ = cheerio.load(updatedHtml);
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const keywords = $('meta[name="keywords"]').attr('content') || '';
  const link = `/blogs/${file}`;
  const tags = keywords.split(',').map(tag => tag.trim()).filter(tag => tag.startsWith('#'));

  allPosts.push({ title, description, link, tags });
});

// Build tag list
const uniqueTags = [...new Set(allPosts.flatMap(post => post.tags))];

// Build blog.html output
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

    <section class="blog-articles-grid" id="blogGrid" data-aos="fade-up" data-aos-delay="150">
      <!-- Blog cards will be injected dynamically -->
    </section>

    <section class="blog-categories" data-aos="fade-up" data-aos-delay="200">
      <h3>Explore by Category</h3>
      <div class="category-tags" id="tagBar">
        ${uniqueTags.map(tag => `<a href="#" class="tag">${tag}</a>`).join('\n')}
      </div>
      <button id="seeMoreBtn" class="cta hidden">See More</button>
    </section>
  </main>

  <div id="footer-placeholder"></div>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="/js/main.js"></script>
  <script src="js/blog-navigation.js"></script>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      AOS.init();

      const blogGrid = document.querySelector('.blog-articles-grid');
      const tagBar = document.getElementById('tagBar');
      const seeMoreBtn = document.getElementById('seeMoreBtn');

      const allPosts = ${JSON.stringify(allPosts, null, 2)};
      let currentTag = null;

      function renderPosts(posts) {
        blogGrid.innerHTML = posts.map(post => \`
          <article class="blog-card" data-tags="\${post.tags.join(',')}">
            <h3>\${post.title}</h3>
            <p>\${post.description}</p>
            <a href="\${post.link}" class="blog-link">Read More &rarr;</a>
          </article>
        \`).join('');
      }

      function showRandomPosts() {
        const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
        renderPosts(shuffled.slice(0, 4));
        seeMoreBtn.classList.add('hidden');
        currentTag = null;
      }

      function filterByTag(tag) {
        currentTag = tag;
        const filtered = allPosts.filter(post => post.tags.includes(tag));
        renderPosts(filtered.slice(0, 2));
        seeMoreBtn.classList.remove('hidden');
      }

      function showAllForTag() {
        const filtered = allPosts.filter(post => post.tags.includes(currentTag));
        renderPosts(filtered);
        seeMoreBtn.classList.add('hidden');
      }

      tagBar.addEventListener('click', e => {
        if (e.target.classList.contains('tag')) {
          e.preventDefault();
          filterByTag(e.target.textContent.trim());
        }
      });

      seeMoreBtn.addEventListener('click', showAllForTag);
      showRandomPosts();

      setInterval(() => {
        if (!currentTag) showRandomPosts();
      }, 10000);

      const blogLinks = allPosts.map(post => post.link);
      localStorage.setItem('sansBlogPosts', JSON.stringify(blogLinks));
          });
  </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, htmlOutput, 'utf8');
console.log(`✅ blog.html generated with ${allPosts.length} posts and ${uniqueTags.length} unique tags.`);
