var APIKey = "f7169177f894f761fb58e3a8508669f4";
// var city;
var fetchButton = document.getElementById("sbutton");
var cityList = document.getElementById("input");

api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}

localStorage.setItem(cityList, "cityName")

