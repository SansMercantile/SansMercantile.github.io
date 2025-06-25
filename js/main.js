document.addEventListener('DOMContentLoaded', async () => {
    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init();

    // --- State for current language ---
    let currentLanguage = 'en';

    // --- Function to load and apply translations ---
    async function setLanguage(lang) {
        const response = await fetch(`lang/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            // Use lodash-like _.get to safely access nested properties
            const text = key.split('.').reduce((obj, k) => obj && obj[k], translations);
            if (text) {
                element.textContent = text;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const text = key.split('.').reduce((obj, k) => obj && obj[k], translations);
            if (text) {
                element.setAttribute('placeholder', text);
            }
        });

        // Special handling for meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descKey = metaDesc.getAttribute('data-i18n-placeholder');
            const text = descKey.split('.').reduce((obj, k) => obj && obj[k], translations);
            if (text) {
                metaDesc.setAttribute('content', text);
            }
        }
        
        currentLanguage = lang;
        document.documentElement.lang = lang;
    }

    // --- Function to load HTML partials (Header/Footer) ---
    async function loadComponent(id, url) {
        const response = await fetch(url);
        const text = await response.text();
        document.getElementById(id).innerHTML = text;
    }

    // --- Load Header and Footer, then set language ---
    await Promise.all([
        loadComponent('header-placeholder', '_header.html'),
        loadComponent('footer-placeholder', '_footer.html')
    ]);

    // --- Language Selector Logic ---
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        // Detect browser language
        const userLang = (navigator.language || navigator.userLanguage).split('-')[0];
        if ([...languageSelect.options].some(o => o.value === userLang)) {
            languageSelect.value = userLang;
        }

        // Set initial language
        await setLanguage(languageSelect.value);

        // Add event listener
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});
