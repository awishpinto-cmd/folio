/* ==========================================================================
   1. DARK MODE TOGGLE LOGIC
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for user's previous preference in local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  htmlElement.classList.add('dark');
  themeToggleBtn.innerHTML = '<span>☀️</span>'; // Switch button to sun icon
}

// Listen for explicit click interactions
themeToggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  
  // Track state and swap UI indicators safely
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.innerHTML = '<span>☀️</span>';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleBtn.innerHTML = '<span>🌙</span>';
  }
});

/* ==========================================================================
   2. BACK TO TOP BUTTON LOGIC
   ========================================================================== */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  // If user scrolls past 300px, reveal the utility button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Smoothly glide back to index absolute peak on click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ==========================================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
// Target key components that should slide up on approach
const sectionsToReveal = document.querySelectorAll('.project-card, .skills-container, .hero-content');

// Assign the CSS target baseline selector class ahead of time
sectionsToReveal.forEach(section => {
  section.classList.add('reveal');
});

const revealOptions = {
  root: null,       // Use the browser viewport as default context container
  threshold: 0.15,  // Trigger action when 15% of the element is visible
  rootMargin: "0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve once animation condition is locked in
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Bind observer instance to elements loop array
sectionsToReveal.forEach(section => {
  revealObserver.observe(section);
});