const apiKey = "60bb4787e9e875a0352ade415f937651";

function getCurrentDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weather = document.querySelector(".weather-forecast");
  let currentDateTimeElement = document.createElement("p");
  let currentTime = now.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let currentDateTime = document.createTextNode(
    `${days[now.getDay()]} ${currentTime}`
  );
  currentDateTimeElement.appendChild(currentDateTime);
  let currentWeatherElement = document.querySelector(
    ".current-weather-forecast"
  );
  weather.insertBefore(currentDateTimeElement, currentWeatherElement);
  currentDateTimeElement.classList.add("date-time");
}

getCurrentDateTime();
function displayCurrentLocationWeather(response) {
  const currentCity = response.data.name;
  const currentCityWeather = Math.round(response.data.main.temp);
  const currentCityWeatherHigh = Math.round(response.data.main.temp_max);
  const currentCityWeatherLow = Math.round(response.data.main.temp_min);
  //console.log(response.data);
  document.querySelector(".city-title").innerHTML = currentCity;
  document.querySelector(".current-temp").innerHTML = currentCityWeather;
  document.querySelector("#current-hi-temp").innerHTML = currentCityWeatherHigh;
  document.querySelector("#current-low-temp").innerHTML = currentCityWeatherLow;
}
function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentLocationWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
getCurrentPosition();

function displayCityAndTemp(searchResponse) {
  //console.log(searchResponse);
  displayCurrentLocationWeather(searchResponse);
}

function getCityAndTemp(event) {
  event.preventDefault();
  //console.log(event);
  const cityInput = document.querySelector(".city-search").value;
  if (cityInput) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCityAndTemp);
  } else {
    alert("Finding Current Location...");
    getCurrentPosition();
  }
}

function searchCity() {
  let cityForm = document.querySelector(".search-form");
  cityForm.addEventListener("submit", getCityAndTemp);
}

searchCity();

function toCelcius(farenheit) {
  return Math.round((farenheit - 32) * (5 / 9));
}
function toFarenheit(celcius) {
  return Math.round(celcius * (9 / 5) + 32);
}

function getUnits() {
  let currentUnit = document.getElementById("units").textContent;
  //console.log(currentUnit);
  if (currentUnit === "°F") {
    return true;
  } else {
    return false;
  }
}

function onToggleButtonClick(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  let temperature = temperatureElement.textContent;

  //query selectorAll temperatures, foreach node thing, fill the temperature element...
  //let temps = document.querySelectorAll("hi-temp");
  let isFarenheit = getUnits();
  if (isFarenheit) {
    let celciusTemp = toCelcius(temperature);
    temperatureElement.innerHTML = celciusTemp;
    document.querySelector("#units").innerHTML = "°C";
  } else {
    let farenheitTemp = toFarenheit(temperature);
    temperatureElement.innerHTML = farenheitTemp;
    document.querySelector("#units").innerHTML = "°F";
  }
}

function toggleUnits() {
  let toggleButton = document.querySelector(".unit-button");
  toggleButton.addEventListener("click", onToggleButtonClick);
}
toggleUnits();
