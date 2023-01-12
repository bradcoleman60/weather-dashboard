$(document).ready(function () {
//   var currentDate = dayjs().format("MM/DD/YYYY HH");
  var citiesSaved = [];
  citiesSaved = JSON.parse(localStorage.getItem("citiesSavedStringify"));
  localStorage. clear();
  // console.log(citiesSaved)

  displaySearchHistory();

  console.log(citiesSaved.length);

  function displaySearchHistory() {
    callApi()
    if (citiesSaved === null) citiesSaved = []
    console.log(citiesSaved.length);
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

  
    $("button").on("click", function(event){
        city = $(this).text()
        console.log(city)
        callApi(city)
    })
    
//   }
  
  
  /* This variable is the city to search weather on.*/
  var city = "New York";
  callApi(city)

  $("#submitBtn").on("click", function (event) {
    event.preventDefault();
    city = $("#inputCity").val();
    callApi(city);

    console.log(citiesSaved);
    
    citiesSaved.push(city);
    localStorage.setItem("citiesSavedStringify", JSON.stringify(citiesSaved));
    displaySearchHistory();

  });

  

  var timeZone = "";

  //AJAX call to both current weather API and forecasted API.
  function callApi(city) {
    var apiKey = "d5b31dfbb222fbc297e5a2174bec8cc3";
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=imperial";
    var queryUrl1 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=imperial";

    var timeZone = "";
    $.ajax({
      url: queryUrl,
      method: "GET",
      cache: false,
    }).then(function (response) {
      // console.log(response)
      var city = response.name;
      var currentTemp = Math.round(response.main.temp);
      var currentHumidity = response.main.humidity;
      var currentWind = Math.round(response.wind.speed);
      var currentDate = dayjs().format("MM/DD/YYYY");
      timeZone = response.timezone;
      var currentWeatherIcon = response.weather[0].icon;
      var currentWeatherDescription = response.weather[0].description;
      var imageLink =
        "http://openweathermap.org/img/wn/" + currentWeatherIcon + ".png";

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

      /* This is the AJAX call to obtain the current weather for the selected city*/

      $.ajax({
        url: queryUrl1,
        method: "GET",
        cache: false,
      }).then(function (response1) {
        var forecastData = response1.list;
        var forecastArray = [];
        var forecastArrayDateOnly = [];

        // console.log(forecastData)

        for (i = 0; i < forecastData.length; i++) {
          var forecastGMT = dayjs(forecastData[i].dt_txt).format("MM/DD/YYYY");
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
          forecastArrayDateOnly.push(forecastLocalTime);
        }
        // console.log(timeZone)
        // console.log(response1.city.name)
        // console.log(forecastArray)

        /* This variable and for loop obtain the first position in the forecast array that is a new day in the Input City*/
        var arrayCounter = 0;

        for (i = 0; i < forecastArrayDateOnly.length; i++) {
          if (dayjs(forecastArrayDateOnly[i]) <= dayjs(currentDate)) {
            arrayCounter = arrayCounter + 1;
          }
        }
        // console.log(arrayCounter)
        // console.log(currentDate)
        var day1 = 4;
        var day2 = 12;
        var day3 = 20;
        var day4 = 28;
        var day5 = 36;

        // console.log(forecastArray[day1])
        // console.log(forecastArray[day2])
        // console.log(forecastArray[day3])
        // console.log(forecastArray[day4])
        // console.log(forecastArray[day5])

        /* This pushes the five day forecasts to the web page*/
        $("#1").html(
          "<h6>" +
            forecastArray[day1][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[day1][5] +
            '.png></img></h6><ul class="list-group"style="list-style-type: none"><li>' +
            forecastArray[day1][4] +
            "</li><li>Temp: " +
            forecastArray[day1][1] +
            "</li><li>Humidity: " +
            forecastArray[day1][2] +
            "</li><li>Winds: " +
            forecastArray[day1][3] +
            "</li></ul>"
        );

        $("#2").html(
          "<h6>" +
            forecastArray[day2][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[day2][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[day2][4] +
            "</li><li>Temp: " +
            forecastArray[day2][1] +
            "</li><li>Humidity: " +
            forecastArray[day2][2] +
            "</li><li>Winds: " +
            forecastArray[day2][3] +
            "</li></ul>"
        );

        $("#3").html(
          "<h6>" +
            forecastArray[day3][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[day3][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[day3][4] +
            "</li><li>Temp: " +
            forecastArray[day3][1] +
            "</li><li>Humidity: " +
            forecastArray[day3][2] +
            "</li><li>Winds: " +
            forecastArray[day3][3] +
            "</li></ul>"
        );

        $("#4").html(
          "<h6>" +
            forecastArray[day4][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[day4][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[day4][4] +
            "</li><li>Temp: " +
            forecastArray[day4][1] +
            "</li><li>Humidity: " +
            forecastArray[day4][2] +
            "</li><li>Winds: " +
            forecastArray[day4][3] +
            "</li></ul>"
        );

        $("#5").html(
          "<h6>" +
            forecastArray[day5][0] +
            "<img src=http://openweathermap.org/img/wn/" +
            forecastArray[day5][5] +
            '.png></img></h6><ul class="list-group" style="list-style-type: none"><li>' +
            forecastArray[day1][4] +
            "</li><li>Temp: " +
            forecastArray[day1][1] +
            "</li><li>Humidity: " +
            forecastArray[day5][2] +
            "</li><li>Winds: " +
            forecastArray[day5][3] +
            "</li></ul>"
        );
      });
    });
  }
});
