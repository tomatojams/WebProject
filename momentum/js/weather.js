const API_KEY = "009279a52114f87f7a7e1142ea4d19ff7";


function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    //console.log("You live in", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url);
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
