document.addEventListener("DOMContentLoaded", function() {
  // Function to fetch and insert HTML content
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

  // Load header and footer for root pages
  loadComponent('header.html', 'header-placeholder');
  loadComponent('footer.html', 'footer-placeholder');

  // Initialize AOS (Animate on Scroll)
  AOS.init();

  // Language Detection and Selector Logic (wait for footer to be loaded)
  setTimeout(() => {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      const supportedLangs = ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'zh', 'ar', 'hi', 'sw', 'zu'];
      const englishRegions = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-ZA'];
      const userLang = navigator.language || navigator.userLanguage;

      // Pre-select browser language if available
      if (englishRegions.some(region => userLang.startsWith(region))) {
        languageSelect.value = 'en';
      } else {
        const langPrefix = userLang.split('-')[0];
        const optionExists = languageSelect.querySelector(`option[value="${langPrefix}"]`);
        languageSelect.value = optionExists ? langPrefix : 'en';
      }

      // Handle language switch
      languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Check if the selected language version of the current page exists
        fetch(`/${selectedLanguage}/${currentPage}`)
          .then(response => {
            if (response.ok) {
              window.location.href = `/${selectedLanguage}/${currentPage}`;
            } else {
              window.location.href = `/${selectedLanguage}/index.html`; // fallback to homepage of selected lang
            }
          })
          .catch(() => {
            window.location.href = `/${selectedLanguage}/index.html`; // fallback on error too
          });
      });
    }
  }, 500); // 500ms delay to ensure footer is loaded

  // Scroll-triggered visual overlay effect
  if (document.querySelector('.hero-overlay')) {
    window.addEventListener('scroll', () => {
      const overlay = document.querySelector('.hero-overlay');
      if (overlay && window.scrollY > 100) {
        overlay.style.backdropFilter = 'blur(8px)';
        overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.8)';
      } else if (overlay) {
        overlay.style.backdropFilter = 'blur(6px)';
        overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.65)';
      }
    });

    window.addEventListener('scroll', () => {
      const overlay = document.querySelector('.hero-overlay');
      if (overlay) {
        const triggerPoint = window.innerHeight * 0.01;
        overlay.style.opacity = window.scrollY > triggerPoint ? 1 : 0;
      }
    });
  }
});
