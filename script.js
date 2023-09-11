var ApiKey = "f7169177f894f761fb58e3a8508669f4";
var city;
var fetchButton = document.getElementById("sbutton");
var cityList = document.querySelector("#input");
var lattitude = " ";
var longitude = " ";
//requesting API
function getApi() {
   var requestURLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityList.value + "&appid=" + ApiKey + "&units=imperial";
   fetch(requestURLCity)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         lattitude = data[0].lat;
         longitude = data[0].lon;
         var cityNameFromAPI = data[0].name;

         var requestURLLon = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lattitude + "&lon=" + longitude + "&appid=" + ApiKey + "&units=imperial";

         fetch(requestURLLon)
            .then(function (resp) {
               return resp.json();
            })
            .then(function (weatherData) {
               console.log(weatherData);
               displayWeather(cityNameFromAPI, weatherData);
               addToSearchHistory(cityList.value);
               fiveDay(weatherData);
            });
      });

}

function loadSearchHistory() {
   var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
   updateSearchHistoryUI(searchHistory);
}

window.addEventListener("load", loadSearchHistory);

function updateSearchHistoryUI(searchHistory) {
   var historyList = document.getElementById("history-list");
   historyList.innerHTML = "";


   searchHistory.forEach(function (city) {
      var historyItem = document.createElement("li");
      historyItem.classList.add("history-item");
      historyItem.textContent = city;


      historyItem.addEventListener("click", function () {
         displayWeatherForCity(city);
      });

      historyList.appendChild(historyItem);
   });
}
function addToSearchHistory(city) {
   var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

   if (searchHistory.length >= 5) {
      searchHistory.pop();
   }

   searchHistory.unshift(city);

   localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
   updateSearchHistoryUI(searchHistory);
}


fetchButton.addEventListener("click", function (event) {
   event.preventDefault();
   getApi()
});
console.log("button")




function displayWeather(cityName, weatherData) {
   let cityNameElement = document.getElementById('cityName');
   cityNameElement.textContent = cityName;

   let temp = document.getElementById('temp');

   let tempFahrenheit = weatherData.list[0].main.temp
   temp.textContent = 'Temp: ' + tempFahrenheit + ' °F';

   let wind = document.getElementById('wind');
   wind.textContent = 'Wind: ' + weatherData.list[0].wind.speed;

   let humidity = document.getElementById('humidity');
   humidity.textContent = "Humidity: " + weatherData.list[0].main.humidity;

   let dateElement = document.getElementById('date');
   let todayDate = dayjs().format('MMMM D, YYYY');
   dateElement.textContent = todayDate;
}

function fiveDay(weatherData) {
   let forecastContainer = document.getElementById("forecast-container");
   forecastContainer.innerHTML = ""; // Clear previous content

   for (let i = 0; i < 5; i++) {
      let forecastDay = weatherData.list[i * 8]; // Data for each day is at every 8th index

      // Create a box for each day
      let dayBox = document.createElement("div");
      dayBox.classList.add("forecast-box");

      // Create elements to display the data
      let dateElement = document.createElement("p");
      let tempElement = document.createElement("p");
      let windElement = document.createElement("p");
      let humidityElement = document.createElement("p");

      // Set the content for each element
      dateElement.textContent = dayjs(forecastDay.dt_txt).format("MMM D");
      tempElement.textContent = "Temp: " + forecastDay.main.temp + " °F";
      windElement.textContent = "Wind: " + forecastDay.wind.speed + " mph";
      humidityElement.textContent = "Humidity: " + forecastDay.main.humidity + "%";

      // Append elements to the dayBox
      dayBox.appendChild(dateElement);
      dayBox.appendChild(tempElement);
      dayBox.appendChild(windElement);
      dayBox.appendChild(humidityElement);

      // Append the dayBox to the forecastContainer
      forecastContainer.appendChild(dayBox);
   }
}
