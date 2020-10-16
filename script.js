// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Get city name -- Input data from DOM

// String => Object
function getCityJSON(city_name) {
    var API_Key = 'f4330d7ea944cf18c17c360fd45ea7dd';
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + API_Key;
    
    // make ajax API call
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then( function (res) {
        console.log(res);
    })
}

// Make node elements

// write node elements to page