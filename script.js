
// Global variables
var $currentWeatherEl = $('#current-weather-element');
var $fiveDayWeatherEl = $('#five-day-weather-element');
var cityName;
var cityArr;
var response;


// Click handler
$(document).on('click', function (event) {
    // Prevent form from rendering page
    event.preventDefault();
    // Search button handler
    if (event.target.matches('#search-button')) {
        // Query params
        // Get city name from text area
        // TODO: Authenticate city input
        var $cityInput = 'q=' + $('#city-input').val();
        var API_Key = '&appid=' + 'f4330d7ea944cf18c17c360fd45ea7dd';
        var units = '&units=imperial'
        // Get current weather JSON for city from openweathermap API

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + $cityInput + API_Key + units;

        // make ajax API call
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (res) {
            // <!-- City, temp, humidity, wind speed, UV index, weather icon -->

            response = res;
            // Render page elements from response
            renderCurrentWeather(res);
            // Render 5 day forecast 
            renderFiveDayForecase(res);
        })

    }
    // City button handler
    else if (event.target.matches('#city-button')) {
        console.log(event);
    }
})

// JSON => HTML
// Takes JSON response from openweather and renders current weather HTML
function renderCurrentWeather(response) {

    $currentWeatherEl.append("<p>" + response.city.name + "</p>");
    // TODO get date and icon
    $currentWeatherEl.append("<p>" + response.list[0].main.temp + "</p>");
    $currentWeatherEl.append("<p>" + response.list[0].main.humidity + "</p>");
    $currentWeatherEl.append("<p>" + response.list[0].wind.speed + "</p>");
};

function renderFiveDayForecase(response){
    for (i = 0; i < 5; i++) {
        // Card containing Date, icon, temp, humidity
        $forecastCard = $('<div>');

        $forecastCard.append("<p>" + response.list[i+1].dt + "</p>");
        $forecastCard.append("<p>" + response.list[i+1].main.temp + "</p>");
        $forecastCard.append("<p>" + response.list[i+1].main.humidity + "</p>");

        $fiveDayWeatherEl.append($forecastCard);

    };
};


// String => Object
// Get current weather JSON for city from openweathermap API


// Make node elements

// write node elements to page