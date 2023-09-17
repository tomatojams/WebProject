const API_KEY = "70884f237363a4b09ec8fed86b4877f1";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  //console.log("You live in", lat, lon);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherIcon = document.querySelector("#weather span:first-child i");
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");

    
      weather.innerText = `${data.weather[0].main} / ${Math.round(data.main.temp)}°C`;
      
      city.innerText = data.name;
      console.log(url);
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
