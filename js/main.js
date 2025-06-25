document.addEventListener('DOMContentLoaded', function () {
    const loadComponent = (elementId, url) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${url}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .catch(error => {
                console.error(error);
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = `<p class="error">Failed to load content. Please try again later.</p>`;
                }
            });
    };

    const setLanguage = async (lang) => {
        try {
            const response = await fetch(`/assets/i18n/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load language file: ${lang}.json`);
                return;
            }
            const translations = await response.json();

            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[key]) {
                    element.textContent = translations[key];
                }
            });

            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                if (translations[key]) {
                    element.setAttribute('content', translations[key]);
                }
            });
            
            // Set the lang attribute on the html tag for accessibility
            document.documentElement.lang = lang;

        } catch (error) {
            console.error('Error setting language:', error);
        }
    };

    const initialize = async () => {
        // Load Header and Footer
        await Promise.all([
            loadComponent('header-placeholder', '/header.html'),
            loadComponent('footer-placeholder', '/footer.html')
        ]);

        // Set the default language and add event listeners
        // This makes sure the content is loaded before the language is set.
        await setLanguage('en');

        const langSelector = document.getElementById('lang-selector');
        if (langSelector) {
            langSelector.addEventListener('change', (e) => {
                setLanguage(e.target.value);
            });
        }
        
        // Initialize AOS animations after everything is loaded
        AOS.init({
            duration: 800,
            once: true,
            mirror: false
        });
    };

    initialize();
});
