const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#nav-list');
const links = document.querySelectorAll('a[href^="#"]');
const form = document.querySelector('#contact-form');

// Mobile navigation toggle
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// Smooth scrolling for anchor links
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
      navList?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Basic form validation
if (form) {
  const fields = ['name', 'email', 'message'];

  const showError = (field, message) => {
    const errorElement = field.parentElement.querySelector('.error');
    if (errorElement) errorElement.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    fields.forEach((name) => {
      const field = form.elements[name];
      if (!field) return;

      if (!field.value.trim()) {
        isValid = false;
        showError(field, 'Este campo es obligatorio.');
      }
    });

    const emailField = form.elements.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && emailField.value && !emailPattern.test(emailField.value)) {
      isValid = false;
      showError(emailField, 'Ingresa un correo válido.');
    }

    if (isValid) {
      form.reset();
      alert('¡Gracias! Revisaremos tu mensaje y te contactaremos pronto.');
    }
  });
}
