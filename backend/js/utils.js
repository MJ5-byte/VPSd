/**
 * Utility functions for the VPSD Waitlist page
 */

/**
 * Select an element from the DOM
 * @param {string} selector - CSS selector
 * @returns {HTMLElement} - The selected element
 */
function select(selector) {
  return document.querySelector(selector);
}

/**
 * Select multiple elements from the DOM
 * @param {string} selector - CSS selector
 * @returns {NodeList} - The list of selected elements
 */
function selectAll(selector) {
  return document.querySelectorAll(selector);
}

/**
 * Add an event listener to an element
 * @param {HTMLElement} element - The element to add the event listener to
 * @param {string} event - The event to listen for
 * @param {Function} callback - The function to call when the event occurs
 */
function on(element, event, callback) {
  if (element) {
    element.addEventListener(event, callback);
  }
}

/**
 * Add a class to an element
 * @param {HTMLElement} element - The element to add the class to
 * @param {string} className - The class to add
 */
function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove a class from an element
 * @param {HTMLElement} element - The element to remove the class from
 * @param {string} className - The class to remove
 */
function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

/**
 * Toggle a class on an element
 * @param {HTMLElement} element - The element to toggle the class on
 * @param {string} className - The class to toggle
 */
function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

/**
 * Check if an element has a class
 * @param {HTMLElement} element - The element to check
 * @param {string} className - The class to check for
 * @returns {boolean} - Whether the element has the class
 */
function hasClass(element, className) {
  if (element) {
    return element.classList.contains(className);
  }
  return false;
}

/**
 * Scroll to an element smoothly
 * @param {HTMLElement} element - The element to scroll to
 */
function scrollTo(element) {
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Check if an email address is valid
 * @param {string} email - The email address to check
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if a phone number is valid
 * @param {string} phone - The phone number to check
 * @returns {boolean} - Whether the phone number is valid
 */
function isValidPhone(phone) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Show an error message for a form field
 * @param {string} fieldId - The ID of the field
 * @param {string} message - The error message to show
 */
function showError(fieldId, message) {
  const field = select(`#${fieldId}`);
  const errorElement = select(`#${fieldId}-error`);
  
  if (field && errorElement) {
    addClass(field, 'error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

/**
 * Clear an error message for a form field
 * @param {string} fieldId - The ID of the field
 */
function clearError(fieldId) {
  const field = select(`#${fieldId}`);
  const errorElement = select(`#${fieldId}-error`);
  
  if (field && errorElement) {
    removeClass(field, 'error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

/**
 * Debounce a function to prevent it from being called too frequently
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, delay) {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}