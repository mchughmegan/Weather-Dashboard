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

//add some plugins for day js
    //utc plugin and timezone plugin
    //make sure to add to html file

//function to display our search history list
    //clear out the html content from search history container using the variable
        //inner html
    //for loop starting at the end of our search history array and go to the beginning
        //for each item, create a button, set attr to button dynamically with js
        //set text content of the button to the name of the city
        //append the button to the search history container
        //most recently search cities at end of list

//function to update our history in local storage
    //when a city is searched, check to see if it exists in search history and if it does we dont need to do anything
    //otherwise, push this city into our search history array
    //then, set the item in local storage 
    //next, call on the function that displays the search history list

//function to get our search history from local storage
    //localstorage.get item of whatever we called /name of key
    //check if there is any search history
        //if so, parse it out of local storage and bring it back into our search history array
    //then, call function to display search history list

//function to display the current weather from the api
    //create variables for all of the different pieces of information we need for current weather
        //date, temp, humidity, url of the icon
    //create variables that create all of our html elements
        //give them attributes
        //give them text content
        //append all of the elements into the proper section of the html

//function to display one of our five day forecast cards
    //create variables for all of the different pieces of information we need for current weather
        //date, temp, humidity, url of the icon
    //create variables that create all of our html elements
        //give them attributes
        //give them text content
        //append all of the elements into the proper section of the html

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

//function that is going to render everything to the page
    //call our function that renders the current weather
    //call the function that is the duplication of the five day forecast card

//api calls

//function that fetches weather data from the 1. geo location endpoint and 
//2. uses the onecall endpoint to retrieve the data to display the current and forecast weather
    //two functions

//create a function that handles the submission of our search form

//create a function that handles when somebody clicks on one of the previously searched cities

//call on the function that gets our search history from local storage 

//add event listeners to our search button

//add event listener from when someone clicks on one of the previously searched cities





