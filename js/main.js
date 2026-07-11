document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');

  // Check local storage or default to cozy
  const currentTheme = localStorage.getItem('theme') || 'cozy';
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');
    let nextTheme = 'dark';
    
    if (theme === 'dark') {
      nextTheme = 'light';
    } else if (theme === 'light') {
      nextTheme = 'cozy';
    } else {
      nextTheme = 'dark';
    }
    
    body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun'; // Next is light, show sun
    } else if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-mug-hot'; // Next is cozy, show coffee
    } else {
      themeIcon.className = 'fa-solid fa-moon'; // Next is dark, show moon
    }
  }

  // Scroll Animations with Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Counter animation for stats if it's the about section
        if (entry.target.classList.contains('about-stats') && !entry.target.dataset.counted) {
          animateCounters();
          entry.target.dataset.counted = true;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
  
  // Observe stats section specifically
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Stats Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter-val');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const inc = target / speed;
      let count = 0;
      
      const updateCount = () => {
        count += inc;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }

  // Modal and Gallery interactions for Case Studies
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = document.querySelector('.close-modal');
  
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  const galleryIndicators = document.getElementById('galleryIndicators');

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  const updateGalleryUI = () => {
    if (currentGalleryImages.length > 0) {
      modalImage.src = currentGalleryImages[currentImageIndex];
      
      // Update indicators
      galleryIndicators.innerHTML = '';
      if (currentGalleryImages.length > 1) {
        galleryPrev.style.display = 'flex';
        galleryNext.style.display = 'flex';
        
        currentGalleryImages.forEach((_, idx) => {
          const dot = document.createElement('span');
          dot.classList.add('gallery-indicator');
          if (idx === currentImageIndex) dot.classList.add('active');
          
          dot.addEventListener('click', () => {
            currentImageIndex = idx;
            updateGalleryUI();
          });
          
          galleryIndicators.appendChild(dot);
        });
      } else {
        // Hide controls if only 1 image
        galleryPrev.style.display = 'none';
        galleryNext.style.display = 'none';
      }
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const imagesAttr = card.getAttribute('data-images');
      const desc = card.getAttribute('data-desc');

      if (title) modalTitle.innerText = title;
      if (desc) modalDesc.innerText = desc;
      
      if (imagesAttr) {
        currentGalleryImages = imagesAttr.split(',').map(img => img.trim());
        currentImageIndex = 0;
        updateGalleryUI();
      }

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  galleryPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentGalleryImages.length - 1;
    updateGalleryUI();
  });

  galleryNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex < currentGalleryImages.length - 1) ? currentImageIndex + 1 : 0;
    updateGalleryUI();
  });

  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  closeModalBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

});
