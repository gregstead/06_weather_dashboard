
// Global variables
var $currentWeatherEl = $('#current-weather-element');
var $fiveDayWeatherEl = $('#five-day-weather-element');
var $cityButtonEl = $('#city-button-element');
var cityName;
var cityArr;

if (localStorage.getItem('recent_searches')) {
    cityArr = JSON.parse(localStorage.getItem('recent_searches'));
    renderCityArr();
} else {
    cityArr = [];
}

// Click handler
$(document).on('click', function (event) {
    // Prevent form from rendering page
    event.preventDefault();
    // Search button handler
    if (event.target.matches('#search-button')) {
        // Query params
        // Get city name from text area
        var cityInput = checkedCity($('#city-input').val());

        // Query API and render results
        queryOpenWeather(cityInput);

        // City button handler
    } else if (event.target.matches('.city-button')) {
        // Query params
        // Get city name from button
        var cityInput = $(event.target).val();

        // Query API and render results
        queryOpenWeather(cityInput);
    }
})

// String => HTML to DOM
// Takes a city input value, queries OpenWeather API and renders respective HTML nodes from response
function queryOpenWeather(cityInput) {

    var cityQuery = 'q=' + cityInput;
    var API_Key = '&appid=' + 'f4330d7ea944cf18c17c360fd45ea7dd';
    var units = '&units=imperial'
    // Get current weather JSON for city from openweathermap 5 day forecast API

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + cityQuery + API_Key + units;

    // make ajax API call
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (res) {

        // Render current weather data from response
        renderCurrentWeather(res);
        // Second call to get and render UV data
        getUVIndex(res);
        // Render 5 day forecast 
        renderFiveDayForecase(res);
        // Prepend city name to city array
        cityArr.unshift(cityInput);
        // Render city buttons
        renderCityArr();
    })
}


// String => String
// Checks city name input against valid city ID
function checkedCity(cityNameString) {
    // Compare city name against list of checked names
    return cityNameString;
};

// JSON => HTML
// Takes JSON response from openweather and renders current weather HTML
function renderCurrentWeather(response) {
    // Empty div
    $currentWeatherEl.empty();

    // Render formatted date with Moment.js
    var fDate = moment(response.list[0].dt_txt).format(' (MM/DD/YYYY)');
    $currentWeatherEl.append('<h5>' + response.city.name + fDate + '</h5>')
    $currentWeatherEl.append('<img src="' + getOpenWeatherIconURL(response, 0) + '" />');
    $currentWeatherEl.append('<p>' + 'Temperature: ' + response.list[0].main.temp + '</p>');
    $currentWeatherEl.append('<p>' + 'Humidity: ' + response.list[0].main.humidity + ' %' + '</p>');
    $currentWeatherEl.append('<p>' + 'Wind speed: ' + response.list[0].wind.speed + '</p>');
};

// JSON => HTML
// Takes UV index response and renders it
function renderUVIndex(response) {
    var UV_Index = response.value;

    $currentWeatherEl.append('<p>' + 'UV Index: ' + UV_Index + '</p>');
}

// JSON => String
// Takes response from OpenWeather call, makes a second request for UV data
function getUVIndex(response) {

    var lat = 'lat=' + response.city.coord.lat;
    var lon = '&lon=' + response.city.coord.lon;
    var API_Key = '&appid=' + 'f4330d7ea944cf18c17c360fd45ea7dd';
    var count = '&cnt=' + 1;
    // Get current weather JSON for city from openweathermap 5 day forecast API

    var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?' + lat + lon + count + API_Key;

    // make ajax API call
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (res) {
        renderUVIndex(res);
    })
}

// Object => String
// Takes an OpenWeather API response and returns a URL for the icon
function getOpenWeatherIconURL(response, index) {
    return 'http://openweathermap.org/img/wn/' + response.list[index].weather[0].icon + '@2x.png';
}

// JSON => HTML
// Takes JSON response from openweather and renders five day weather HTML
function renderFiveDayForecase(response) {
    // Empty div
    $fiveDayWeatherEl.empty();
    // Response is in 3-hour increments, so 24/3 = 8, 8* (5 days) = 40
    // reponse[0] is current day's weather, so i=7
    for (i = 7; i < 41; i += 8) {

        // Make DOM node for card
        // TO DO - check response for icons
        $forecastCardContainer = $('<div>');
        $forecastCardContainer.attr('class', 'col s6 m3 l2')

        $forecastCard = $('<div>');
        $forecastCard.attr('class', 'card blue-grey hoverable');
        $forecastCard.attr('style', 'width: max-content;')
        //  Card title - Date MM/DD/YYYY
        $forecastCardTitle = $('<h7>');
        var fDate = moment(response.list[i].dt_txt).format('MM/DD/YYYY');
        $forecastCardTitle.attr('class', 'white-text left-align').text(fDate);
        // Card content
        $forecastCardContent = $('<div>');
        $forecastCardContent.attr('class', 'card-content white-text my-card');
        // $forecastCardContent.attr('style','font-size: 11px;');

        $forecastCardContent.append('<img src="' + getOpenWeatherIconURL(response, i) + '" style="width:40px; height=40px;" />');
        $forecastCardContent.append("<p>" + 'Temp: ' + response.list[i].main.temp + "</p>");
        $forecastCardContent.append("<p>" + 'Humidity: ' + response.list[i].main.humidity + ' %' + "</p>");

        $forecastCard.append($forecastCardTitle);
        $forecastCard.append($forecastCardContent);

        $forecastCardContainer.append($forecastCard);

        // Add card node to DOM
        $fiveDayWeatherEl.append($forecastCardContainer);

    };
};

function renderCityArr() {
    // Clear div
    $cityButtonEl.empty();

    // Loop through cityArray and create city buttons
    for (var i = 0; i < cityArr.length; i++) {
        var $cityButton = $('<button>');
        $cityButton.text(cityArr[i]);
        $cityButton.attr('class', 'btn city-button');
        $cityButton.attr('value', cityArr[i]);
        $cityButtonEl.append($cityButton).append('<br>');
    };

    localStorage.setItem('recent_searches', JSON.stringify(cityArr));
};