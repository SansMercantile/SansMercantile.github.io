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

  // Language Detection and Selector Logic
  // We need to wait a bit for the footer to be loaded before we can add the event listener
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
          alert(`Page would now translate to ${selectedLanguage}. You need to implement the translation logic.`);
      });
    }
  }, 500); // 500ms delay to ensure footer is loaded

  // Specific script for index.html hero overlay
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
        if(overlay) {
            const triggerPoint = window.innerHeight * 0.01;
            if (window.scrollY > triggerPoint) {
            overlay.style.opacity = 1;
            } else {
            overlay.style.opacity = 0;
            }
        }
      });
  }
});
