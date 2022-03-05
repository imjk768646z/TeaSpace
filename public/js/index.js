// carousel組件設定
var myCarousel = document
  .querySelector(".slideshow")
  .querySelector(".carousel");
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 2000,
  wrap: false,
  // pause: true
});

