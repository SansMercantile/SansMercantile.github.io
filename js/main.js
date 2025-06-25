document.addEventListener("DOMContentLoaded", async () => {

  // --- 1. Function to fetch and insert HTML components ---
  // Using async/await for reliability
  const loadComponent = async (id, url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      const data = await response.text();
      const placeholder = document.getElementById(id);
      if (placeholder) {
        placeholder.innerHTML = data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --- 2. Load Header and Footer First ---
  // Promise.all ensures both are loaded before the next steps run
  await Promise.all([
    loadComponent('header-placeholder', '_header.html'),
    loadComponent('footer-placeholder', '_footer.html')
  ]);

  // --- 3. Initialize Plugins and Scripts that depend on loaded content ---
  AOS.init();

  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    const englishRegions = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-ZA'];
    const userLang = navigator.language || navigator.userLanguage;

    // Set the dropdown to the user's detected language
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

    // --- 4. Add the Language Switcher Event Listener (Your Logic) ---
    languageSelect.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      
      // Get the name of the current file (e.g., "index.html", "about.html")
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';

      // Redirect to the new language version of the page
      // For example, if on about.html and user selects 'es', it will go to '/es/about.html'
      window.location.href = `/${selectedLanguage}/${currentPage}`;
    });
  }

  // --- 5. Scroll-triggered visual overlay effect for the homepage ---
  const overlay = document.querySelector('.hero-overlay');
  if (overlay) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        overlay.style.backdropFilter = 'blur(8px)';
        overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.8)';
      } else {
        overlay.style.backdropFilter = 'blur(6px)';
        overlay.style.backgroundColor = 'rgba(31, 0, 0, 0.65)';
      }
      
      const triggerPoint = window.innerHeight * 0.01;
      overlay.style.opacity = window.scrollY > triggerPoint ? 1 : 0;
    });
  }
});
