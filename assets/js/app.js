;((window) => {
  'use strict';

  class App {
    constructor() {
      this.imagePreloader();
      this.setActiveSlide();
      this.asignNavView();
      this.windowResize();
      this.toggleMobileNav();
      this.mobileToggleSlides();
    }

    imagePreloader() {
      const images = document.querySelectorAll('img');
      const imagesMask = document.getElementsByClassName('image-mask');
      
      window.addEventListener('load', () => {
        for (let i = 0; i < images.length; i++) {
          if (images[i].complete && images[i].naturalHeight !== 0) {
            imagesMask[i].style.display = 'none';
            imagesMask[i].style.visibility = 'hidden';
          }
        }
      });
    }

    setActiveSlide() {
      document.getElementById('slide-1').classList.add('active');
      const links = document.getElementsByClassName('sidebar-nav-link');
      const slides = document.getElementsByClassName('slide');

      for (let link of links) {
        link.addEventListener('click', e => {
          e.preventDefault();
          const anker = e.target.href.match(/(slide-[\d+])/)[0];

          for (let link of links) {
            link.classList.contains('active') && link.classList.remove('active');
          }

          !e.target.classList.contains('active') && e.target.classList.add('active');
          
          for (let slide of slides) {
            slide.classList.remove('active');
            slide.getAttribute('id') === anker && slide.classList.add('active');
          }
        });
      }
    }

    asignNavView() {
      const headerNav = document.getElementById('header-nav');
      document.documentElement.clientWidth <= 950 && headerNav.classList.add('nav-mobile-view');
    }

    toggleNavView() {
      const headerNav = document.getElementById('header-nav');
      const dimension = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };

      if (dimension.width <= 950) {
        headerNav.classList.add('nav-mobile-view');
      }
      
      if (dimension.width > 950) {
        headerNav.classList.remove('nav-mobile-view');
        headerNav.style.display = null;
        headerNav.style.visibility = null;
      }
    }

    toggleMobileNav() {
      const toggleMobileNavButton = document.getElementById('toggle-mobile-nav');
      const mobileNavCloseButton = document.getElementById('mobile-nav-close');
      
      toggleMobileNavButton.addEventListener('click', () => {
        const mobileNav = document.getElementsByClassName('nav-mobile-view')[0];
        
        if (mobileNav.offsetParent === null) {
          mobileNav.style.display = 'block';
          mobileNav.style.visibility = 'visible';
        } else {
          mobileNav.style.display = 'none';
          mobileNav.style.visibility = 'hidden';
        }
      });

      mobileNavCloseButton.addEventListener('click', (e) => {
        e.preventDefault();

        const mobileNav = document.getElementsByClassName('nav-mobile-view')[0];
        mobileNav.style.display = 'none';
        mobileNav.style.visibility = 'hidden';
      });
    }

    windowResize() {
      window.addEventListener('resize', this.toggleNavView);
      return () => window.removeEventListener('resize', () => {
        this.toggleNavView();
        this.toggleMobileNav();
      });
    }

    mobileToggleSlides() {
      const slides = document.getElementsByClassName('slide');
      const next = document.getElementById('next');
      const prev = document.getElementById('prev');
      
      next.addEventListener('click', () => {
        for (let slide of slides) {
          slide.classList.remove('active');
        }

        document.getElementById(`slide-${Number(next.getAttribute('data-slide'))}`).classList.add('active');
        
        if (Number(next.getAttribute('data-slide')) !== slides.length) {
          next.setAttribute('data-slide', (Number(next.getAttribute('data-slide')) + 1));
          prev.setAttribute('data-slide', (Number(prev.getAttribute('data-slide')) + 1));
        }
      });

      prev.addEventListener('click', () => {
        for (let slide of slides) {
          slide.classList.remove('active');
        }

        document.getElementById(`slide-${Number(prev.getAttribute('data-slide'))}`).classList.add('active');
        
        if (Number(prev.getAttribute('data-slide')) !== 1) {
          prev.setAttribute('data-slide', (Number(prev.getAttribute('data-slide')) - 1));
          next.setAttribute('data-slide', (Number(next.getAttribute('data-slide')) - 1));
        }
      });
    }
  };

  new App();
})(window);