// js/main.js
// This script is for pages in the root directory.

function toggleLogo() {
  const wordLogoSans = document.querySelector('.logo .sans');
  const wordLogoMerc = document.querySelector('.logo .mercantile');
  const iconLogo = document.getElementById('icon-logo');

  const isIconVisible = iconLogo.classList.contains('visible');

  if (isIconVisible) {
    iconLogo.classList.remove('visible');
    iconLogo.classList.add('hidden');

    wordLogoSans.classList.remove('hidden');
    wordLogoSans.classList.add('visible');

    wordLogoMerc.classList.remove('hidden');
    wordLogoMerc.classList.add('visible');
  } else {
    iconLogo.classList.remove('hidden');
    iconLogo.classList.add('visible');

    wordLogoSans.classList.remove('visible');
    wordLogoSans.classList.add('hidden');

    wordLogoMerc.classList.remove('visible');
    wordLogoMerc.classList.add('hidden');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.classList.add('fade-in-content');
  }

  const loadComponent = (url, placeholderId) => {
    return fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
        return response.text();
      })
      .then(data => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) placeholder.innerHTML = data;
        else console.error(`Placeholder element with id "${placeholderId}" not found.`);
      });
  };

  const loadAllComponents = () => {
    Promise.all([
      loadComponent('header.html', 'header-placeholder'),
      loadComponent('footer.html', 'footer-placeholder')
    ]).then(() => {
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
      initializePage();
    }).catch(error => {
      console.error("Error loading components:", error);
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
    });
  };

  const initializePage = () => {
    AOS.init();

    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      const englishRegions = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-ZA'];
      const userLang = navigator.language || navigator.userLanguage;
      if (englishRegions.some(region => userLang.startsWith(region))) {
        languageSelect.value = 'en';
      } else {
        const langPrefix = userLang.split('-')[0];
        const optionExists = languageSelect.querySelector(`option[value="${langPrefix}"]`);
        if (optionExists) languageSelect.value = langPrefix;
        else languageSelect.value = 'en';
      }

      languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        const langToPage = {
          'en': 'index.html',
          'fr': 'fr.html',
          'ja': 'ja.html',
          'zh': 'zh.html',
          'sw': 'sw.html',
          'zu': 'zu.html'
        };
        const targetPage = langToPage[selectedLanguage] || 'index.html';
        if (!window.location.pathname.endsWith(targetPage)) {
          window.location.href = '/' + targetPage;
        }
      });
    }

    const overlay = document.querySelector('.hero-overlay');
    if (overlay) {
      window.addEventListener('scroll', () => {
        const triggerPoint = window.innerHeight * 0.01;
        if (window.scrollY > triggerPoint) {
          overlay.style.opacity = 1;
          if (window.scrollY > 100) {
            overlay.style.backdropFilter = 'blur(8px)';
            overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.8)';
          } else {
            overlay.style.backdropFilter = 'blur(6px)';
            overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.65)';
          }
        } else {
          overlay.style.opacity = 0;
        }
      });
    }

    // --- Latest Insights Carousel ---
    const insightGrid = document.getElementById('insight-carousel-grid');
    const toggleButtons = document.querySelectorAll('.insight-toggle button');

    const sections = {
      insights: [
        {
          title: "Redefining Risk",
          description: "How our AI engine mitigates structural volatility in underserved markets.",
          link: "blogs/redefining-risk.html"
        },
        {
          title: "Compliance Isn’t a Checkbox",
          description: "How Sans Mercantile™ approaches governance as a trust-building framework.",
          link: "blogs/blog-compliance-framework.html"
        },
        {
          title: "AI Revolution in CFD Trading",
          description: "Deep learning models transforming precision and profitability.",
          link: "blogs/blog-ai-revolution.html"
        },
        {
          title: "The Human Edge in AI Finance",
          description: "Fusing human intuition with machine intelligence for ethical growth.",
          link: "blogs/blog-human-edge.html"
        }
      ],
      newsroom: [
        {
          title: "Fintech Weekly Feature",
          description: "Our CEO shares insights on ethical AI and inclusive finance.",
          link: "newsroom/fintech-weekly-feature.html"
        },
        {
          title: "Global Summit 2025",
          description: "Highlights from our keynote on AI infrastructure in emerging markets.",
          link: "newsroom/global-summit-keynote.html"
        }
      ],
      caseStudies: [
        {
          title: "Microfinance Inclusion",
          description: "Predictive models increased loan approvals by 40%.",
          link: "case-studies/microfinance-inclusion.html"
        },
        {
          title: "Inventory Optimization",
          description: "Reducing waste and boosting vendor profits in informal trade zones.",
          link: "case-studies/inventory-optimization.html"
        }
      ]
    };

    let currentSection = 'insights';
    let currentIndex = 0;
    let interval;

    function renderCards(section, index = 0) {
      const posts = sections[section];
      const pair = posts.slice(index, index + 2);
      insightGrid.classList.remove('fade-in');
      insightGrid.classList.add('fade-out');

      setTimeout(() => {
        insightGrid.innerHTML = pair.map(post => `
          <article class="insight-card">
            <h4>${post.title}</h4>
            <p>${post.description}</p>
            <a href="${post.link}">Read more</a>
          </article>
        `).join('');
        insightGrid.classList.remove('fade-out');
        insightGrid.classList.add('fade-in');
      }, 300);
    }

    function startCarousel() {
      clearInterval(interval);
      const posts = sections[currentSection];
      interval = setInterval(() => {
        currentIndex = (currentIndex + 2) % posts.length;
        renderCards(currentSection, currentIndex);
      }, 5000);
    }

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSection = btn.dataset.section;
        currentIndex = 0;
        renderCards(currentSection, currentIndex);
        startCarousel();
      });
    });

    if (insightGrid) {
      renderCards(currentSection);
      startCarousel();
    }
  };

  loadAllComponents();
});
