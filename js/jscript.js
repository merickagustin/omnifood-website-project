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
const btnSlidesEl = document.querySelectorAll(".btn-slide");

const slidesEl = document.querySelector(".slider-container");

btnSlidesEl.forEach((btnSlides) => {
  btnSlides.addEventListener("click", function () {
    const self = this;
    const activeSlide = slidesEl.querySelector(".active-slide");
    const curIndex = [...slidesEl.children].indexOf(activeSlide);
    const lastIndex = slidesEl.children.length - 1;

    let nextIndex = 0;

    //Check if the trigger is the next button
    if (self.className.match("btn-slide--next")) {
      nextIndex = curIndex !== 0 ? curIndex - 1 : lastIndex;

      //Remove the class to the current slide
      slidesEl.children[curIndex].classList.remove("active-slide");

      //Assigned the class to the next slide
      slidesEl.children[nextIndex].classList.add("active-slide");
    }
    //otherwise check if the trigger is the prev button
    else if (self.className.match("btn-slide--prev")) {
      nextIndex = curIndex !== lastIndex ? curIndex + 1 : 0;

      //Remove the class to the current slide
      slidesEl.children[curIndex].classList.toggle("active-slide");

      //Assigned the class to the next slide
      slidesEl.children[nextIndex].classList.toggle("active-slide");
    }
  });
});
