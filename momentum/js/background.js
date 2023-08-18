const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg",
]

RANDOM_IMAGE_NUMBER = Math.floor(Math.random() * images.length);
const chosenImage = images[RANDOM_IMAGE_NUMBER];

const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`

document.body.appendChild(bgImage);