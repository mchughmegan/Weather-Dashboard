var APIkey = "05c258fa745fbc728c4ebf2eb6a9a431";
var city;
var state;
var country;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;

fetch(queryURL);

console.log(queryURL);