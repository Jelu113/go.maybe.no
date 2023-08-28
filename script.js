var ApiKey = "f7169177f894f761fb58e3a8508669f4";
var city;
var fetchButton = document.getElementById("sbutton");
var cityList = document.querySelector("#input");
var lattitude = " ";
var longitude = " ";


localStorage.getItem(cityList, "cityName")

function getApi() {
   var requestURLCity = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityList.value + "&appid=" + ApiKey;
   fetch(requestURLCity)

      .then(function (response) {
         console.log(response);
         return response.json()
         // displayJumbo(response)
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

function displayWeather(weatherData){
    let humidity = document.getElementById('humidity')
    humidity.textContent = weatherData.list[0].main.humidity

   //document.createElement('div')
   let boxOne = document.createElement('div')
   let textOne = document.createElement('p')
   textOne.textContent = weatherData.list[0].main.humidity //need to change this to the day via API and create a for loop to add the 5 days. 
   boxOne.appendChild(textOne); // look up syntax in my classwork on creating HTML dynamically
   let first = document.querySelector('#first')
   first.appendChild(boxOne) 

   
}

//for loop to create 5 cards for the days. 
// function displayWeather(weather){ }  weather.temp weather.humidity etc...
// document.querySelector for all elements to be able to be put on the browser.
// this function will display everything on the page, put all the query selectors in. 