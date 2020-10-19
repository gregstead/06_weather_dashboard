
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
        var $cityInput = 'q=' + checkedCity($('#city-input').val());
        var API_Key = '&appid=' + 'f4330d7ea944cf18c17c360fd45ea7dd';
        var units = '&units=imperial'
        // Get current weather JSON for city from openweathermap 5 day forecast API

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + $cityInput + API_Key + units;

        // make ajax API call
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (res) {

            // response = res;
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

    var fDate = moment(response.list[0].dt_txt).format(' (MM/DD/YYYY)');
    $currentWeatherEl.append("<h5>" + response.city.name + fDate + "</h5>");
    // TODO get date and icon
    
    $currentWeatherEl.append("<p>" + 'Temperature: ' + response.list[0].main.temp + "</p>");
    $currentWeatherEl.append("<p>" + 'Humidity: ' + response.list[0].main.humidity + "</p>");
    $currentWeatherEl.append("<p>" + 'Wind speed: ' + response.list[0].wind.speed + "</p>");
};

// JSON => HTML
// Takes JSON response from openweather and renders five day weather HTML
function renderFiveDayForecase(response){
    // Empty div
    $fiveDayWeatherEl.empty();

    for (i = 1; i < 40; i += 8) {
        
        // Make DOM node for card

        $forecastCardContainer = $('<div>');
        $forecastCardContainer.attr('class','col s6 m3 l2')

        $forecastCard = $('<div>');
        $forecastCard.attr('class','card blue-grey hoverable');
        //  Card title - Date MM/DD/YYYY
        $forecastCardTitle = $('<h7>');
        var fDate = moment(response.list[i].dt_txt).format('MM/DD/YYYY');
        $forecastCardTitle.attr('class','white-text left-align').text(fDate);
        // Card content
        $forecastCardContent = $('<div>');
        $forecastCardContent.attr('class','card-content white-text')

        $forecastCardContent.append("<p>" + 'Temp: ' + response.list[i+1].main.temp + "</p>");
        $forecastCardContent.append("<p>" + 'Humidity: ' + response.list[i+1].main.humidity + "</p>");

        $forecastCard.append($forecastCardTitle);
        $forecastCard.append($forecastCardContent);

        $forecastCardContainer.append($forecastCard);

        // Add card node to DOM
        $fiveDayWeatherEl.append($forecastCardContainer);

    };
};

// Unix timestamp => Formatted date string
function unixToDate(timestamp) {
    console.log('nothing');
}
