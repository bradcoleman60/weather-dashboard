# weather-dashboard

# **Table of Contents**
1. [Description](#description)
2. [Testing](#testing)
3. [Technology Used and Credits](#technology-used-and-credits)
4. [About the Author](#about-the-author)
5. [License](#license)

[Visit the Deployed Site](https://bradcoleman60.github.io/weather-dashboard/)


# **Description**

The goal of this project was to create a website that allows a user to search weather by city name.  This was my first project that included interaction wih a third party API that retrieves data.  This project expanded my use of JavaScript including and API's.

When the page is loaded the page is set to show the current and a 5 day forecast data for New York city.  The page displays the current temperature, weather description, humidity, and wind speed.  It also shows an icon that depicts the weather condition. It Also displays the same measures for the next 5-day forecast.  

![screenshot](/shot1.png)

When the user searches for a city, then the weather is updated for the data retrieved from OpenWeather.org (https://openweathermap.org/api), again both for the current time and the 5-day forecast. 

![screenshot](/shot2.png)


# **Highlighted Code Example**

The following is code that I created that I would like to highlight.  This highlights the use of an API call (AJAX). Upon the response, I then parsed through the available data to get only the data that is needed.  Further, I had to update the website html with this data.  The code snippet below is the code to retrieve and display the current weather data for the selected city.  

```
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


```


# **Testing** 

To test to ensure the code rendered the desired output I iterated a series of tests to ensure that all acceptance criteria were met and documented completion below:

1. WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history

 - **Completed**.  The page loads with New York's current weather data.  When the user searches a city that data is then displayed and that city is saved to the search history.  

2. WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

 - **Completed**.  The current weather section includes the date, icon, temp, humidity and winds.  It also includes a short description of the weather.  

3. WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

 - **Completed**.  The 5 day forecast includes 5 days and includes date, icon, temp, humidity and winds.  It also includes a short description of the weather.

4. WHEN I click on a city in the search history THEN I am again presented with current and future conditions for that city

 - **Completed**.  The search history buttons recall the API to fetch the weather data.    

    
# **Technology Used and Credits**

I used many useful references in completing this project including the following.  In particular, I found the layout of the w3schools reference materials to be extremely intuitive and helpful.  They even have a "try me" feature where elements of code can be reviewed and tested. 

- [W3Schools - Java Script Code reference:](https://www.w3schools.com/js/default.asp)

# **About the Author**

My name is Brad Coleman. I am fairly new to web development but have considered it a hobby for several years and have hacked my way through learning various aspects including php, html and mysql.  I am currently enrolled in the Cal Berkeley Extension Web Development Boot camp and am excited to learn web development more holistically.  I have spent my earlier career working as a corporate controller / CPA.

- [Linkedin Profile](https://www.linkedin.com/in/brad-coleman-109529/)
- [GitHub Repos](https://github.com/bradcoleman60?tab=repositories)


# **License**

MIT License

Copyright (c) 2022 Brad Coleman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```