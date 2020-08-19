//Creating API key variable
var APIkey = "c1ba80aaf9665611e989d20c42601be8"; 

//Function for current weather
function currentWeather(city) {

   
  var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {

      //Printing current weather info to console
      console.log(response);

      var cityName= $("<p>").addClass("cityHead").text("Current weather in " + response.name + ":");
      console.log(cityName)

      //Date changed to MM/DD/YY
      var date= new Date(response.dt * 1000).toLocaleDateString();
      var cityDate= $("<p>").addClass("Date").text("Today is " + date + ".");
     
      var cityIcon= $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
     
      //Converting temp from Kelvin to Fahrenheit 
      var temp = Math.round(((response.main.temp - 273.15) * 9/5 + 32));
      var cityTemp= $("<p>").addClass("current-temp").text("Temperature: " + temp + "°F");
      var cityHum= $("<p>").addClass("current-hum").text("Humidity: " + response.main.humidity + "%");
      var cityWind= $("<p>").addClass("current-wind").text("Wind Speed: " + response.wind.speed + "mph");
      
      $("#cityWeather").empty();
      $("#cityWeather").append(cityName, cityDate, cityIcon, cityTemp, cityHum, cityWind);  
     
      //UV Index function 
      var lat= response.coord.lat;
      var lon= response.coord.lon;
      var UV= "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
      $.ajax({
          url: UV,
          method: "GET"
      }).then(function(response) {
          console.log(response);

          var uvIndex= $("<p>").addClass("uv-index").text("UV Index: " + response.value);
          
          uvIndex.append($("<span>").attr("class", "uv-index"));
        
          $("#cityWeather").append(uvIndex)
      });
  }); 
}

//Five-day forecast function 
function fiveDay(city) {
        var fiveURL= "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
        $.ajax({
            url: fiveURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            $("#five-boxes").empty();

            var forecast = response.list;
            console.log(forecast)
            
            for (var i = 0;i < forecast.length; i++){

                //Pulling and setting times (3:00pm temp since that's when it's the hottest)
                if (forecast[i].dt_txt.indexOf("15:00:00") !== -1) {

                //creating cards and appending forecast data    
                var Column= $("<div>").attr("class", "col-md-auto")
                $("#five-boxes").append(Column);
                var foreCard= $("<div>").attr("class", "card").attr("style", "width: 12rem;")
                $("#five-boxes").append(foreCard);

                //Date changed to MM/DD/YY
                var fiveDate= new Date(forecast[i].dt * 1000).toLocaleDateString();
                var foreDate= $("<header>").addClass("Date-fore").text(fiveDate);
                foreCard.append(foreDate);
                var foreIcon= $("<img>").addClass("foreIcon").attr("src", "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png")
                foreCard.append(foreIcon);
                var foreBody= $("<div>").attr("class", "card-body");
                foreCard.append(foreBody);

                //Converting temp from Kelvin to Fahrenheit 
                var temp = Math.round(((forecast[i].main.temp - 273.15) * 9/5 + 32));
                var foreTemp= $("<p>").addClass("fore-temp").text("Temperature: " + temp + "°F");
                foreBody.append(foreTemp);
                var foreHum= $("<p>").addClass("fore-hum").text("Humidity: " + forecast[i].main.humidity + "%");
                foreBody.append(foreHum);
            }
        }


    
           
        });
    }

//Array list created for cities searched 
var cityList= []

//Prepending searched cities onto a list
function List() {

    //Emptied to prevent multiple buttons being created 
    $("#cityList").empty();
 
    for (var i=0; i < cityList.length; i++) {
       var b = $("<button>");
       b.addClass("location");
       b.attr("data-name", cityList[i]);
       b.text(cityList[i]);
       $("#cityList").prepend(b)

    }   
};



// function Pull() {
//     var saved = JSON.parse(localStorage.getItem("cities"));
//     // if (saved !== null) {
//     //     cityList = saved
//     // }
//     List();
// };


//Search button event listener when clicked
$("#search-city").on("click", function(event) {
    event.preventDefault();

    var inputCity= $("#city-input").val().trim();{
        
        
        currentWeather(inputCity);
        fiveDay(inputCity);
        cityList.push(inputCity);

        List();
    }    
});

$(".location").on("click", function(event) {
    event.preventDefault();
    
    var inputCity= $("#city-input").val().trim() 

    localStorage.setItem("cities", inputCity);
    

    localStorage.getItem("cities");

});


