
var currentWeather;
var $currentWeatherEl = $('#current-weather-element');


// Click handler
$(document).on('click', function (event) {
    // Prevent form from rendering page
    event.preventDefault();
    // Search button handler
    if (event.target.matches('#search-button')) {
        // Get city name from text area
        var $cityInput = $('#city-input').val();
        // Get current weather JSON for city from openweathermap API

        var API_Key = 'f4330d7ea944cf18c17c360fd45ea7dd';
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + $cityInput + "&appid=" + API_Key;

        // make ajax API call
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (res) {
            // // var res = JSON.parse(res);
            // var $name = $('<h2>').text(res.name);
            // var $humidity = $('p').text("Humidity: " + res.main.humidity);
            // var $windSpeed = $('p').text("Wind speed: " + res.wind['speed']);
            // var $uvIndex = $('p').text("UV Index: " + '')

            // $currentWeatherEl.append($name, $humidity,$windSpeed,$uvIndex);

            // success!
            console.log(res);
        })
        // Render 5-day forecast

    }
    // City button handler
    else if (event.target.matches('#city-button')) {
        console.log(event);
    }
})

// String => Object
// Get current weather JSON for city from openweathermap API


// Make node elements

// write node elements to page