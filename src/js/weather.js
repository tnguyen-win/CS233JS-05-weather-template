// same as previous lab
import './general';
// without this I get an error at runtime.  babel 7 and preset env.
const regeneratorRuntime = require("regenerator-runtime");

// my ES6 modules export functions that you need
// parseForecast is the ONLY export (default) from weatherParsing.js
import parseForecast from './weatherParsing';
// getWeekday and getDate are named exports (functions) from dates.js
import {getWeekday, getDate} from './dates';

// sample openweathermap weather api call
//https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=43.9698&lon=-123.2006&appid=e366707bc2ea3e949fb1c0a16ce76d59
// sample openweathermap geolocation api call
// http://api.openweathermap.org/geo/1.0/zip?zip=97405,US&appid=e366707bc2ea3e949fb1c0a16ce76d59
 
/* Create a class called Weather
- Part 1 - Retrieve the lat and lng for zipcode when the user clicks the button
  - Create the constructor
    - initialize instance variables for the "state" of the app and the ajax call
        this.state = {
          zipcode: "",
          city: {},
          forecast: [], 
          selectedDate: null
        };
    this.weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
    this.geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
    // replace my api key with yours
    this.apikey = "appid=e366707bc2ea3e949fb1c0a16ce76d59";
    - initialize instance variables for UI elements
        the form
        the zipcode input element
        the weather list div
        the current day div
    - write the stub of a method onFormSubmit
    - bind the class to onFormSubmit
    - add a submit handler to the form that calls onFormSubmit

  - Write the first version of the method onFormSubmit.  It should
    - prevent the form from being sumbitted to the server
    - get the zip code from the UI and put it in a variable
    - call fetch.  The parameter is a url formatted in the example above. 
      It is an async call and returns a promise.
      - when the response comes back parse it as json
      - when the data comes back the data will give you 
        city, lat and lng based on the zipcode THEN
        - set the city.name in the state object instance variable
        - set the city.lat in the state object
        - set the city.lng in the state object
        - console.log the state object instance variable
  - Don't forget to instantiate the a weather object!
END OF PART 1 - TEST AND DEBUG YOUR APP

- Part 2 - Add a second ajax call to openweathermap to get weather information
  for the zipcode.  The data that comes back is for 5 days in 3 hour increments.
  The parseForecast function will give you back an array of 4 daily forecasts.
  - Edit the method onFormSubmit
      - replace the console.log of the state
        with an additional call to fetch
        - call fetch with the url for openweather map.  The parameter is a url formatted like the example. 
          - when the response comes back THEN parse the json
          - when that finishes THEN
            - set the timezoneOffset in the state object instance variable
            - set the forecast in the state object instance variable to the 
              return from calling parseForecast.  Use as params data.list and this.state.timezoneOffset.
            - console.log the forecast
            - clear the zipcode from the UI 
END OF PART 2 - TEST AND DEBUG YOUR APP

- Part 3 - Write the first version of method renderWeatherList.  It writes the forecast data to the page
  - Write a stub of renderWeatherListItem.  This method returns a template literal containing the html 
    for the weather for ONE day.  It gets called in renderWeatherList.  It has 2 parameters a 
    forecastDay and an index.  The forecastDay is a js object from the weather api.
    - in the body of the method console.log both the forecastDay and the index
  - Write a sub of renderWeatherList.  It has forecastDays (which is 7 element forcast array) 
    as a parameter.
    - in the body of the method console.log the value of forecastDays.
  - Edit the constructor to bind the class to the method renderWeatherList
  - call renderWeatherList in onFormSubmit AFTER BOTH ajax calls have completed.  
    Pass this.state.forecast as a parameter.
END OF PART 3 - TEST AND DEBUG YOUR APP

- Part 4 - Format ONE weather list item and the weather list as a whole
  - Edit the body of the method renderWeatherListItem
    - Format the weather information for one day on the html page.  At a minimum it should include
      - the month and day as well as the weekday
      - the high and low temperatures for that day
      - the element should be styled with weather-list-item as well
    - CUT the html for ONE day from your html page into the body of your method.
      - Enclose the html in ``.
      - Replace the hardcoded month and day, weekday, high and low temperatures 
        with template strings that use the properties of the forecastDay object
      - Return the template literal 
  - Edit the body of the method renderWeather list.  It should
    - Create the html for each of the weather list items.  Use the array method map to do this.
      const itemsHTML = forecastDays.map((forecastDay, index) => this.renderWeatherListItem(forecastDay, index)).join('');
    - Set the inner html of the weatherList element on the page to 
      - a div element styled with weather-list flex-parent
      - that contains the itemsHTML from above
END OF PART 4 - TEST AND DEBUG YOUR APP

- Part 5 - Display weather details when the user clicks one weather list item
  - Write the method renderCurrentDay.  It takes the index of the day as it's parameter.
    - Format the detailed weather information for the selected day on the html page. Include at least
      - identifying information for the city as well as the date
      - description and icon for the weather
      - temperatures throughout the day
      - humidity and wind information
    - CUT the html for the weather details and paste it into the body of your method
      - Enclose the html in ``.
      - Replace the hardcoded text with data.  The data is in the state instance variable.
      - Set the innerhtml property of the currentDay element on the page
  - Add a click event handler to each of the weather list items 
    - add a loop to the end of the renderWeatherList method that adds the event handler
    - you'll need to declare and initialize a variable forecastElements that contains
      an array of elements that have the class .weather-list-item
    - you'll have to bind the method renderCurrentDay to both the class and the index of the item
      forecastElements[i].onclick = this.renderCurrentDay.bind(this, i)
  - Write the method clearCurrentDay.  It sets the inner html property of the currentDay element to ""
  - Call clearCurrentDay at the end of onFormSubmit where you clear the zipcode.  
END OF PART 5 - TEST AND DEBUG YOUR APP
*/



/*  Part 1 - calling get location
    fetch(`${this.geoUrl}zip=${this.state.zipcode},US&${this.apikey}`)
      .then(response => response.json())
      .then(data => {
        this.state.city.name = data.name;
        this.state.city.lat = data.lat;
        this.state.city.lng = data.lon;
        console.log(this.state.city);
      })
      .catch(error => {
        alert('There was a problem getting location information!')
      });
*/
