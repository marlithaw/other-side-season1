const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

const accordionTriggers = document.querySelectorAll('.accordion-trigger');
accordionTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    accordionTriggers.forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
      if (otherPanel) {
        otherPanel.hidden = true;
      }
    });
    trigger.setAttribute('aria-expanded', String(!expanded));
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel) {
      panel.hidden = expanded;
    }
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const requiredFields = contactForm.querySelectorAll('[data-required]');
  const formStatus = document.querySelector('[data-form-status]');

  const showError = (field, message) => {
    const errorId = field.getAttribute('aria-describedby');
    const error = document.getElementById(errorId);
    if (error) {
      error.textContent = message;
    }
    field.setAttribute('aria-invalid', 'true');
  };

  const clearError = (field) => {
    const errorId = field.getAttribute('aria-describedby');
    const error = document.getElementById(errorId);
    if (error) {
      error.textContent = '';
    }
    field.removeAttribute('aria-invalid');
  };

  contactForm.addEventListener('submit', (event) => {
    let hasError = false;
    if (formStatus) {
      formStatus.textContent = '';
    }

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        showError(field, 'This field is required.');
        hasError = true;
      } else {
        clearError(field);
      }
    });

    if (hasError) {
      event.preventDefault();
      if (formStatus) {
        formStatus.textContent = 'Please review the highlighted fields.';
      }
    }
  });
}
