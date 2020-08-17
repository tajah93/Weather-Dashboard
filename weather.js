// current API
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

//5 day
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

//uv
//http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
//appid - personal API key

//lat, lon - coordinates of the location of your interest (latitude/longitude)


//Function for current weather 
function currentWeather(city) {

    var APIkey = "c1ba80aaf9665611e989d20c42601be8"; 
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        //Printing current weather info to console
        console.log(response);

        var cityName= $("<h1>").addClass("city-title").text(response.name);
        var cityDate= $("h1").addClass("Date").text(response.dt);
        var cityIcon= $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        var cityTemp= $("<p>").addClass("current-temp").text("Temperature " + response.main.temp);
        var cityHum= $("<p>").addClass("current-hum").text("Humidity: " + response.msin.humidity);
        var cityWind= $("<p>").addClass("current-wind").text("Wind Speed: " + response.wind.speed);
        

        $("#cityWeather").empty();
        $("#cityWeather").append(cityName, cityDate, cityIcon, cityTemp, cityHum, cityWind);
    });

}

$("#search-city").on("click", function(event) {
    event.preventDefault();

    var inputCity= $("#city-input").val().trim();

    currentWeather(inputCity)
});
 