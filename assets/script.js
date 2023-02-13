/*------------------------------DOM ELEMENTS------------------------------*/
const inspireBtn = $("#inspireBtn");

/*------------------------------LOCAL STORAGE-----------------------------*/

/*------------------------------FUNCTIONS FOR WEATHER SECTION------------------------------*/

/*---FUNCTIONS FOR GEOLOCATION-----*/

let userLocation = [];
let weatherQueryURL = "";

navigator.geolocation.getCurrentPosition(function (position) {
  userLocation.push(position.coords.latitude);
  userLocation.push(position.coords.longitude);
  if (userLocation.length < 2) {
    alert("No location retrieved");
  }
  createWeatherQueryURL(userLocation);
  console.log(userLocation);
  console.log(weatherQueryURL);
  getCurrentWeather(weatherQueryURL);
}, errorCallback);

function errorCallback() {
  alert("User location unavailable");
}

function createWeatherQueryURL(userLocation) {
  const [lat, lon] = userLocation;
  // console.log(userLocation);
  weatherQueryURL += `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
}

// console.log("NOOWWW " + weatherQueryURL);

function getCurrentWeather() {
  console.log("please be defined " + weatherQueryURL);

    console.log(weatherQueryURL);

  //call CurrentWeather API
  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(function(response){
    displayWeather(response)
    console.log(response.weather[0].description);
    console.log(response.main.temp);
  }).catch(function(error) {
    console.log(error);
  })
}

function displayWeather(response) {
  const weatherDiv = $("#weather");
  const tempEl = $("<p>").text(`${response.main.temp} °C`); 
  const descriptionEl = $("<p>").text(`${response.weather[0].description} today!`);
  const weatherIcon = $("<img>");
  weatherIcon.attr("src", getWeatherIcon(response));

  weatherDiv.append(weatherIcon);
  weatherDiv.append(tempEl);
  weatherDiv.append(descriptionEl);


}

function getWeatherIcon(response) {
  const description = response.weather[0].description
  const icons = [
    String.raw`assets\images\bespoken_weather_icons\clear_sky_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\clear_sky_night_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\few_clouds_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\few_clouds_night_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\mist_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\rain_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\scattered_clouds_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\snow_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\thunderstorm_by_Spot.png`
  ]

  switch (description) {
    case "clear sky":
      return icons[0]
      break;
    case "few clouds":
      return icons[2]
      break;
    case "scattered clouds" || "broken clouds":
      return icons[6]
      break;
    case "shower rain" || "rain":
      return icons[5]
      break;
    case "thunderstorm":
      return icons[8]
      break;
    case "snow":
      return icons[7]
      break;
    case "mist":
      return icons[4]
      break;
    default: 
      return "heart"
      break;
  }

}

/*------------------------------FUNCTIONS FOR GIPHY SECTION------------------------------*/

/*-----API CALL-----*/
const giphyURL =
  "https://api.giphy.com/v1/gifs/random?api_key=JH2woZDs5AK3mRK0PqE52IEvHoYHhQ84";
$.ajax({
  url: giphyURL,
  method: "GET",
}).then(function (response) {
  //console.log(response.data.images.original_mp4.mp4);
  showGiphy(response);
});

function showGiphy(response) {
  const giphy = $("#giphy");
  const imageEl = $("<img>");
  imageEl.attr("src", response.data.images.original.url);
  giphy.append(imageEl);
}

/*-----INSPIRED BUTTON-----*/

function displayBigNeedMoreBtn() {
  const giphyContainer = $("#giphyContainer");
  const todosContainer = $("#todosContainer");

  const bigNeedMore = $("<button>").text("I need more GIFs!");
  bigNeedMore.addClass("btn");
  bigNeedMore.attr("id", "bigNeedMore");

  giphyContainer.hide();
  todosContainer.append(bigNeedMore);
}

/*-----NEED MORE BUTTON-----*/

/*------------------------------FUNCTIONS FOR TODO SECTION-----------------------------*/

/*------------------------------EVENT LISTENERS-----------------------------*/

inspireBtn.on("click", displayBigNeedMoreBtn);
