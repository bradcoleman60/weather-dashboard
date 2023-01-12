# weather-dashboard

# **Table of Contents**
1. [Description](#description)
2. [Testing](#testing)
3. [Technology Used and Credits](#technology-used-and-credits)
4. [Learnings](#learnings)
5. [About the Author](#about-the-author)
6. [License](#license)

[Visit the Deployed Site](https://bradcoleman60.github.io/weather-dashboard/)


# **Description**

The goal of this project was to create a timed multiple choice quiz on the topic of JavaScript.  This project expanded my use of JavaScript including:
1. using localStorage to store the scores of quizzes, 
2. using querySelectors to change the text on the HTML page, 
3. using SetAttribute to change how elements of the page look and react, 
4. changing CSS on the hover of an HTML element, 
5. the use of a FOR loop to generate a table and then the use of inner.html to push the content of the table to the webpage 
6. the use of an array within an array such that I had configure to indexes to retrieve the desired value, 
7. the use of the setInterval method to create a countdown timer that was decremented 5 seconds if the visitor submitted an incorrect answer.  

When the visitor arrives at the page, there is a welcome message and a prominent "Start Quiz" button that, when clicked starts the quiz and the timer. Below is a screen shot of the opening page. 

![screenshot](/screen_shot_1.png)

After the quiz is started the question box is populated with the multiple-choice questions.  I used an html form along with an input type equal to "radio".   Although I considered using a check-box input type, I learned that using a radio input type only one option can be selected, whereas a check-box input type, multiple items can be selected.  Ultimately,  I set the display of the radio selector to "none" in my css and applied css to allow the user to merely select the text of the answer desired.  Note in the screen shot below, that the counter is in the upper right-hand corner of the header bar.    

![screenshot](/screen_shot_2.png)

At the completion of the quiz, which is defined as either the time limit of 90 seconds is reached, or all of the questions have been answered, the users have the option to enter they initials and store their score in local storage. If they choose not to enter their initials, I provided an additional button to display the current leader board as shown in the following screenshot.

![screenshot](/screen_shot_4.png)

After the users enter their initials or hit the button to show the leaderboard that is stored in local storage, the leaderboard is displayed as shown in the following screenshot.  I added a calculated field in the table to show the correct answers as a percentage of the total number of questions.  Additionally, I included a button below the table that allows the users to retake the quiz. 

![screenshot](/screen_shot_3.png)

# **Highlighted Code Example**

The following is code that I created that I would like to highlight.   

```



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


# **Learnings**

I had 2 major learnings on the project:

1. Use of Radio Button Input - When researching how to facilitate the user to select one of four possible answers, I came across the input types of check-box and radio.  I initially planned to have the user check the answer and then hit a submit button.  This did not work as the check-box input allows for more than one item to be selected.  So, I moved to using a radio button as this input only allows one item to be selected.  Once I was able to get the basic functionality of the question box to appear and to iterate through the series of questions, I observed that the user experience was "clunky" as I was requiring the user to perform two mouse clicks to answer a question. After experimenting and researching I was able to use CSS to NOT display the radio button and then use a label around the radio button with an unique id element to essentially turn the entire answer into a clickable icon. As such, the user only needs to click the answer to submit the answer. 

2. LocalStorage - This was the first time working with localStorage and was previously unaware that such feature was available.  It took me some time to iterate how to set and get data to and from localStorage.  This required retrieving any existing localStorage values and then appending (or pushing) new values into that string before saving (or setting) back to localStorage.   

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