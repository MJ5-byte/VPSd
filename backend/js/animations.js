/**
 * Animations for the VPSD Waitlist page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize staggered animations
  initStaggeredAnimations();
  
  // Initialize parallax effect
  initParallax();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize mobile menu
  initMobileMenu();
});

/**
 * Initialize staggered animations for elements
 */
function initStaggeredAnimations() {
  // Add the .stagger-item class to elements that need staggered animations
  const elementsToAnimate = [
    '.hero-title',
    '.hero-subtitle',
    '.hero .btn-primary',
    '.feature-card',
    '.waitlist-header h2',
    '.waitlist-header p',
    '.waitlist-form'
  ];
  
  elementsToAnimate.forEach((selector, index) => {
    const elements = selectAll(selector);
    elements.forEach(element => {
      addClass(element, 'stagger-item');
      // Set a data attribute for the delay
      element.setAttribute('data-delay', (index * 100).toString());
    });
  });
  
  // Create an intersection observer to trigger animations when elements are in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
        setTimeout(() => {
          addClass(entry.target, 'visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all stagger items
  const staggerItems = selectAll('.stagger-item');
  staggerItems.forEach(item => {
    observer.observe(item);
  });
}

/**
 * Initialize parallax effect for background elements
 */
function initParallax() {
  window.addEventListener('scroll', debounce(() => {
    const scrollY = window.scrollY;
    
    // Parallax for hero section
    const heroSection = select('.hero');
    if (heroSection) {
      const heroTranslateY = scrollY * 0.3;
      heroSection.style.backgroundPositionY = `${-heroTranslateY}px`;
    }
    
    // Parallax for feature cards
    const featureCards = selectAll('.feature-card');
    featureCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.top < window.innerHeight && cardRect.bottom > 0) {
        const translateY = (window.innerHeight - cardRect.top) * 0.05 * (index % 2 === 0 ? 1 : -1);
        card.style.transform = `translateY(${translateY}px)`;
      }
    });
  }, 10));
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const scrollLinks = selectAll('.scroll-to');
  
  scrollLinks.forEach(link => {
    on(link, 'click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = select(targetId);
      
      if (targetElement) {
        scrollTo(targetElement);
        
        // If mobile menu is open, close it
        const mobileNav = select('.nav-mobile');
        const menuToggle = select('.menu-toggle');
        
        if (hasClass(mobileNav, 'active')) {
          removeClass(mobileNav, 'active');
          removeClass(menuToggle, 'active');
        }
      }
    });
  });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = select('.menu-toggle');
  const mobileNav = select('.nav-mobile');
  
  on(menuToggle, 'click', () => {
    toggleClass(menuToggle, 'active');
    
    if (hasClass(menuToggle, 'active')) {
      // Open the menu with animation
      mobileNav.style.transform = 'translateY(0)';
      addClass(mobileNav, 'active');
    } else {
      // Close the menu with animation
      mobileNav.style.transform = 'translateY(-100%)';
      removeClass(mobileNav, 'active');
    }
  });
  
  // Close mobile menu when clicking on a link
  const mobileLinks = selectAll('.nav-mobile a');
  mobileLinks.forEach(link => {
    on(link, 'click', () => {
      removeClass(menuToggle, 'active');
      mobileNav.style.transform = 'translateY(-100%)';
      removeClass(mobileNav, 'active');
    });
  });
  
  // Close mobile menu when resizing to desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 768) {
      removeClass(menuToggle, 'active');
      mobileNav.style.transform = 'translateY(-100%)';
      removeClass(mobileNav, 'active');
    }
  }, 100));
}

/**
 * Add floating animation to elements
 */
function addFloatingAnimation() {
  const elementsToFloat = [
    '.hero .btn-primary',
    '.feature-icon'
  ];
  
  elementsToFloat.forEach(selector => {
    const elements = selectAll(selector);
    elements.forEach((element, index) => {
      addClass(element, 'floating');
      element.style.animationDelay = `${index * 0.2}s`;
    });
  });
}

// Call floating animation after DOM load
document.addEventListener('DOMContentLoaded', addFloatingAnimation);

/**
 * Header scroll effect - changes opacity and backdrop blur based on scroll position
 */
function initHeaderScrollEffect() {
  const header = select('.header');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const opacity = Math.min(0.9, 0.7 + (scrollY * 0.001));
    const blur = Math.min(20, 12 + (scrollY * 0.02));
    
    if (header) {
      header.style.background = `rgba(13, 13, 13, ${opacity})`;
      header.style.backdropFilter = `blur(${blur}px)`;
      header.style.webkitBackdropFilter = `blur(${blur}px)`;
      
      if (scrollY > 50) {
        addClass(header, 'scrolled');
      } else {
        removeClass(header, 'scrolled');
      }
    }
  });
}

// Initialize header scroll effect
document.addEventListener('DOMContentLoaded', initHeaderScrollEffect);