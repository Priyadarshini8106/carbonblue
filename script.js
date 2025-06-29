// Smooth scroll to target section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Element groups to animate
const animatedElements = document.querySelectorAll('.animate');
const animatedBlocks = document.querySelectorAll('.animate-on-scroll');
const animatedTexts = document.querySelectorAll('.animate-text');
const animatedImages = document.querySelectorAll('.animate-image');
const fadeElements = document.querySelectorAll('.fade-on-scroll');
const zoomCards = document.querySelectorAll('.zoom-on-load');
const bounceHeadings = document.querySelectorAll('.bounce-on-scroll');
const whySchoolsSection = document.querySelector('.why-schools-section');

// Reveal elements on scroll
function revealOnScroll() {
  const windowHeight = window.innerHeight;

  // Animate general elements
  animatedElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const isVisible = top < windowHeight - 100;

    if (el === whySchoolsSection?.querySelector('.container')) {
      const cards = el.querySelectorAll('.card');
      cards.forEach(card =>
        card.classList.toggle('visible-slide-in', isVisible)
      );
    } else {
      el.classList.toggle('visible', isVisible);
    }
  });

  // Animate fade-in elements
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100 && !el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  });

  // Zoom cards (once)
  zoomCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < windowHeight - 100 && !card.classList.contains('triggered')) {
      card.classList.add('triggered');
    }
  });

  // Animate blocks
  animatedBlocks.forEach(block => {
    const top = block.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      block.classList.add('visible');
    }
  });

  // Zoom text
  animatedTexts.forEach(text => {
    const top = text.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      text.classList.add('zoomed');
    }
  });

  // Animate gradient images
  animatedImages.forEach(img => {
    const top = img.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      img.classList.add('fade-gradient');
    }
  });

  // Animate bounce headings once
  bounceHeadings.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100 && !el.classList.contains('bounced')) {
      el.classList.add('bounced');
    }
  });
}

//
// ----- SLIDER LOGIC -----
//
let currentIndex = 0;
const track = document.getElementById('slider-track');
const slides = document.querySelectorAll('.slide-image');
const dotsContainer = document.getElementById('slider-dots');
let slideTimer;

function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
}

function goToSlide(index) {
  currentIndex = index;
  const slideWidth = slides[0]?.clientWidth || 0;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  updateDots(index);
  resetSlideInterval();
}

function moveSlide(step) {
  currentIndex = (currentIndex + step + slides.length) % slides.length;
  goToSlide(currentIndex);
}

function startSlideInterval() {
  slideTimer = setInterval(() => moveSlide(1), 5000);
}

function resetSlideInterval() {
  clearInterval(slideTimer);
  startSlideInterval();
}

//
// ----- INITIALIZATION ON LOAD -----
//
window.addEventListener('load', () => {
  revealOnScroll();

  if (dotsContainer && slides.length > 0) {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    goToSlide(0);
    startSlideInterval();
  }
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', () => goToSlide(currentIndex));

// Reveal functions
function revealCambridgeCentre() {
  const section = document.getElementById('cambridge-centre-section');
  if (section) {
    section.style.display = 'block';
    scrollToSection('cambridge-centre-section');
  }
}

function revealExamCards() {
  const section = document.getElementById('exam-cards-section');
  if (section) {
    section.style.display = 'block';
    scrollToSection('exam-cards-section');
  }
}

function revealDirector() {
  const section = document.getElementById('profile-section');
  if (section) {
    section.style.display = 'block';
    scrollToSection('profile-section');
  }
}

