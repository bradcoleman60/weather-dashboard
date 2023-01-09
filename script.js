//Define API variables (url and api key) 
var apiKey = 'd5b31dfbb222fbc297e5a2174bec8cc3'
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=" + apiKey;

console.log(queryUrl)

fetch(queryUrl)
.then ((response) => response.json())
.then ((data) =>console.log(data))