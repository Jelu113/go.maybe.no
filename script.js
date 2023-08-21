var ApiKey = "f7169177f894f761fb58e3a8508669f4";
// var city;
var fetchButton = document.getElementById("sbutton");
var cityList = document.querySelector("#input");
var lattitude = " ";
var longitude = " ";


localStorage.setItem(cityList, "cityName")

function getApi() {
   var requestURLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityList.value + "&appid=" + ApiKey;
   fetch(requestURLCity)

      .then(function (response) {
         console.log(response);
         return response.json()

      })
      .then(function (data) {
         console.log(data)
         lattitude = data[0].lat
         longitude = data[0].lon
         var requestURLLon = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lattitude + "&lon=" + longitude + "&appid=" + ApiKey;
         fetch(requestURLLon)

            .then(function (resp) {
               return resp.json()
            })
            .then(function (weatherData) {
               console.log(weatherData)
               displayWeather(weatherData)
            })
      });
};

fetchButton.addEventListener("click", function (event) {
   event.preventDefault();
   getApi()
});
console.log("button")
// function(event)

   // console.log(event)
   // event.preventDefault{


// document.querySelector for all elements to be able to be put on the browser.
// another function this function will display everything on the page, put all the query selectors in. 

// function displayWeather(weather){ }  weather.temp weather.humidity etc...