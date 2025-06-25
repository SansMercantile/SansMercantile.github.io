document.addEventListener("DOMContentLoaded", async () => {

  // --- 1. Function to fetch and insert HTML components ---
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
  await Promise.all([
    loadComponent('header-placeholder', '_header.html'),
    loadComponent('footer-placeholder', '_footer.html')
  ]);

  // --- 3. Initialize Plugins and Scripts that depend on loaded content ---
  AOS.init();

  const languageSelect = document.getElementById('language-select');
  
  // --- 4. Language Translation Logic ---
  if (languageSelect) {

    // Function to fetch and apply translations
    async function setLanguage(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) {
                console.warn(`Could not fetch translation file for "${lang}"`);
                return;
            }
            const translations = await response.json();

            // Error check for a valid translation file
            if (!translations || typeof translations !== 'object') {
                console.warn(`Invalid or missing translation data in file for "${lang}"`);
                return;
            }

            // Apply translations to elements with data-i18n keys
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                // Safely get nested property value
                const text = key.split('.').reduce((obj, k) => obj && obj[k], translations);
                if (text) {
                    element.innerHTML = text; // Use innerHTML to render <sup> tags correctly
                }
            });

            // Apply translations to placeholder attributes
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const text = key.split('.').reduce((obj, k) => obj && obj[k], translations);
                if (text) {
                    element.setAttribute('placeholder', text);
                }
            });

            // Special handling for meta description and title
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                const descKey = metaDesc.getAttribute('data-i18n-placeholder');
                const text = descKey.split('.').reduce((obj, k) => obj && obj[k], translations);
                if (text) {
                    metaDesc.setAttribute('content', text);
                }
            }
            const titleTag = document.querySelector('title');
             if (titleTag) {
                const titleKey = titleTag.getAttribute('data-i18n');
                const text = titleKey.split('.').reduce((obj, k) => obj && obj[k], translations);
                if (text) {
                    titleTag.textContent = text;
                }
            }
            
            document.documentElement.lang = lang;

        } catch (error) {
            console.error(`Error loading language file for "${lang}":`, error);
        }
    }

    // Detect browser language and set initial state
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
    if ([...languageSelect.options].some(o => o.value === userLang)) {
        languageSelect.value = userLang;
    }

    // Set initial language
    await setLanguage(languageSelect.value);

    // Add event listener for language changes
    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
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
