const images = ["0.jpg","1.jpg","2.jpg", "3.jpg","4.jpg", "5.jpg"];

const RANDOM_IMAGE_NUMBER = Math.floor(Math.random() * images.length);
const chosenImage = images[RANDOM_IMAGE_NUMBER];

const bgImage = new Image();
bgImage.src = `img/${chosenImage}`;

bgImage.onload = function() {
  document.body.style.backgroundImage = `url('${bgImage.src}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
};