document.addEventListener("DOMContentLoaded", function () {
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

  // Load header and footer for job pages (note the relative path ../)
  loadComponent('../header.html', 'header-placeholder');
  loadComponent('../footer.html', 'footer-placeholder');

  // Initialize AOS (Animate on Scroll)
  AOS.init();

  // Language Detection and Selector Logic
  setTimeout(() => {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      const supportedLangs = ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'zh', 'ar', 'hi', 'sw', 'zu'];
      const englishRegions = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-ZA'];
      const userLang = navigator.language || navigator.userLanguage;

      // Pre-select the browser language
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

        // Attempt to redirect to the same page in the selected language directory
        fetch(`../${selectedLanguage}/${currentPage}`)
          .then(response => {
            if (response.ok) {
              window.location.href = `../${selectedLanguage}/${currentPage}`;
            } else {
              window.location.href = `../${selectedLanguage}/index.html`;
            }
          })
          .catch(() => {
            window.location.href = `../${selectedLanguage}/index.html`;
          });
      });
    }
  }, 500);
});
