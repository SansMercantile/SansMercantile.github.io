document.addEventListener("DOMContentLoaded", function() {
  // --- Centralized Article Data ---
  // Define all articles with their IDs, paths, and categories.
  // This array will be used for navigation and filtering.
  const articlesData = [
    {
      id: 'redefining-risk',
      title: 'Redefining Risk: Why Township Markets Deserve Better Infrastructure',
      path: 'blogs/redefining-risk.html',
      categories: ['EmergingMarkets', 'MarketIntelligence']
    },
    {
      id: 'compliance-framework',
      title: 'Compliance Isn’t a Checkbox. It’s a Framework.',
      path: 'blogs/blog-compliance-framework.html',
      categories: ['RegulatoryCompliance', 'FintechInnovation']
    },
    {
      id: 'ai-revolution',
      title: 'The AI Revolution in CFD Trading: Precision & Profitability',
      path: 'blogs/blog-ai-revolution.html',
      categories: ['AITrading', 'FintechInnovation', 'MarketIntelligence']
    },
    {
      id: 'human-edge',
      title: 'Beyond Algorithms: The Human Edge in AI-Driven Finance',
      path: 'blogs/blog-human-edge.html',
      categories: ['AITrading', 'FintechInnovation', 'MarketIntelligence']
    }
    // Add more articles here as you create them
  ];

  // Function to fetch and insert HTML content for header/footer
  const loadComponent = (url, placeholderId) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
          placeholder.innerHTML = data;
        } else {
          console.error(`Placeholder element with id "${placeholderId}" not found.`);
        }
      })
      .catch(error => console.error(error));
  };

  // Determine which footer to load based on the current page URL
  const currentPathname = window.location.pathname;
  const isArticlePage = currentPathname.includes('/blogs/') && currentPathname.endsWith('.html');

  // Load header (always the same)
  loadComponent('../header.html', 'header-placeholder');

  // Load footer conditionally
  if (isArticlePage) {
    loadComponent('../article-footer.html', 'footer-placeholder');
  } else {
    loadComponent('../footer.html', 'footer-placeholder');
  }
  
  // Initialize AOS (Animate on Scroll)
  AOS.init();

  // Language Detection and Selector Logic (from your original main.js)
  setTimeout(() => {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      const englishRegions = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-ZA'];
      const userLang = navigator.language || navigator.userLanguage;

      if (englishRegions.some(region => userLang.startsWith(region))) {
          languageSelect.value = 'en';
      } else {
          const langPrefix = userLang.split('-')[0];
          const optionExists = languageSelect.querySelector(`option[value="${langPrefix}"]`);
          if (optionExists) {
              languageSelect.value = langPrefix;
          } else {
              languageSelect.value = 'en';
          }
      }

      languageSelect.addEventListener('change', (event) => {
          const selectedLanguage = event.target.value;
          console.log(`Language changed to: ${selectedLanguage}`);
      });
    }
  }, 500);

  // Logic for hero-overlay specific to some pages (from your original main.js)
  if (document.querySelector('.hero-overlay')) {
      window.addEventListener('scroll', () => {
        const overlay = document.querySelector('.hero-overlay');
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

  // --- Article Navigation Logic (New Functionality) ---
  // Get current article ID from data attribute on body
  const currentArticleId = document.body.dataset.articleId;

  if (currentArticleId) { // Only run navigation logic if we're on an article page
    const prevBtn = document.getElementById('prevArticleBtn');
    const nextBtn = document.getElementById('nextArticleBtn');

    let filteredArticles = [];
    const storedFilter = sessionStorage.getItem('currentArticleFilter');
    
    if (storedFilter && storedFilter !== 'clear-filter') {
      // Filter articles by the selected category
      filteredArticles = articlesData.filter(article => 
        article.categories && article.categories.includes(storedFilter)
      );
    } else {
      // No filter or filter cleared, show all articles
      filteredArticles = articlesData;
    }

    const currentIndex = filteredArticles.findIndex(article => article.id === currentArticleId);

    // Update button states and add event listeners
    if (prevBtn) {
      if (currentIndex > 0) {
        prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        prevBtn.addEventListener('click', () => {
          // Adjust path for navigation from a subfolder back to root, then to another subfolder article
          window.location.href = '../' + filteredArticles[currentIndex - 1].path;
        });
      } else {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }

    if (nextBtn) {
      if (currentIndex < filteredArticles.length - 1) {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.addEventListener('click', () => {
          // Adjust path for navigation from a subfolder back to root, then to another subfolder article
          window.location.href = '../' + filteredArticles[currentIndex + 1].path;
        });
      } else {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }

    // Add keyboard navigation (left/right arrow keys)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          window.location.href = '../' + filteredArticles[currentIndex - 1].path;
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < filteredArticles.length - 1) {
          window.location.href = '../' + filteredArticles[currentIndex + 1].path;
        }
      }
    });

    // Add swipe gestures for touch devices
    let touchstartX = 0;
    let touchendX = 0;

    const swipeArea = document.querySelector('.article main'); // Swipe area covers main content
    if (swipeArea) {
      swipeArea.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
      }, { passive: true }); // Use passive listener for better performance

      swipeArea.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
      }, { passive: true }); // Use passive listener for better performance
    }

    function handleGesture() {
      if (touchendX < touchstartX - 50) { // Swiped left
        if (currentIndex < filteredArticles.length - 1) {
          window.location.href = '../' + filteredArticles[currentIndex + 1].path;
        }
      } else if (touchendX > touchstartX + 50) { // Swiped right
        if (currentIndex > 0) {
          window.location.href = '../' + filteredArticles[currentIndex - 1].path;
        }
      }
    }
  }
});
