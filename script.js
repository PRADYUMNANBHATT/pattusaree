"use strict";
// import data from "./data";
// console.log(data);
const preloader = document.getElementById("loader");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu-items");
const close = document.querySelector(".ba-close");
window.addEventListener("load", (event) => {
  setInterval(() => {
    preloader.classList.remove("ring");
  }, 2000);
});
const nav = document.querySelector("nav");
const header = document.querySelector(".hero");
const obaserverCallback = function (entries, observer) {
  // const [e]=entries
  entries.forEach((e) => {
    if (!e.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  });
};

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};

const observer = new IntersectionObserver(obaserverCallback, observerOptions);
observer.observe(header);
///*****slider*****
function slider() {
  const allslides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".left");
  const btnRight = document.querySelector(".right");
  const slideDots = document.querySelector(".dots");

  //   const slider = document.querySelector(".slider");
  //   slider.style.transform='scale(0.5)';
  //   slider.style.overflow='visible';
  let count = 0;
  const maxLength = allslides.length;
  let goSLide = (count) => {
    allslides.forEach((e, i) => {
      e.style.transform = `translateX(${(i - count) * 100}%)`;
    });
  };
  const createDots = () => {
    allslides.forEach((_, i) => {
      slideDots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();
  goSLide(count);

  const prevSlide = function () {
    if (count === 0) {
      count = maxLength - 1;
    } else {
      count--;
    }
    goSLide(count);
    activeDot(count);
  };
  const nextSlide = function () {
    if (count === maxLength - 1) {
      count = 0;
    } else {
      count++;
    }
    goSLide(count);
    activeDot(count);
  };
  const activeDot = (e) => {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((el) => {
      el.classList.remove("dots__dot--active");
      //   if (el.dataset.slide === e) {
      //     el.classList.add("dots__dot--active");
      //   }
    });
    document
      .querySelector(`.dots__dot[data-slide="${e}"]`)
      .classList.add("dots__dot--active");
    // e.target.classList.add("dots__dot--active");
  };
  activeDot(count);
  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  slideDots.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const{slide}=e.target.dataset
      const slide = e.target.dataset.slide;
      e.target.classList.add("dots__dot--active");
      goSLide(slide);
      activeDot(slide);
    }
  });
  const autoslider = setInterval(() => {
    allslides.forEach((e) =>
      e.addEventListener("mouseover", () => {
        clearInterval(autoslider);
      })
    );
    nextSlide();
  }, 8000);
}
slider();
let open = false;
burger.addEventListener("click", () => {
  open
    ? ((menu.style.display = "none"), (open = false))
    : ((menu.style.display = "flex"), (open = true));
  close.classList.toggle("visible");
});
close.addEventListener("click", () => {
  open
    ? ((menu.style.display = "none"), (open = false))
    : ((menu.style.display = "flex"), (open = true));
  close.classList.toggle("visible");
});
