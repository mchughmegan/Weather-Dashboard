var APIkey = "05c258fa745fbc728c4ebf2eb6a9a431";
var queryURL = "http://api.openweathermap.org";
var searchHistory = [];
//create more variables that reference html elements
    //search form
    //search input
    //current weather container
    //forecast container
    //search history container
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#city-input");
var currentWeather = document.querySelector("#today");
var fiveDay = document.querySelector("#forecast");
var oldCities = document.querySelector("#clickCity");
var searchButton = document.querySelector("#mainSearch");

//add some plugins for day js
    //utc plugin and timezone plugin
    //make sure to add to html file
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//function to display our search history list
    //clear out the html content from search history container using the variable
        //inner html
    //for loop starting at the end of our search history array and go to the beginning
        //for each item, create a button, set attr to button dynamically with js
        //set text content of the button to the name of the city
        //append the button to the search history container
        //most recently search cities at end of list
function displaySearch() {
    oldCities.innerHTML="";
    for (var i = searchHistory.length-1; i>=0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-controls", "today forecast");
        btn.classList.add("history-btn", "btn-history");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent=searchHistory[i];
        oldCities.append(btn);
    }
    
};

//function to update our history in local storage
    //when a city is searched, check to see if it exists in search history and if it does we dont need to do anything
    //otherwise, push this city into our search history array
    //then, set the item in local storage 
    //next, call on the function that displays the search history list

function updateHistory(search) {
    if (searchHistory.indexOf(search)!== -1) {
        return;
    }
    searchHistory.push(search);
    localStorage.setItem("city-history", JSON.stringify(searchHistory));
    displaySearch();
};

//function to get our search history from local storage
    //localstorage.get item of whatever we called /name of key
    //check if there is any search history
        //if so, parse it out of local storage and bring it back into our search history array
    //then, call function to display search history list

function getHistory(){
    var cityHistory = localStorage.getItem("city-history");
    if (cityHistory) {
        searchHistory=JSON.parse(cityHistory);
    }
    displaySearch();
};

//function to display the current weather from the api
    //create variables for all of the different pieces of information we need for current weather
        //date, temp, humidity, url of the icon
    //create variables that create all of our html elements
        //give them attributes
        //give them text content
        //append all of the elements into the proper section of the html

function showCurrent(city,weather){
    var date = dayjs().format("M/D/YYYY");
    var temp = weather.main.temp;
    var wind = weather.wind.speed;
    var humidity = weather.main.humidity;
    var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement("h2");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p"); 
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p"); 
    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);
    heading.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text"); 
    windEl.setAttribute("class", "card-text"); 
    humidityEl.setAttribute("class", "card-text"); 
    weatherIcon.setAttribute("src", iconURL);
    weatherIcon.setAttribute("class", "weather-img");
    heading.append(weatherIcon);
    heading.textContent=`${city} ${date}`;
    tempEl.textContent=`Temp: ${temp}F`;
    windEl.textContent=`Wind: ${wind}mph`;
    humidityEl.textContent=`Humidity: ${humidity}%`;
    cardBody.append(heading, tempEl, windEl, humidityEl);
    currentWeather.innerHTML="";
    currentWeather.append(card);
};

//function to display one of our five day forecast cards
    //create variables for all of the different pieces of information we need for current weather
        //date, temp, humidity, url of the icon
    //create variables that create all of our html elements
        //give them attributes
        //give them text content
        //append all of the elements into the proper section of the html

function showOneForecast(forecast){
    //forecast.main.temp
    var date = dayjs().format("M/D/YYYY");
    var temp = forecasat.main.temp;
    var wind = forecast.wind.speed;
    var humidity = forecast.main.humidity;
    var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement("h2");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement("p"); 
    var windEl = document.createElement("p");
    var humidityEl = document.createElement("p"); 
    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);
    heading.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text"); 
    windEl.setAttribute("class", "card-text"); 
    humidityEl.setAttribute("class", "card-text"); 
    weatherIcon.setAttribute("src", iconURL);
    weatherIcon.setAttribute("class", "weather-img");
    heading.append(weatherIcon);
    heading.textContent=`${city} ${date}`;
    tempEl.textContent=`Temp: ${temp}F`;
    windEl.textContent=`Wind: ${wind}mph`;
    humidityEl.textContent=`Humidity: ${humidity}%`;
    cardBody.append(heading, tempEl, windEl, humidityEl);
    fiveDay.innerHTML="";
    fiveDay.append(card);
};

//function that duplicates the above process five times
    //create variables using day js for our start and end dates
    //create variables that will create our html elements for the heading of our section
        //try to do them here and not html
    //set attributes for the above
    //set text content as well
    //clear out inner html of our forecast container
    //append our variables from line 54
    //for loop that is going to loop through from the start date to the end date and for each date 
    //it's going to call our function that renders the five day forecast card

function showFiveForecast(){

};

//function that is going to render everything to the page
    //call our function that renders the current weather
    //call the function that is the duplication of the five day forecast card

function displayWeather() {

};

//api calls
function callApi(searchInput) {
    queryURL = queryURL + '/data/2.5/weather?q=' + searchInput + APIkey;
  
    fetch(queryURL)
    //   .then(function (response) {
    //     if (!response.ok) {
    //       throw response.json();
    //     }
  
    //     return response.json();
    //   })
    //   .then(function (locRes) {
    //     // write query to page so user knows what they are viewing
    //     resultTextEl.textContent = locRes.search.query;
  
    //     console.log(locRes);
  
    //     if (!locRes.results.length) {
    //       console.log('No results found!');
    //       resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
    //     } else {
    //       resultContentEl.textContent = '';
    //       for (var i = 0; i < locRes.results.length; i++) {
    //         printResults(locRes.results[i]);
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //   });
  }

//function that fetches weather data from the 1. geo location endpoint and 
//2. uses the onecall endpoint to retrieve the data to display the current and forecast weather
    //two functions

//create a function that handles the submission of our search form
function searchSubmit(event){
    event.PreventDefault();
    console.log("worked");
};

//create a function that handles when somebody clicks on one of the previously searched cities
function previousButton(){

};
//call on the function that gets our search history from local storage 
getHistory();

//add event listeners to our search button
searchButton.addEventListener('submit', searchSubmit);
// searchButton.onclick(searchSubmit);
//add event listener from when someone clicks on one of the previously searched cities
oldCities.addEventListener('click', previousButton);




