let navbar = document.querySelector("#navbar");
let navlist = document.querySelector("#navList");
let navLinkList = document.querySelectorAll(".nav-link");
let menuBtn = document.querySelector("#menuBtn");
let menuBtnIcon = document.querySelector("#menuBtnIcon");

menuBtn.onclick = toggleMenu;
navlist.onclick = toggleMenu;

function toggleMenu(e) {
  if (window.innerWidth <= 600) {
    navlist.classList.toggle("nav-list-onclick");
    menuBtnIcon.classList.toggle("fa-bars");
    menuBtnIcon.classList.toggle("fa-times");
    e.currentTarget.blur();
    animateNavList();
  }
}

function animateNavList() {
  let time = 150;
  navLinkList.forEach((navLink, i) => {
    setTimeout(() => {
      if ([...navLink.classList].includes("nav-link-opacity-on")) {
        navLink.classList.add("nav-link-opacity-off");
        navLink.classList.remove("nav-link-opacity-on");
      } else {
        navLink.classList.remove("nav-link-opacity-off");
        navLink.classList.add("nav-link-opacity-on");
      }
    }, time * (i + 1));
  });
}

// set observer on welcome-section for when to show menu on desktop

let options = {
  root: null,
  rootMargin: "200px",
  threshold: "1.0",
};

let callback = (entries) => {
  if (entries[0].isIntersecting === true) {
    navbar.classList.remove("navbar-after-scroll");
    navlist.classList.remove("nav-list-after-scroll");
  } else {
    navbar.classList.add("navbar-after-scroll");
    navlist.classList.add("nav-list-after-scroll");
  }
};

let observer = new IntersectionObserver(callback, options);

let target = document.querySelector("#welcome-section");
observer.observe(target);


