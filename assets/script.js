var APIkey = "05c258fa745fbc728c4ebf2eb6a9a431";
var queryURL = "https://api.openweathermap.org";
var searchHistory = [];
//create more variables that reference html elements
//search form
//search input
//current weather container
//forecast container
//search history container
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#cityInput");
var currentWeather = document.querySelector("#today");
var fiveDay = document.querySelector("#forecast");
var oldCities = document.querySelector("#clickCity");
var searchButton = document.querySelector("#mainSearch");
var lat = " ";
var long = " ";
var cityHistory = " ";
var temp = " ";
var wind = " ";
var humidity = " ";
var temp0 = " ";
var humidity0 = " ";
var wind0 = " ";
var currentForecast = " ";
var data;


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
function displayCities() {
    oldCities.innerHTML = "";
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-controls", "today forecast");
        btn.classList.add("history-btn", "btn-history");
        btn.setAttribute("data-search", searchHistory[i]);
        btn.textContent = searchHistory[i];
        btn.setAttribute("value", searchHistory[i]);
        oldCities.append(btn);
    }

};

//function to update our history in local storage
//when a city is searched, check to see if it exists in search history and if it does we dont need to do anything
//otherwise, push this city into our search history array
//then, set the item in local storage 
//next, call on the function that displays the search history list

function updateHistory(searchInput) {
    if (searchHistory.indexOf(searchInput) !== -1) {
        return;
    }
    searchHistory.push(searchInput);
    localStorage.setItem("city-history", JSON.stringify(searchHistory));
    displayCities();
};

//function to get our search history from local storage
//localstorage.get item of whatever we called /name of key
//check if there is any search history
//if so, parse it out of local storage and bring it back into our search history array
//then, call function to display search history list

function getHistory() {
    var cityHistory = localStorage.getItem("city-history");
    if (cityHistory) {
        searchHistory = JSON.parse(cityHistory);
    }
    displayCities();
};

//function to display the current weather from the api
//create variables for all of the different pieces of information we need for current weather
//date, temp, humidity, url of the icon
//create variables that create all of our html elements
//give them attributes
//give them text content
//append all of the elements into the proper section of the html

function showCurrent() {
    console.log(city);
    var date = dayjs().format("M/D/YYYY");
    var iconURL = 'https://openweathermap.org/img/wn/' + currentForecast.current.weather[0].icon + '@2x.png';
    console.log(currentForecast.current.weather[0].icon);
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
    heading.innerHTML = `${city} ${date} <img src = ${iconURL}>`;
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind: ${wind} mph`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    cardBody.append(heading, tempEl, windEl, humidityEl);
    currentWeather.innerHTML = "";
    currentWeather.append(card);
};

//function to display five day forecast cards
//create variables for all of the different pieces of information we need for current weather
//date, temp, humidity, url of the icon
//create variables that create all of our html elements
//give them attributes
//give them text content
//append all of the elements into the proper section of the html
//function that duplicates the forecast process five times
//create variables using day js for our start and end dates
//create variables that will create our html elements for the heading of our section 
//for loop that is going to loop through from the start date to the end date and for each date 

function showFiveForecast() {
    fiveDay.innerHTML = " ";
    for (let i = 0; i < 5; i++) {
        console.log(currentForecast);
        var temp = currentForecast.daily[i].temp.max;
        var wind = currentForecast.daily[i].wind_speed;
        var humidity = currentForecast.daily[i].humidity;
        let date = dayjs.unix(currentForecast.daily[i].dt).format("M/D/YYYY");
        var iconURL = 'https://openweathermap.org/img/wn/' + currentForecast.daily[i].weather[0].icon + '@2x.png';
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
        heading.innerHTML = `${date} <img src = ${iconURL}>`;
        tempEl.textContent = `High Temp: ${temp}°F`;
        windEl.textContent = `Wind: ${wind} mph`;
        humidityEl.textContent = `Humidity: ${humidity}%`;
        cardBody.append(heading, tempEl, windEl, humidityEl);
        fiveDay.append(card);
    };
}

//function that is going to render everything to the page
//call our function that renders the current weather
//call the function that is the duplication of the five day forecast card

function displayWeather() {
    showCurrent();
    showFiveForecast();
};

//api calls
//function that fetches weather data from the 1. geo location endpoint and 
//2. uses the onecall endpoint to retrieve the data to display the current and forecast weather
//two functions
function coordApi(searchInput) {
    //get coordinates 
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var getCoord = queryURL + '/geo/1.0/direct?q=' + searchInput + '&limit=3' + '&appid=' + APIkey;
    fetch(getCoord)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data[0].lat;
            console.log(lat);
            long = data[0].lon;
            console.log(long);
            city = data[0].name;
            weatherApi();
        })
}

function weatherApi() {
    var getCurrent = queryURL + '/data/3.0/onecall?' + 'lat=' + lat + '&lon=' + long + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + APIkey;
    console.log(city);
    fetch(getCurrent)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentForecast = data;
            temp = data.current.temp;
            wind = data.current.wind_speed;
            humidity = data.current.humidity;
            temp0 = data.daily[0].temp.max;
            wind0 = data.daily[0].wind_speed;
            humidity0 = data.daily[0].humidity;
            displayWeather();
        })
}

//create a function that handles the submission of our search form
function searchSubmit(event) {
    event.preventDefault();
    console.log(searchInput.value);
    coordApi(searchInput.value);
    updateHistory(searchInput.value);
};

//create a function that handles when somebody clicks on one of the previously searched cities

function previousClick(event) {
    event.preventDefault();
    var btn = event.target;
    var search = btn.getAttribute("data-search");
    console.log(search);
    coordApi(search);
}

//call on the function that gets our search history from local storage 
getHistory();

//add event listeners to our search button
$('#mainSearch').on('click', searchSubmit);

$(searchInput).keypress(function (event) {
    var keyPress = (event.keyTouch ? event.keyTouch : event.which);
    if (keyPress == '13') {
        $('#mainSearch').click(searchSubmit(event));
    }
});

//add event listener from when someone clicks on one of the previously searched cities
$('#clickCity').on('click', previousClick);




