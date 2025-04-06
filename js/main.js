// Main JavaScript file for Vedic Living website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sliders
    initSliders();
    
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Form validation
    initFormValidation();
  });
  
  // Function to initialize sliders
  function initSliders() {
    // Main slider animation
    const sliderTrack = document.querySelector('.slider-track');
    const galleryTrack = document.querySelector('.gallery-track');
    const tickerContent = document.querySelector('.ticker-content');
    
    if (sliderTrack) {
      animateSlider(sliderTrack, -2000, 30000); // Parameters: element, distance, duration
    }
    
    if (galleryTrack) {
      animateSlider(galleryTrack, -2000, 35000);
    }
    
    if (tickerContent) {
      animateSlider(tickerContent, -2000, 20000, true); // Last parameter: loop immediately
    }
  }
  
  // Function to animate slider
  function animateSlider(element, distance, duration, immediate = false) {
    let startPosition = 0;
    let currentPosition = 0;
    
    function slide() {
      currentPosition = startPosition + distance;
      
      element.style.transition = `transform ${duration}ms linear`;
      element.style.transform = `translateX(${currentPosition}px)`;
      
      // Reset position after animation completes
      setTimeout(() => {
        element.style.transition = 'none';
        element.style.transform = `translateX(${startPosition}px)`;
        
        // Continue animation
        setTimeout(() => {
          slide();
        }, immediate ? 0 : 100);
      }, duration);
    }
    
    slide();
  }
  
  // Function to initialize smooth scrolling
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#') && href !== '#') {
          e.preventDefault();
          
          const targetSection = document.querySelector(href);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  // Function to initialize form validation
  function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (!nameField.value.trim()) {
          highlightError(nameField);
          isValid = false;
        } else {
          removeError(nameField);
        }
        
        if (!emailField.value.trim() || !isValidEmail(emailField.value)) {
          highlightError(emailField);
          isValid = false;
        } else {
          removeError(emailField);
        }
        
        if (!messageField.value.trim()) {
          highlightError(messageField);
          isValid = false;
        } else {
          removeError(messageField);
        }
        
        if (isValid) {
          // Simulate form submission
          const submitButton = document.querySelector('.submit-button');
          submitButton.textContent = 'Sending...';
          submitButton.disabled = true;
          
          setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
          }, 1500);
        }
      });
    }
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to highlight form errors
  function highlightError(field) {
    field.style.borderColor = '#cd1818';
    field.style.backgroundColor = 'rgba(205, 24, 24, 0.1)';
  }
  
  // Helper function to remove error highlighting
  function removeError(field) {
    field.style.borderColor = '';
    field.style.backgroundColor = '';
  }
  