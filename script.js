
$(document).ready(function(){ 

//Define API variables (url and api key) 

/*This function listens to whether the celsius toggle is checked, if not 
then the api pulls fahrenheit whether data.  Note the wind speed also 
changes to KPH.*/ 
var basis = "&units=imperial"

function checkDisplayBasis (basis){ 
    $("#display-basis").change(function(){
    if($(this).is(":checked")){
        var basis ="&units=metric"
    } else {var basis ="&units=standard"}
    // console.log(basis);
    return(basis)
})};

checkDisplayBasis(basis)

console.log(checkDisplayBasis.call(basis));


let brad = checkDisplayBasis(basis);
console.log(brad)



/* This variable toggles between fahrenheit and celsius.  This default 
is fahrenheit */ 
var basis = "&units=imperial"
/* This variable is the city to search weather on.*/ 
var city = "Denver"
//API Key Needed to access this api. 
var apiKey = 'd5b31dfbb222fbc297e5a2174bec8cc3'
//URL to the api that has the current weather conditions
var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city + "&appid=" + apiKey + basis;

//URL to the api that has the forecasted weather conditions
var queryUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

//AJAX call to both current weather API and forecasted API.
$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {

    console.log(response)
    var city = response.name;
    var temp = Math.round(response.main.temp);
    var humidity = response.main.humidity;
    var wind = Math.round(response.wind.speed);
    var currentDate = dayjs().format('MM/DD/YYYY');
    var timeZone = response.timezone;
    var currentWeatherIcon = response.weather[0].icon;
    var currentWeatherDescription = response.weather[0].description;
    var imageLink = "http://openweathermap.org/img/wn/"+currentWeatherIcon + ".png"
    
    console.log("City:" + city);
    console.log("Temp:" + temp);
    console.log("Humidity:" + humidity);
    console.log("Wind:" + wind);
    console.log("time zone:" + timeZone);
    console.log(dayjs().format('MM/DD/YYYY'));
    console.log(currentWeatherIcon);
    console.log(imageLink)

    //This pushes current weather to website
    $("#current-weather-header").html("<h3>"+city+" " + currentDate + "<img src=" + imageLink + "></img></h3>")
    // $("h3").text(city + " " + currentDate);
    // $("h4").html("<img src="+imageLink+"></img>")
    $("ul li:eq(0)").text(currentWeatherDescription);
    $("ul li:eq(1)").text("Current Temp: " +temp);
    $("ul li:eq(2)").text("Humidity: " + humidity);
    $("ul li:eq(3)").text("Wind: " + wind);
    $("p:first").text("Current Humidity: " + humidity);
    
    
$.ajax({
    url: queryUrl1,
    method: "GET"
}).then(function (response1) {
    var forecastData = response1.list

    console.log(forecastData)

    var forecastGMT = dayjs(forecastData[0].dt_txt).format('MM/DD/YYYY HH');
    var forecastLocalTime = dayjs(dayjs(forecastData[0].dt_txt, 'YYYY-MM-DD hh',true).add(response.timezone,'seconds')).format('MM/DD/YYYY HH');
    var forecastTemp = forecastData[0].main.temp;
    var forecastHumidity = forecastData[0].main.humidity;
    var forecastWind = forecastData[0].wind.speed;
    var forecastWeatherDescription = forecastData[0].weather[0].description
    var forecastWeatherIcon = forecastData[0].weather[0].icon

    console.log(forecastGMT)
    console.log(forecastLocalTime)
    console.log(forecastTemp)
    console.log(forecastHumidity)
    console.log(forecastWind)
    console.log(forecastWeatherDescription)
    console.log(forecastWeatherIcon)


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
    // var forecastInLocalTime = dayjs(dayjs(forecastData[0].dt_txt, 'YYYY-MM-DD hh',true).add(response.timezone,'seconds')).format('MM/DD/YYYY HH')
    // console.log("Forecast Local Time: " + forecastInLocalTime);
      

    //FOR LOOP with local time added 
    // for (i=0; i<forecastData.length; i++)
    // console.log("GMT TIME: " + forecastData[i].dt_txt + "////LOCAL TIME: " + dayjs(dayjs(forecastData[i].dt_txt, 'YYYY-MM-DD hh',true).add(response.timezone,'seconds')).format('MM/DD/YYYY HH') + "//TEMP: " + forecastData[i].main.temp + "//HUMIDITY: " + forecastData[i].main.humidity + "//WIND: " + forecastData[i].wind.speed)

})
})

});