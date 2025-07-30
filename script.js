    let slideIndex = 0;
showSlides();

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  if (!n || n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Auto slideshow
setInterval(() => {
  plusSlides(1);
}, 4000); // change slide every 4 seconds
