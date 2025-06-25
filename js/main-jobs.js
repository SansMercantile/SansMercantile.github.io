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

  // Load header and footer for job pages (note the ../)
  loadComponent('../header.html', 'header-placeholder');
  loadComponent('../footer.html', 'footer-placeholder');
  
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
});
