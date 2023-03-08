/**************************GLOBAL***************************/
const navEL = document.querySelector(".main-nav");
const menuNavEl = document.querySelector(".btn-mobile-nav");
const linksEl = document.querySelectorAll("a:link");
const btnSlidesEl = document.querySelectorAll(".btn-slide");
const slidesEl = document.querySelector(".slider-container");
const btnDotsEL = document.querySelector(".btn-dots");

let curIndex = 0,
  lastIndex = 0,
  timeout;

/**********************SET YEAR*****************************/
const curYear = new Date().getFullYear();
const curYearEl = document.querySelector(".year");

curYearEl.textContent = curYear;

/**********************MOBILE NAVIGATION********************/
menuNavEl.addEventListener("click", function () {
  const childrenEl = this.children;
  setNavAction(childrenEl, toggleClass.bind(this, navEL, "nav--open"));
});

//Click Event for smooth scroll
linksEl.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.attributes.getNamedItem("href");
    if (href.value == "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (
      href.value != "#" &&
      href.value.startsWith("#") &&
      link.classList.name != "btn-link"
    ) {
      document.querySelector(href.value).scrollIntoView({ behavior: "smooth" });
      setNavAction(
        menuNavEl.children,
        toggleClass.bind(this, navEL, "nav--open")
      );
    }
  });
});

function setNavAction(childrenEl, toggleClass) {
  for (i = 0; i < childrenEl.length; i++) {
    if (childrenEl[i].name == "menu-outline") {
      childrenEl[i].name = "close-outline";
    } else {
      childrenEl[i].name = "menu-outline";
    }
  }

  toggleClass();
}

function toggleClass(element, toggleClass) {
  element.classList.toggle(toggleClass);
}

/*********************STICKY ANIMATION****************************/
function intersectionCallback(entries) {
  entries.forEach(function (entry) {
    navHeaderEl = document.querySelector(".nav-header");
    if (!entry.isIntersecting) {
      navHeaderEl.classList.add("sticky");
    } else {
      navHeaderEl.classList.remove("sticky");
    }
  });
}

const options = {
  root: null,
  threshold: 0,
  rootMargin: "-113px",
};

const intersectObs = new IntersectionObserver(intersectionCallback, options);

intersectObs.observe(document.querySelector(".hero-section"));

/**********************TESTIMONIAL CAROUSEL***************************/

//Button Next/Prev slide click event
btnSlidesEl.forEach(function (btnSlides) {
  btnSlides.addEventListener("click", function () {
    const self = this;
    const activeSlide = slidesEl.querySelector(".active-slide");
    curIndex = [...slidesEl.children].indexOf(activeSlide);
    lastIndex = slidesEl.children.length - 1;

    let nextIndex = 0;

    //Check if the trigger is the next button
    if (self.className.match("btn-slide--next")) {
      nextIndex = curIndex !== 0 ? curIndex - 1 : lastIndex;
    }
    //otherwise check if the trigger is the prev button
    else if (self.className.match("btn-slide--prev")) {
      nextIndex = curIndex !== lastIndex ? curIndex + 1 : 0;
    }

    setNextPrevSlide(curIndex, nextIndex);
    resetTimeout();
  });
});

//Dot button click event
btnDotsEL.addEventListener("click", function (e) {
  if (e.target.classList.value === "btn-dot") {
    const curDot = btnDotsEL.querySelector(".active-dot");

    curIndex = [...btnDotsEL.children].indexOf(curDot);
    nextIndex = [...btnDotsEL.children].indexOf(e.target);
    setNextPrevSlide(curIndex, nextIndex);
    resetTimeout();
  }
});

function setNextPrevSlide(curIndex, nextIndex) {
  //Remove the class to the current slide
  slidesEl.children[curIndex].classList.remove("active-slide");
  btnDotsEL.children[curIndex].classList.remove("active-dot");

  //Assigned the class to the next slide
  slidesEl.children[nextIndex].classList.add("active-slide");
  btnDotsEL.children[nextIndex].classList.add("active-dot");
}

//Auto Slide
function autoSlide() {
  const activeSlide = document.querySelector(".active-slide");
  curIndex = [...slidesEl.children].indexOf(activeSlide);
  lastIndex = slidesEl.children.length - 1;

  let nextIndex = curIndex === lastIndex ? 0 : curIndex + 1;

  setNextPrevSlide(curIndex, nextIndex);

  timeout = setTimeout(autoSlide, 5000);
}

autoSlide();

function resetTimeout() {
  clearTimeout(timeout);
  timeout = setTimeout(autoSlide, 5000);
}
