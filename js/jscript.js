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
