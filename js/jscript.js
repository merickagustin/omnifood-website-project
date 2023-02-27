/**********************MOBILE NAVIGATION********************/
const menuNavEl = document.querySelector(".btn-mobile-nav");

menuNavEl.addEventListener("click", function () {
  const navEL = document.querySelector(".main-nav");
  navEL.classList.toggle("nav--open");

  const childrenEl = this.children;

  for (i = 0; i < childrenEl.length; i++) {
    if (childrenEl[i].name == "menu-outline") {
      childrenEl[i].name = "close-outline";
    } else {
      childrenEl[i].name = "menu-outline";
    }
  }
});

/**********************TESTIMONIAL CAROUSEL***************************/
//Get elements
const btnSlidesEl = document.querySelectorAll(".btn-slide");
const slidesEl = document.querySelector(".slider-container");
const btnDotsEL = document.querySelector(".btn-dots");

let curIndex = 0,
  lastIndex = 0;

//Button Next/Prev slide click event
btnSlidesEl.forEach((btnSlides) => {
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
  });
});

//Dot button click event
btnDotsEL.addEventListener("click", function (e) {
  if (e.target.classList.value === "btn-dot") {
    const curDot = btnDotsEL.querySelector(".active-dot");

    curIndex = [...btnDotsEL.children].indexOf(curDot);
    nextIndex = [...btnDotsEL.children].indexOf(e.target);
    setNextPrevSlide(curIndex, nextIndex);
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
(function autoSlide() {
  const activeSlide = document.querySelector(".active-slide");
  curIndex = [...slidesEl.children].indexOf(activeSlide);
  lastIndex = slidesEl.children.length - 1;

  let nextIndex = curIndex === lastIndex ? 0 : curIndex + 1;

  setNextPrevSlide(curIndex, nextIndex);

  setTimeout(autoSlide, 2000);
})();
