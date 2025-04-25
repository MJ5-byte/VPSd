/**
 * Main JavaScript for the VPSD Waitlist page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  // Add event listeners for buttons to scroll to waitlist section
  const waitlistButtons = selectAll('.btn-primary');
  waitlistButtons.forEach(button => {
    if (!button.closest('form')) {
      on(button, 'click', (e) => {
        e.preventDefault();
        const waitlistSection = select('#waitlist-section');
        if (waitlistSection) {
          scrollTo(waitlistSection);
        }
      });
    }
  });
  
  // Set active nav item based on scroll position
  initScrollSpy();
  
  // Add animation to page elements
  animateOnScroll();
  
  // Initialize header animation on scroll
  initHeaderAnimation();
  
  console.log('VPSD Waitlist application initialized');
}

/**
 * Initialize scroll spy to highlight active navigation items
 */
function initScrollSpy() {
  const navLinks = selectAll('.nav-desktop a, .nav-mobile a');
  
  window.addEventListener('scroll', debounce(() => {
    const scrollPosition = window.scrollY + 100;
    
    // Make all nav links inactive
    navLinks.forEach(link => {
      removeClass(link, 'active');
    });
    
    // Make the first link active by default (waitlist)
    if (navLinks.length > 0) {
      addClass(navLinks[0], 'active');
    }
  }, 100));
}

/**
 * Animate elements as they come into view
 */
function animateOnScroll() {
  const animateElements = [
    '.feature-card',
    '.waitlist-header',
    '.waitlist-form',
    '.payment-methods'
  ];
  
  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addClass(entry.target, 'fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all animate elements
  animateElements.forEach(selector => {
    const elements = selectAll(selector);
    elements.forEach(element => {
      observer.observe(element);
    });
  });
}

/**
 * Initialize header animation on scroll
 */
function initHeaderAnimation() {
  const header = select('.header');
  
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.height = '70px';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.height = '80px';
      header.style.boxShadow = 'none';
    }
  });
}

/**
 * Add animation to form fields on focus
 */
function initFormFieldAnimations() {
  const formFields = selectAll('.form-group input');
  
  formFields.forEach(field => {
    on(field, 'focus', () => {
      const formGroup = field.closest('.form-group');
      addClass(formGroup, 'focused');
    });
    
    on(field, 'blur', () => {
      const formGroup = field.closest('.form-group');
      removeClass(formGroup, 'focused');
    });
  });
}

// Initialize form field animations
document.addEventListener('DOMContentLoaded', initFormFieldAnimations);