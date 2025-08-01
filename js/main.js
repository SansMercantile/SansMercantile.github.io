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

document.addEventListener("DOMContentLoaded", function() {
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
      // All components loaded, now show the main content
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
      // Initialize other scripts after components are ready
      initializePage();
    }).catch(error => {
      console.error("Error loading components:", error);
      // Even if components fail to load, show the main content
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
          // Map language code to landing page
          const langToPage = {
              'en': 'index.html',
              'fr': 'fr.html',
              'ja': 'ja.html',
              'zh': 'zh.html',
              'sw': 'sw.html',
              'zu': 'zu.html'
              // Add more mappings as you add more landing pages
          };
          const targetPage = langToPage[selectedLanguage] || 'index.html';
          if (window.location.pathname.endsWith(targetPage)) {
              // Already on the correct page, do nothing
              return;
          }
          window.location.href = '/' + targetPage;
      });
    }

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
  };

  // Start loading components
  loadAllComponents();
});
