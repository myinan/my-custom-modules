import "./image-slider.css";
import rightArrowSVG from "./assets/right-arrow.svg";
import leftArrowSVG from "./assets/left-arrow.svg";
import circleSVG from "./assets/circle.svg";

import firstIMG from "./assets/image-1.jpg";
import secondIMG from "./assets/image-2.jpg";
import thirdIMG from "./assets/image-3.jpg";

//Append right arrow to the DOM
const rightSVGContainer = document.querySelector(".right-svg-container");
rightSVGContainer.innerHTML = rightArrowSVG;

//Append left arrow to the DOM
const leftSVGContainer = document.querySelector(".left-svg-container");
leftSVGContainer.innerHTML = leftArrowSVG;

//Append images to the slideContainer
const firstSlide = document.querySelector(".slide-container div:nth-child(1)");
const firstCopy = new Image();
firstCopy.src = firstIMG;
firstSlide.append(firstCopy);

const secondSlide = document.querySelector(".slide-container div:nth-child(2)");
const secondCopy = new Image();
secondCopy.src = secondIMG;
secondSlide.append(secondCopy);

const thirdSlide = document.querySelector(".slide-container div:nth-child(3)");
const thirdCopy = new Image();
thirdCopy.src = thirdIMG;
thirdSlide.append(thirdCopy);

// Show slides
const slides = document.querySelectorAll(".carousel-slide");
let currentIndex = 0;
let userInteraction = false; // Variable to track user interaction

// Initial setup
showSlide(currentIndex);
updateActiveCircle();

function showSlide(index) {
  // Remove 'active' class from all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Add 'active' class to the selected slide
  slides[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
  userInteraction = true; // Set the user interaction flag
  updateActiveCircle();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
  userInteraction = true; // Set the user interaction flag
  updateActiveCircle();
}

//Add event listener for the arrows
const slideContainer = document.querySelector(".slide-container");

function arrowClicked(event) {
  const target = event.target;

  if (target.matches("#nextButton")) {
    nextSlide();
  } else if (target.matches("#prevButton")) {
    prevSlide();
  }
}

// Auto-advance slides
setInterval(function () {
  // Check if user interaction occurred in the last 10 seconds
  if (!userInteraction) {
    nextSlide();
  }

  // Reset user interaction flag after 10 seconds
  setTimeout(function () {
    userInteraction = false;
  }, 10000);
}, 5000); // Change slide every 5 seconds

slideContainer.addEventListener("click", arrowClicked);

// Create circles and append the container
const circlesContainer = document.querySelector(".circles-container");
for (let i = 0; i < 3; i++) {
  const newContainer = document.createElement("div");
  newContainer.innerHTML = circleSVG;
  newContainer.setAttribute("id", `circle-inner-${i + 1}`);
  newContainer.classList.add("circle-inner");
  circlesContainer.append(newContainer);

  // Add click event listener to each circle
  newContainer.addEventListener("click", function () {
    currentIndex = i;
    showSlide(currentIndex);
    updateActiveCircle();
  });
}

function updateActiveCircle() {
  const circles = document.querySelectorAll(".circle-inner");
  circles.forEach((circle, i) => {
    circle.classList.toggle("active-circle", i === currentIndex);
  });
}
