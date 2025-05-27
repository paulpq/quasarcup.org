// Initialize the site to show the home page
let currentPage = 'home';
let currentLang = 'en';

// Function to switch between pages
function showPage(pageName) {
    console.log("Showing page:", pageName, "in language:", currentLang);

    // Hide all page content
    document.querySelectorAll('.page-content').forEach(function (element) {
        element.classList.remove('active');
        element.style.display = 'none';
    });

    // Show selected page content for current language
    const pageElement = document.getElementById(pageName + '-' + currentLang);
    if (pageElement) {
        pageElement.classList.add('active');
        pageElement.style.display = 'block';
        currentPage = pageName;
        // Scroll to top when changing pages
        window.scrollTo(0, 0);
    } else {
        console.error("Page element not found:", pageName + '-' + currentLang);
    }
}

// Main language switching function
function switchLanguage(lang) {
    console.log("Switching to language:", lang);

    // Update current language
    currentLang = lang;
    window.currentLanguage = lang;

    // 1. Handle navigation menus (desktop)
    document.querySelectorAll('#nav-en, #nav-ro').forEach(nav => {
        nav.style.display = 'none';
    });
    const selectedDesktopNav = document.getElementById('nav-' + lang);
    if (selectedDesktopNav) {
        selectedDesktopNav.style.display = 'block';
    }

    // 2. Handle content sections
    document.querySelectorAll('.lang-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    const selectedContent = document.getElementById('content-' + lang);
    if (selectedContent) {
        selectedContent.classList.add('active');
        selectedContent.style.display = 'block';
    }

    // 3. Update desktop language buttons
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    const desktopBtn = document.getElementById(lang + '-btn');
    if (desktopBtn) {
        desktopBtn.classList.add('active');
    }

    // 4. Update mobile language buttons
    updateMobileLanguageButtons(lang);

    // 5. Update mobile navigation
    showMobileNavForLanguage(lang);

    // 6. Always redirect to home page when switching languages
    currentPage = 'home'; // Reset current page to home
    showPage('home'); // Always show home page in new language

    // 7. Update navigation active states to highlight home
    updateNavigationActiveState('home');
}

// Initialize language state function
function initializeLanguageState() {
    // Set initial language (default to English)
    currentLang = 'en';
    window.currentLanguage = 'en';

    // Set initial active states for mobile buttons
    updateMobileLanguageButtons('en');

    // Show correct mobile navigation
    showMobileNavForLanguage('en');

    // Show initial page
    showPage('home');
}

// Update mobile language button states
function updateMobileLanguageButtons(lang) {
    // Remove active class from all mobile buttons
    document.querySelectorAll('.mobile-lang-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected button
    const activeMobileBtn = document.getElementById('mobile-' + lang + '-btn');
    if (activeMobileBtn) {
        activeMobileBtn.classList.add('active');
    }
}

// Show mobile navigation for specific language
function showMobileNavForLanguage(lang) {
    // Hide all mobile navigations
    document.querySelectorAll('.mobile-nav-lang').forEach(nav => {
        nav.style.display = 'none';
    });

    // Show selected mobile navigation
    const selectedMobileNav = document.getElementById('mobile-nav-' + lang);
    if (selectedMobileNav) {
        selectedMobileNav.style.display = 'block';
    }
}

// Update navigation active state
function updateNavigationActiveState(pageName) {
    // Remove active class from all navigation links
    document.querySelectorAll('.navigation a').forEach(link => {
        link.classList.remove('active-nav');
    });

    // Add active class to the current page link
    const activeLinks = document.querySelectorAll(`[onclick="showPage('${pageName}')"]`);
    activeLinks.forEach(link => {
        link.classList.add('active-nav');
    });
}

// Burger Menu Functionality
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    // Close mobile menu function
    function closeMobileMenu() {
        if (burgerMenu) burgerMenu.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Open mobile menu
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.add('active');
            if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }

    // Close menu when clicking close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }

    // Close menu when clicking outside content
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function (e) {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Make closeMobileMenu globally available
    window.closeMobileMenu = closeMobileMenu;

    // Initialize language state
    initializeLanguageState();
});

// Navigation active state highlighting
document.addEventListener('DOMContentLoaded', function () {
    // Highlight the active navigation item
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(item => item.classList.remove('active-nav'));
            this.classList.add('active-nav');
        });
    });
});

// FAQ functionality
document.addEventListener('DOMContentLoaded', function () {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        }
    });

});