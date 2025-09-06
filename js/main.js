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

document.addEventListener("DOMContentLoaded", function () {
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
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
      initializePage();
    }).catch(error => {
      console.error("Error loading components:", error);
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
        const langToPage = {
          'en': 'index.html',
          'fr': 'fr.html',
          'ja': 'ja.html',
          'zh': 'zh.html',
          'sw': 'sw.html',
          'zu': 'zu.html'
        };
        const targetPage = langToPage[selectedLanguage] || 'index.html';
        if (!window.location.pathname.endsWith(targetPage)) {
          window.location.href = '/' + targetPage;
        }
      });
    }

    const overlay = document.querySelector('.hero-overlay');
    if (overlay) {
      window.addEventListener('scroll', () => {
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

    // --- Insights Carousel & Toggle ---
    const sections = {
      insights: [
        {
          title: "Redefining Risk: Why Township Markets Deserve Better Infrastructure",
          description: "A deep dive into how our AI engine mitigates structural volatility while unlocking scalable growth for communities long overlooked by traditional finance.",
          link: "blogs/redefining-risk.html"
        },
        {
          title: "Compliance Isn’t a Checkbox. It’s a Framework.",
          description: "Why built-in governance matters—and how Sans Mercantile™ approaches compliance as a trust-building opportunity, not a hurdle.",
          link: "blogs/blog-compliance-framework.html"
        }
      ],
      newsroom: [
        {
          title: "Sans Mercantile Featured in Fintech Weekly",
          description: "Our CEO shares insights on ethical AI and inclusive finance in this exclusive interview.",
          link: "newsroom/fintech-weekly-feature.html"
        },
        {
          title: "Global Summit 2025: Keynote Recap",
          description: "Highlights from our keynote on AI infrastructure in emerging markets.",
          link: "newsroom/global-summit-keynote.html"
        }
      ],
      caseStudies: [
        {
          title: "Microfinance Inclusion in Township Markets",
          description: "How our predictive models increased loan approvals by 40% without raising default rates.",
          link: "case-studies/microfinance-inclusion.html"
        },
        {
          title: "AI-Powered Inventory Optimization",
          description: "A case study on reducing waste and boosting vendor profits in informal trade zones.",
          link: "case-studies/inventory-optimization.html"
        }
      ]
    };

    const track = document.getElementById('carousel-track');
    const toggleButtons = document.querySelectorAll('.insight-toggle button');
    const titleEl = document.getElementById('insight-title');
    const viewAllLink = document.getElementById('view-all-link');

    let currentSection = 'insights';
    let currentIndex = 0;
    let interval;

    function renderCarousel(section) {
      track.innerHTML = '';
      sections[section].forEach(item => {
        const card = document.createElement('article');
        card.className = 'insight-card';
        card.innerHTML = `
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <a href="${item.link}">Read more</a>
        `;
        track.appendChild(card);
      });
      track.style.transform = 'translateX(0)';
      currentIndex = 0;
    }

    function startCarousel() {
      clearInterval(interval);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % sections[currentSection].length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }, 5000);
    }

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentSection = btn.dataset.section;
        titleEl.textContent = `Latest ${btn.textContent}`;
        viewAllLink.href = `${btn.dataset.section}.html`;
        renderCarousel(currentSection);
        startCarousel();
      });
    });

    if (track && toggleButtons.length) {
      renderCarousel(currentSection);
      startCarousel();
    }
  };

  loadAllComponents();
});
