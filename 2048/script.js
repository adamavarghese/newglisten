const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('[data-nav]');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('[data-reveal]');
const yearEl = document.getElementById('year');
const galleryImages = Array.from(document.querySelectorAll('.hero-gallery-image'));
const galleryDots = Array.from(document.querySelectorAll('.hero-gallery-dot'));

galleryImages.forEach((image) => {
  const setOrientationClass = () => {
    image.classList.toggle('is-portrait', image.naturalHeight > image.naturalWidth);
  };

  if (image.complete) {
    setOrientationClass();
  } else {
    image.addEventListener('load', setOrientationClass, { once: true });
  }
});

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('open', !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (galleryImages.length > 1) {
  let galleryIndex = 0;

  const setGallerySlide = (index) => {
    galleryImages.forEach((image, i) => {
      image.classList.toggle('is-active', i === index);
    });
    galleryDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  };

  setInterval(() => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    setGallerySlide(galleryIndex);
  }, 2800);
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -8% 0px',
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('active', href === `#${activeId}`);
      });
    });
  },
  {
    threshold: 0.55,
  }
);

sections.forEach((section) => sectionObserver.observe(section));
