// menu animation
const headerAnimation = {
  elements: {
    header: document.querySelector("header"),
    links: document.querySelectorAll("header div nav .nav-links"),
    buttonHeader: document.querySelector("header div .button"),
    navHamburger: document.querySelectorAll("header #menu #menuMobile span"),
    buttonScrollTop: document.querySelector(".goTop"),
  },

  observableScroll: () => {
    const { scrollY } = window;

    const { elements } = headerAnimation;

    if (scrollY > 50) {
      elements.header.classList.add("header--scrolled");
      elements.buttonHeader.classList.add("header__button--scrolled");

      elements.navHamburger.forEach((link) => {
        link.classList.add("header__bar--scrolled");
      });
      elements.links.forEach((link) => {
        link.classList.add("header__link--scrolled");
      });
    } else {
      elements.header.classList.remove("header--scrolled");
      elements.buttonHeader.classList.remove("header__button--scrolled");

      elements.navHamburger.forEach((link) => {
        link.classList.remove("header__bar--scrolled");
      });
      elements.links.forEach((link) => {
        link.classList.remove("header__link--scrolled");
      });
    }

    if (scrollY > 200) {
      elements.buttonScrollTop.classList.add("goTop--scrolled");
    } else {
      elements.buttonScrollTop.classList.remove("goTop--scrolled");
    }
  },

  start: () => {
    headerAnimation.observableScroll();
    window.document.addEventListener("scroll", (e) => {
      headerAnimation.observableScroll();
    });
  },
};

// animation de click
const scrollSmooth = {
  elements: {
    links: document.querySelectorAll("header div nav .nav-links"),
    footerLinks: document.querySelectorAll(".footer_links"),
    buttonAnchor: document.querySelector("button.goTop"),
    buttonGoToPlans: document.querySelector("#goPlans"),
  },

  scrollTo: (element) => {
    const { offsetTop } = document.querySelector(element.getAttribute("href"));

    window.scrollTo({
      top: offsetTop - 80,
      behavior: "smooth",
    });
  },

  handleGotoPlans: () => {
    const { elements } = scrollSmooth;

    elements.buttonGoToPlans.addEventListener("click", () => {
      window.scrollTo({
        top: 720,
        behavior: "smooth",
      });
    });
  },

  clickToTop: () => {
    const { elements } = scrollSmooth;

    elements.buttonAnchor.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  },

  start: () => {
    const { elements, scrollTo, handleGotoPlans, clickToTop } = scrollSmooth;

    clickToTop();
    handleGotoPlans();

    elements.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTo(e.target);
      });
    });

    elements.footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        scrollTo(e.target);
      });
    });
  },
};

// destaca a sessão no menu
const obervableScrollMenu = {
  elements: {
    links: document.querySelectorAll("header div nav .nav-links"),
    sections: document.querySelectorAll(".section"),
  },

  observableScroll: () => {
    const { elements } = obervableScrollMenu;

    elements.links.forEach((link) => {
      const { scrollY } = window;
      const section = document.querySelector(link.getAttribute("href"));

      if (section) {
        const { offsetTop } = section;
        if (scrollY >= offsetTop - 80) {
          elements.links.forEach((link) => {
            link.classList.remove("header__link--active");
          });
          link.classList.add("header__link--active");
        }
      }
    });
  },

  start: () => {
    obervableScrollMenu.observableScroll();
    window.document.addEventListener("scroll", (e) => {
      obervableScrollMenu.observableScroll();
    });
  },
};

// pega o pregresso do scroll
const headerProgressBar = {
  elements: {
    progressBar: document.querySelector("header div.header__progress-bar"),
  },

  onScroll: () => {
    const { elements } = headerProgressBar;

    const { innerHeight, scrollY } = window;

    const { offsetHeight } = document.documentElement;

    const progress = (scrollY / (offsetHeight - innerHeight)) * 100;

    if (progress > 100) {
      elements.progressBar.style.width = "100%";
    } else {
      elements.progressBar.style.width = `${progress}%`;
    }
  },

  start: () => {
    headerProgressBar.onScroll();
    window.addEventListener("scroll", () => {
      headerProgressBar.onScroll();
    });
  },
};

const handleOverMouseInPlans = {
  elements: {
    plansContainer: document.querySelector(".content-plans"),
  },

  onMouseOver: () => {
    const { elements } = handleOverMouseInPlans;

    elements.plansContainer.addEventListener("mouseover", (e) => {
      const { screenX } = e;

      const widthContainer = elements.plansContainer.clientWidth;

      const widthContainerHalf = widthContainer / 2;

      if (screenX > widthContainerHalf) {
        elements.plansContainer.scrollTo({
          left: widthContainer,
          behavior: "smooth",
        });
      } else {
        elements.plansContainer.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
    });
  },

  start: () => {
    handleOverMouseInPlans.onMouseOver();
  },
};

const menuHamburger = {
  elements: {
    menuMobile: document.getElementById("menuMobile"),
    nav: document.querySelector("#nav"),
  },

  clickMenuMobile: () => {
    const { elements } = menuHamburger;

    elements.menuMobile.addEventListener("click", () => {
      menuMobile.classList.toggle("active");
      nav.classList.toggle("active");
    });

    document.querySelectorAll("nav a").forEach((n) =>
      n.addEventListener("click", () => {
        menuMobile.classList.remove("active");
        nav.classList.remove("active");
      })
    );
  },

  start: () => {
    menuHamburger.clickMenuMobile();
  },
};

window.addEventListener("load", () => {
  headerAnimation.start();
  scrollSmooth.start();
  obervableScrollMenu.start();
  headerProgressBar.start();
  menuHamburger.start();
});

// carousel plans

$(document).ready(function () {
  $(".loop").owlCarousel({
    items: 5,
    autoWidth: true,
    margin: 25,
  });
});

// carousel brands

var owl = $(".autoplaybrands");
owl.owlCarousel({
  center: true,
  items: 20,
  loop: true,
  margin: 20,
  autoWidth: true,
  autoplay: true,
  autoplayTimeout: 1800,
  autoplayHoverPause: true,
});
