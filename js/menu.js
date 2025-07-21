document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  
  if (menuToggle && nav) {
    // Imposta lo stato iniziale
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Su desktop, mostra sempre la navigazione
    if (window.innerWidth > 768) {
      nav.style.display = 'flex';
    } else {
      nav.style.display = 'none';
    }
    
    // Gestione click sul pulsante del menu
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        nav.style.display = 'flex';
        setTimeout(() => nav.classList.add('active'), 10);
      } else {
        nav.classList.remove('active');
        setTimeout(() => {
          if (!nav.classList.contains('active') && window.innerWidth <= 768) {
            nav.style.display = 'none';
          }
        }, 300);
      }
    });
    
    // Chiudi il menu cliccando fuori
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          setTimeout(() => {
            if (!nav.classList.contains('active') && window.innerWidth <= 768) {
              nav.style.display = 'none';
            }
          }, 300);
        }
      }
    });
    
    // Chiudi il menu quando si clicca su un link (solo su mobile)
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          setTimeout(() => {
            if (!nav.classList.contains('active')) {
              nav.style.display = 'none';
            }
          }, 300);
        }
      });
    });
    
    // Gestisci il ridimensionamento della finestra
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        // Su desktop, assicurati che la nav sia visibile
        nav.style.display = 'flex';
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        // Su mobile, nascondi la nav se non è attiva
        if (!nav.classList.contains('active')) {
          nav.style.display = 'none';
        }
      }
    });
  }
});
