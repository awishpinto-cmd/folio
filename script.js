/* ==========================================================================
   1. DARK MODE TOGGLE LOGIC
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  htmlElement.classList.add('dark');
  themeToggleBtn.innerHTML = '<span>☀️</span>';
}

themeToggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
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
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==========================================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER) MANAGEMENT
   ========================================================================== */
const revealOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: "0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

// Function to attach animations dynamically to elements
function applyScrollReveal() {
  const elements = document.querySelectorAll('.project-card, .skills-container, .hero-content');
  elements.forEach(element => {
    if (!element.classList.contains('reveal')) {
      element.classList.add('reveal');
      revealObserver.observe(element);
    }
  });
}

// Initial sweep for layout components
document.addEventListener("DOMContentLoaded", applyScrollReveal);


/* ==========================================================================
   4. DYNAMIC PORTFOLIO AUTO-UPDATER PIPELINE (NEW)
   ========================================================================== */
async function loadAutomatedProjects() {
  // Target your dynamic projects wrapper container (make sure your HTML wrapper grid has id="projects-grid")
  const projectGrid = document.getElementById("projects-grid");
  if (!projectGrid) return;

  const jsonUrl = "https://raw.githubusercontent.com/awishpinto-cmd/pulse-summary-bot/main/projects.json";

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error("Network response failed");
    
    const projects = await response.json();
    projectGrid.innerHTML = ""; // Clear old static cards

    // Build fresh cards directly from your backend's repository metadata JSON 
    projects.slice(0, 6).forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card"; // Keeps your CSS grid styles completely intact
      
      card.innerHTML = `
        <div style="padding: 24px; border: 1px solid #eaeaea; border-radius: 12px; background: var(--card-bg, #fff); margin-bottom: 16px; text-align: left; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 0.75em; color: #ff6600; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${project.language}</span>
            <h3 style="margin: 8px 0; font-size: 1.35em; color: var(--text-color, #111);">${project.name}</h3>
            <p style="color: var(--text-muted, #666); font-size: 0.9em; line-height: 1.5; margin-bottom: 16px;">${project.description}</p>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 12px; border-top: 1px solid #f5f5f5;">
            <span style="font-size: 0.85em; color: var(--text-muted, #444);">⭐ ${project.stars} Stars</span>
            <a href="${project.url}" target="_blank" style="color: #0066cc; text-decoration: none; font-weight: 600; font-size: 0.9em;">View Source Code →</a>
          </div>
        </div>
      `;
      
      projectGrid.appendChild(card);
    });

    // Re-trigger the scroll animation sweep so the new cards slide up beautifully
    applyScrollReveal();

  } catch (error) {
    console.error("Dynamic update pipeline offline:", error);
  }
}

// Fire the network fetch as soon as the baseline document initializes
document.addEventListener("DOMContentLoaded", loadAutomatedProjects);