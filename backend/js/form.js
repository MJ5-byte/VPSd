document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#waitlist-form');
  const submitButton = document.querySelector('#submit-button');

  if (!form || !submitButton) return;

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!validateForm()) {
      return;
    }

    // Show loading state
    submitButton.classList.add('loading');

    // Get form data
    const formData = new FormData(form);

    try {
      // Send data to the backend
      const response = await fetch('/api/join', {
        method: 'POST',
        body: formData, // Send FormData directly
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        showSuccessMessage();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error message
      showErrorMessage();
    } finally {
      // Hide loading state
      submitButton.classList.remove('loading');
    }
  });
});

/**
 * Validate form inputs
 * @returns {boolean} - Whether the form is valid
 */
function validateForm() {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  let isValid = true;

  // Validate name
  if (!nameInput.value.trim()) {
    showError('name', 'Please enter your full name');
    isValid = false;
  } else {
    clearError('name');
  }

  // Validate email
  if (!isValidEmail(emailInput.value.trim())) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  } else {
    clearError('email');
  }

  // Validate phone
  if (!isValidPhone(phoneInput.value.trim())) {
    showError('phone', 'Please enter a valid phone number');
    isValid = false;
  } else {
    clearError('phone');
  }

  return isValid;
}

/**
 * Show a success message
 */
function showSuccessMessage() {
  const successMessage = document.querySelector('.form-success');
  const formContent = document.querySelector('.form-content');
  successMessage.classList.add('active');
  formContent.style.display = 'none';
}

/**
 * Show an error message
 */
function showErrorMessage() {
  const errorMessage = document.querySelector('.form-error');
  errorMessage.classList.add('active');
}

/**
 * Show an error for a specific field
 * @param {string} fieldId - The ID of the field
 * @param {string} message - The error message
 */
function showError(fieldId, message) {
  const field = document.querySelector(`#${fieldId}`);
  const errorElement = document.querySelector(`#${fieldId}-error`);
  if (field && errorElement) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

/**
 * Clear an error for a specific field
 * @param {string} fieldId - The ID of the field
 */
function clearError(fieldId) {
  const field = document.querySelector(`#${fieldId}`);
  const errorElement = document.querySelector(`#${fieldId}-error`);
  if (field && errorElement) {
    field.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
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