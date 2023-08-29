var ApiKey = "f7169177f894f761fb58e3a8508669f4";
var city;
var fetchButton = document.getElementById("sbutton");
var cityList = document.querySelector("#input");
var lattitude = " ";
var longitude = " ";

function getApi() {
   var requestURLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityList.value + "&appid=" + ApiKey;
   fetch(requestURLCity)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         lattitude = data[0].lat;
         longitude = data[0].lon;
         var cityNameFromAPI = data[0].name; 

         var requestURLLon = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lattitude + "&lon=" + longitude + "&appid=" + ApiKey;

         fetch(requestURLLon)
            .then(function (resp) {
               return resp.json();
            })
            .then(function (weatherData) {
               console.log(weatherData);
               displayWeather(cityNameFromAPI, weatherData);
               addToSearchHistory(cityList.value);
            });
      });
}

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
   var searchHistory =JSON.parse(localStorage.getItem("searchHistory")) || [];

   if(!searchHistory.includes(city)) {
      searchHistory.push(city);

      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

      updateSearchHistoryUI(searchHistory);
   }
}

fetchButton.addEventListener("click", function (event) {
   event.preventDefault();
   getApi()
});
console.log("button")


// console.log(event)
// event.preventDefault{

function displayWeather(cityName, weatherData) {
   let cityNameElement = document.getElementById('cityName');
   cityNameElement.textContent = cityName;

   let temp = document.getElementById('temp');
   
   let tempFahrenheit = (weatherData.list[0].main.temp - 273.15) * 9/5 + 32;
   temp.textContent = 'Temp: ' + tempFahrenheit.toFixed(2) + ' °F';

   let wind = document.getElementById('wind');
   wind.textContent = 'Wind: ' + weatherData.list[0].wind.speed;

   let humidity = document.getElementById('humidity');
   humidity.textContent = "Humidity: " + weatherData.list[0].main.humidity;

   let dateElement = document.getElementById('date');
   let todayDate = dayjs().format('MMMM D, YYYY');
   dateElement.textContent = todayDate;
}


   //document.createElement('div')
   // let box = document.createElement('div')
   // let text = document.createElement('p')
   // text.textContent = weatherData.list[0].main.dt_txt //need to change this to the day via API and create a for loop to add the 5 days. 
   // box.appendChild(textOne); // look up syntax in my classwork on creating HTML dynamically
   // let first = document.querySelector('#first')
   // first.appendChild(box)




//for loop to create 5 cards for the days. 
// function displayWeather(weather){ }  weather.temp weather.humidity etc...
// document.querySelector for all elements to be able to be put on the browser.
// this function will display everything on the page, put all the query selectors in. 