//Define API variables (url and api key) 

console.log($("#display-basis").is(':checked'))



var basis = "&units=imperial"
var apiKey = 'd5b31dfbb222fbc297e5a2174bec8cc3'
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=fresno&appid=" + apiKey + basis;

var queryUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=fresno&appid=" + apiKey + "&units=imperial";

// console.log(queryUrl)



$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {

    // console.log(response)
    var city = response.name
    var temp = Math.round(response.main.temp)
    var humidity = response.main.humidity
    var wind = Math.round(response.wind.speed)
    
    
    
    console.log("City:" + city)
    console.log("Temp:" + temp)
    console.log("Humidity:" + humidity)
    console.log("Wind:" + wind)
    console.log("time zone:" + response.timezone)

    $("h1").text(city)
    $("ul li:eq(0)").text("Current Temp: " +temp)
    $("ul li:eq(1)").text("Humidity: " + humidity)
    $("ul li:eq(2)").text("Wind: " + wind)
    // $("#current-weather").text("Current Temperature: " + temp)
    $("p:first").text("Current Humidity: " + humidity)
    // $("#current-weather").text("Current Temperature: " + temp)
$.ajax({
    url: queryUrl1,
    method: "GET"
}).then(function (response1) {
    var forecastData = response1.list
    // console.log(forecastData)
    
    

    //Long way to get the date in local time
    //Get date string from api (note this is GMT)
    // var gmtDateData = forecastData[0].dt_txt
    // console.log("TEXT STRING OF GMT DATE: " + dayjs(gmtDateData).format('MM/DD/YYYY HH'))
    // Convert the text string into a dayjs consumable string (so that dayjs can recognize the string as a date)
    // var gmtDate = dayjs(gmtDateData, 'YYYY-MM-DD hh',true)
    //Add the timezone value to the GMT date - this converts the time from GMT to the timezone of the city asked for. 
    // var localDatePlusOne = gmtDate.add(response.timezone,'seconds')
    // var localDatePlusOneReformated = dayjs(forecastInLocalTime).format('MM/DD/YYYY HH')
    // console.log(localDatePlusOneReformated)


    //Combined variable declaration that wraps the date functions into one. 
    var forecastInLocalTime = dayjs(dayjs(forecastData[0].dt_txt, 'YYYY-MM-DD hh',true).add(response.timezone,'seconds')).format('MM/DD/YYYY HH')

    console.log("Forecast Local Time: " + forecastInLocalTime);
      

    // for (i=0; i<forecastData.length; i++)
    // console.log("TIME: " + forecastData[i].dt_txt + "//TEMP: " + forecastData[i].main.temp + "//HUMIDITY: " + forecastData[i].main.humidity + "//WIND: " + forecastData[i].wind.speed)

    //FOR LOOP with local time added 
for (i=0; i<forecastData.length; i++)
    console.log("GMT TIME: " + forecastData[i].dt_txt + "LOCAL TIME: " + dayjs(dayjs(forecastData[i].dt_txt, 'YYYY-MM-DD hh',true).add(response.timezone,'seconds')).format('MM/DD/YYYY HH') + "//TEMP: " + forecastData[i].main.temp + "//HUMIDITY: " + forecastData[i].main.humidity + "//WIND: " + forecastData[i].wind.speed)

})
})

// fetch(queryUrl)
// .then ((response) => response.json())
// .then ((data) =>console.log(data))