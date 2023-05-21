let now = new Date();
let span = document.querySelector("span");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = ("0" + now.getHours()).slice(-2);
let minutes = ("0" + now.getMinutes()).slice(-2);
span.innerHTML = `${day} ${hours}:${minutes}`;
function updateCity(event) {
  event.preventDefault();
  let target = document.querySelector("#city-value");
  let replacementCity = document.querySelector("#search-box");
  target.innerHTML = replacementCity.value;
  getWeather(replacementCity.value);
}
document.querySelector("form").addEventListener("submit", updateCity);

function getWeather(city) {
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayForecast() {
  let forecastOutput = document.querySelector("#forecast");

  let days = ["Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <ul> 
          <li class="weather-forecast-date">${day}</li>
          <li>
          <img src="https://openweathermap.org/img/wn/01n@2x.png" alt="" width="40">
          </li>
          <li class="weather-forecast-temp-max"> 98° </li>
             <li class="weather-forecast-temp-min"> 67° </li>
          </ul> 
        </div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastOutput.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let tempOutput = document.querySelector(".tempDisplay");
  let descriptionOutput = document.querySelector("#description");
  let humidityOutput = document.querySelector("#humidity");
  let windOutput = document.querySelector("#wind");
  let iconOutput = document.querySelector("#icon");
  farenheitTemperature = response.data.main.temp;
  tempOutput.innerHTML = Math.round(response.data.main.temp);
  descriptionOutput.innerHTML = response.data.weather[0].description;
  humidityOutput.innerHTML = response.data.main.humidity;
  windOutput.innerHTML = Math.round(response.data.wind.speed);
  iconOutput.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconOutput.setAttribute("alt", response.data.weather[0].description);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".tempDisplay");
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".tempDisplay");
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

getWeather("Scottsdale");
displayForecast();
