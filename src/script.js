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

function displayTemperature(response) {
  console.log(response);
  let tempOutput = document.querySelector(".tempDisplay");
  tempOutput.innerHTML = Math.round(response.data.main.temp);
}

function getWeather(city) {
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

getWeather("Scottsdale");
