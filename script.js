document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const body = document.body;

  // Funzione per aprire/chiudere il menu
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Cambia l'icona del menu
    menuToggle.textContent = isExpanded ? '☰' : '✕';
  }

  // Aggiungi l'event listener al pulsante del menu
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', toggleMenu);
    
    // Chiudi il menu quando si clicca su un link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Solo su mobile
          toggleMenu();
        }
      });
    });
  }

  // Chiudi il menu quando la finestra viene ridimensionata oltre la soglia mobile
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        // Su desktop, assicurati che il menu sia visibile
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
        menuToggle.textContent = '☰';
      }
    }, 250);
  });
});
