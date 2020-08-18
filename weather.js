// var locations = [];
// $(document).ready(function() {
//     var loggedCity= JSON.parse(localStorage.getItem('locations'));
//     if (loggedCity !== null) {
//         loggedCity === locations
//     }
//     showCities();
// });

// function logCities() {
//     localStorage.setItem("locations", JSON.stringify(locations));
// }

// function showCities() {
//     $("#cityList").html("") {
//         if(locations !== null){
//             return;
//         }
        
//     }


 
//Function for current weather 


// }

// function fiveDay(city) {
//     var fiveURL= "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
//     $.ajax({
//         url: fiveURL,
//         method: "GET"
//     }).then(function(response) {
//         console.log(response);

//         $("#cityWeather").empty();
//         $("#cityWeather").append(response);
//     });
// }

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

      var cityName= $("<p>").text(response.name);
      console.log(cityName)
      var cityDate= $("<p>").addClass("Date").text(response.dt);
      var cityIcon= $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
      var cityTemp= $("<p>").addClass("current-temp").text("Temperature: " + response.main.temp);
      var cityHum= $("<p>").addClass("current-hum").text("Humidity: " + response.main.humidity);
      var cityWind= $("<p>").addClass("current-wind").text("Wind Speed: " + response.wind.speed);
      
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
          var bgcolor;
          if (response.value < 3) {
              bgcolor = "green";
          }
          else if (response.value >= 3 || response.value <= 6) {
              bgcolor = "yellow";
          }
          else if (response.value >= 6 || response.value <= 7) {
              bgcolor = "orange";
          }
          else if (response.value >= 7 || response.value <= 10) {
              bgcolor = "red";
          }
          else if (response.value >= 10)  {
              bgcolor = "purple";
          }

          uvIndex.append($("<span>").attr("class", "uv-index").attr("style", `background-color${bgcolor}`));
        
          $("#cityWeather").append(uvIndex)
      });
  });

  
}


function fiveDay(city) {
        var fiveURL= "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
        $.ajax({
            url: fiveURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            //$("#five-boxes").empty();

            var forecast = response.list
            console.log(forecast)
            
            for (var i=0;i< forecast.length; i++){
                
                //$(forecast[i]).text("")
                //var Index = i*8 + 4;
                var foreIcon= $("<img>").attr("src", "https://openweathermap.org/img/w/" + forecast[i].weather[0].icon + ".png")
                var foreTemp= $("<p>").addClass("fore-temp").text("Temperature: " + forecast[i].main.temp);
                var foreHum= $("<p>").addClass("fore-hum").text("Humidity: " + forecast[i].main.humidity);
            }


    
            $("#five-boxes").empty();
            $("#five-boxes").append(foreIcon, foreTemp, foreHum);
        });
    }
    


//Search button event listener when clicked
$("#search-city").on("click", function(event) {
    event.preventDefault();

    var inputCity= $("#city-input").val().trim();{
        
        
        currentWeather(inputCity);
        fiveDay(inputCity)
    }


    
});