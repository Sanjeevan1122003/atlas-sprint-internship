// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const catalogCards = document.querySelectorAll('.catalog-card');

if (filterButtons.length > 0 && catalogCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            catalogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-difficulty') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Form Submission
const inquiryForm = document.getElementById('inquiryForm');
const successMessage = document.getElementById('successMessage');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(inquiryForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        if (successMessage) {
            successMessage.style.display = 'flex';
            
            // Hide success message after 5 seconds or when clicked
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            successMessage.addEventListener('click', () => {
                successMessage.style.display = 'none';
            });
        }
        
        // Reset form
        inquiryForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    lastScrollTop = scrollTop;
});

// Navbar background change on scroll
const header = document.querySelector('.header');
const heroSection = document.getElementById('home');

if (header && heroSection) {
    const updateNavbar = () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.pageYOffset + 100; // Offset for header height
        
        if (scrollPosition >= heroBottom) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Check on load
    updateNavbar();
    
    // Check on scroll
    window.addEventListener('scroll', updateNavbar);
}

// Navigation - Show/Hide sections based on hash
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const allSections = document.querySelectorAll('section');
const body = document.body;

const showSection = (sectionId) => {
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (sectionId === 'home' || !sectionId || sectionId === '') {
        // Landing page - show all sections including hero
        body.classList.remove('on-section');
        body.classList.add('on-landing');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Mark home link as active
        const homeLink = document.querySelector('.nav-menu a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Specific section page - show only that section, hide hero
        body.classList.remove('on-landing');
        body.classList.add('on-section');
        
        // Hide all sections
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Mark corresponding nav link as active
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Check URL hash on load
const checkHash = () => {
    const hash = window.location.hash.substring(1); // Remove #
    showSection(hash);
};

// Add click handlers to all nav links (including Home, Expeditions, Book)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1); // Remove #
            showSection(sectionId);
            window.history.pushState(null, '', href);
        }
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', checkHash);

// Logo click - go to landing page
const logoLink = document.querySelector('.logo a');
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
        window.history.pushState(null, '', '#home');
    });
}

// Handle hero button click
const heroButton = document.querySelector('.btn-primary');
if (heroButton) {
    heroButton.addEventListener('click', (e) => {
        const href = heroButton.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1);
            showSection(sectionId);
            window.history.pushState(null, '', href);
        }
    });
}

// Handle all internal anchor links (like #catalog)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Skip if it's already handled by navLinks or has no href
        if (!href || href === '#' || link.closest('.nav-menu')) {
            return;
        }
        
        // Skip mailto and external links
        if (href.includes('mailto:') || href.includes('http')) {
            return;
        }
        
        const sectionId = href.substring(1);
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            e.preventDefault();
            showSection(sectionId);
            window.history.pushState(null, '', href);
        }
    });
});

// Initialize on load
checkHash();