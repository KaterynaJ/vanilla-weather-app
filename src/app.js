let city = "Kyiv"
let apiKey = "3dc39916f235285875a7d4fd53778f07";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;



axios.get(apiUrl).then(displayTemperature);


function formatDate(timestamp) {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

    return `${days} ${hours}:${minutes}`
}



function displayTemperature (response) {
    console.log(response);

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
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

     let altElement = document.querySelector("#icon");
     altElement.setAttribute(
        "alt",
        response.data.weather[0].description);

}


  