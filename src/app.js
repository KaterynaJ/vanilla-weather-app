let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//takes typed city name and triggers search function with it
function handleSubmit(event) {
  event.preventDefault();
  let searchFieldValue = document.querySelector("#city-input-search");
  search(searchFieldValue.value);
}

//forms a request to weather website using api key, api url and variable that stores city name
function search(city) {
  let apiKey = "2daf65f0cdaa917f11026e8a128ce271";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

//retrieves current time and date on computer and formats it
function formatDate(timestamp) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = weekdays[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${days} ${hours}:${minutes}`;
}

//retrieves weather data from website and changes html elements accordingly
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let conditionsElement = document.querySelector("#conditions");
  conditionsElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let altElement = document.querySelector("#icon");
  altElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.name);
}

//convert temp degree from C to F

let fahrenheitLink = document.querySelector("#fahrenheit-units");
fahrenheitLink.addEventListener(
  "click",
  function () {
    let temperatureElement = document.querySelector("#temperature");

    let celsiusTemp = parseInt(temperatureElement.innerHTML);

    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  },
  { once: true }
);

/*
//convert temp degree from F to C

let celsiusLink = document.querySelector("#celsius-units");
celsiusLink.addEventListener("click", function () {

    let temperatureElement = document.querySelector("#temperature");

    let fahrenheitTemp = parseInt(temperatureElement.innerHTML);

    let celsiusTemp = (fahrenheitTemp - 32) * 5/9;

    temperatureElement.innerHTML = Math.round(celsiusTemp);
 
}, {once : true}); 
*/

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="forecast-weekend">
        <div class="forecast-date">${formatForecastDate(day.time)}</div>
        <div class="forecast-icon">
            <img src="${day.condition.icon_url}" />
        </div>
            <div class="forecast-temp">
                <span class="forecast-temp-max"><strong>${Math.round(
                  day.temperature.maximum
                )}°</strong></span> 
                <span class="forecast-temp-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
            </div> 
            </div>
            `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

search("Calgary");

function getForecast(city) {
  let apiKey = "57cdf82e2de3o0146tca4739b468cac4";
  let apiLink = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiLink).then(displayForecast);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}
