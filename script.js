$(document).ready(function () {

    //Sets global variables   
    var citiesSaved = [];
    citiesSaved = JSON.parse(localStorage.getItem("citiesSavedStringify"));

    // This runs function to display any search history on page load
    displaySearchHistory();

    /* This function retrieves any cities stored in local storage, if any and displays the history in buttons*/ 
    function displaySearchHistory() {
    
    if (citiesSaved === null) citiesSaved = []
    var searchHistoryEl = $("#searchHistory")
    $("#searchHistory").empty()
    for (i = 0; i < citiesSaved.length; i++) {
    var newBtn = $("<button>")
    newBtn.addClass("btn btn-primary text-nowrap")
   
        searchHistoryEl.append(newBtn)
        newBtn.attr('name', citiesSaved[i])
        newBtn.text(citiesSaved[i])
        
    }
  }

    /* This function runs the API call when a button on the search history is clicked */
    $("button").on("click", function(event){
        city = $(this).text()
        callApi(city)
    })
      
    /* This variable is the city to search weather on and sets the default to New York that is used on page load.*/
    var city = "New York";
  
    /* This calls the API function on page load and displays weather and forecast for New York*/ 
    callApi(city)

    /* This listens for a click of the submit button and restates the city variable to the inputed city.  Then calls the API function This also stores the searched city into Local Storage*/ 
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        city = $("#inputCity").val();
        callApi(city);
        citiesSaved.push(city);
        localStorage.setItem("citiesSavedStringify", JSON.stringify(citiesSaved));
        displaySearchHistory();

  });

  
    /* Declares a variable called timeZone and sets to empty string */
    var timeZone = "";

    //AJAX call to both current weather API and forecasted API.
    function callApi(city) {
        var apiKey = "d5b31dfbb222fbc297e5a2174bec8cc3";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=imperial";
    var queryUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=imperial";

    /* This CALLS the forecast API*/
    $.ajax({
      url: queryUrl,
      method: "GET",
      cache: false,
        }).then(function (response) {
            var city = response.name;
            var currentTemp = Math.round(response.main.temp);
            var currentHumidity = response.main.humidity;
            var currentWind = Math.round(response.wind.speed);
            var currentDate = dayjs().format("MM/DD/YYYY");
            timeZone = response.timezone;
            var currentWeatherIcon = response.weather[0].icon;
            var currentWeatherDescription = response.weather[0].description;
            var imageLink ="http://openweathermap.org/img/wn/" + currentWeatherIcon + ".png";

      //This pushes current weather to website
      $("#current-weather-header").html(
        "<h3>" +
          city +
          " " +
          currentDate +
          "<img src=" +
          imageLink +
          "></img></h3>"
      );
      $("#current-weather-details").html(
        '<ul style="list-style-type: none"><li>' +
          currentWeatherDescription +
          "</li><li>Temp: " +
          currentTemp +
          "</li><li>Humidity: " +
          currentHumidity +
          "</li><li>Winds: " +
          currentWind +
          "</li></ul>"
      );

      /* This is the AJAX call to obtain the forecasted weather for the selected city*/

      $.ajax({
        url: queryUrl1,
        method: "GET",
        cache: false,
      }).then(function (response1) {
        var forecastData = response1.list;
        var forecastArray = [];
        var forecastArrayDateOnly = [];

        /* This FOR LOOP creates and ForecastArray that only includes the data needed in the forecast section */ 
        for (i = 0; i < forecastData.length; i++) {
            var forecastLocalTime = dayjs(
            dayjs(forecastData[i].dt_txt, "YYYY-MM-DD", true).add(
              timeZone,
              "seconds"
            )
          ).format("MM/DD/YYYY");
          var forecastTemp = forecastData[i].main.temp;
          var forecastHumidity = forecastData[i].main.humidity;
          var forecastWind = forecastData[i].wind.speed;
          var forecastWeatherDescription =
            forecastData[i].weather[0].description;
          var forecastWeatherIcon = forecastData[i].weather[0].icon;
          forecastArray.push([
            forecastLocalTime,
            forecastTemp,
            forecastHumidity,
            forecastWind,
            forecastWeatherDescription,
            forecastWeatherIcon,
          ]);
        
        }
                    
        console.log(forecastArray)
        /* This pushes the five day forecasts to the web page.  NOTE position [0]= Date, [5]= weather icon, [4]= weather description, [1] =temp, [2]= humidity and [3] = winds*/
        $("#1").html(
          "<h6>" +
            forecastArray[4][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[4][5] +
            '.png></img></h6><ul class="list-group"style="list-style-type: none"><li>' +
            forecastArray[4][4] +
            "</li><li>Temp: " +
            forecastArray[4][1] +
            "</li><li>Humidity: " +
            forecastArray[4][2] +
            "</li><li>Winds: " +
            forecastArray[4][3] +
            "</li></ul>"
        );

        $("#2").html(
          "<h6>" +
            forecastArray[12][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[12][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[12][4] +
            "</li><li>Temp: " +
            forecastArray[12][1] +
            "</li><li>Humidity: " +
            forecastArray[12][2] +
            "</li><li>Winds: " +
            forecastArray[12][3] +
            "</li></ul>"
        );

        $("#3").html(
          "<h6>" +
            forecastArray[20][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[20][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[20][4] +
            "</li><li>Temp: " +
            forecastArray[20][1] +
            "</li><li>Humidity: " +
            forecastArray[20][2] +
            "</li><li>Winds: " +
            forecastArray[20][3] +
            "</li></ul>"
        );

        $("#4").html(
          "<h6>" +
            forecastArray[28][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[28][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[28][4] +
            "</li><li>Temp: " +
            forecastArray[28][1] +
            "</li><li>Humidity: " +
            forecastArray[28][2] +
            "</li><li>Winds: " +
            forecastArray[28][3] +
            "</li></ul>"
        );

        $("#5").html(
          "<h6>" +
            forecastArray[36][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[36][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[36][4] +
            "</li><li>Temp: " +
            forecastArray[36][1] +
            "</li><li>Humidity: " +
            forecastArray[36][2] +
            "</li><li>Winds: " +
            forecastArray[36][3] +
            "</li></ul>"
        );
      });
    });
  }
});
