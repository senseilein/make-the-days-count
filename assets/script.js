/*------------------------------DOM ELEMENTS------------------------------*/
const inspireBtn = $("#inspireBtn");
let finalResponse;

//when page loads, weather div will be hidden / only displayed later when we get weather data
const weatherDiv = $("#weather");
weatherDiv.hide();
/*------------------------------LOCAL STORAGE-----------------------------*/

/*------------------------------FUNCTIONS FOR WEATHER SECTION------------------------------*/

/*---FUNCTIONS FOR GEOLOCATION-----*/

let userLocation = [];
let weatherQueryURL = "";

navigator.geolocation.getCurrentPosition(function (position) {
  userLocation.push(position.coords.latitude);
  userLocation.push(position.coords.longitude);
  createWeatherQueryURL(userLocation);
  console.log(userLocation);
  console.log(weatherQueryURL);
  getCurrentWeather(weatherQueryURL);
}, doNotShowWeather);

function doNotShowWeather() {
  const weatherDiv = $("#weather");
  const cupOfTeaButton = $("<button>");
  cupOfTeaButton.attr("id", "cupOfTeaButton");
  const cupOfTea = $("<img>");
  cupOfTea.attr("id", "cupOfTea");
  cupOfTea.attr(
    "src",
    String.raw`assets\images\chocolate_tea_coffee_cup_drink_heart_love_icon_by_Free_Adobe_icon-icons.png`
  );
  cupOfTeaButton.append(cupOfTea);
  weatherDiv.prepend(cupOfTeaButton);
  weatherDiv.show();
}

function createWeatherQueryURL(userLocation) {
  // we create lat & lon variables using array destructuring
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
    method: "GET",
  })
    .then(function (response) {
      displayWeather(response);
      //console.log(response.weather[0].description);
      //console.log(response.main.temp);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayWeather(response) {
  const weatherDiv = $("#weather");
  const tempEl = $("<p>").text(`${response.main.temp} °C`);
  tempEl.addClass("text-center");
  const descriptionEl = $("<p>").text(
    `${response.weather[0].description} today!`
  );
  descriptionEl.addClass("text-center");
  const weatherIcon = $("<img>");
  weatherIcon.attr("id", "weather-icon");
  weatherIcon.attr("src", getWeatherIcon(response));

  weatherDiv.append(weatherIcon);
  weatherDiv.append(tempEl);
  weatherDiv.append(descriptionEl);
  weatherDiv.show();
}

function getWeatherIcon(response) {
  // const description = response.weather[0].description;
  const apiIcon = response.weather[0].icon;
  const icons = [
    String.raw`assets\images\bespoken_weather_icons\clear_sky_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\clear_sky_night_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\few_clouds_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\few_clouds_night_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\mist_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\rain_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\scattered_clouds_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\snow_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\thunderstorm_by_Spot.png`,
  ];

  switch (apiIcon) {
    case "01d":
      return icons[0];
      break;
    case "01n":
      return icons[1];
    case "02d":
      return icons[2];
      break;
    case "02n":
      return icons[3];
    case "03d" || "03n" || "04d" || "04n":
      return icons[6];
      break;
    case "09d" || "09n" || "10d" || "10n":
      return icons[5];
      break;
    case "11d" || "11n":
      return icons[8];
      break;
    case "13d" || "13n":
      return icons[7];
      break;
    case "50d" || "50n":
      return icons[4];
      break;
    default:
      return "^_^";
      break;
  }

  // switch (description) {
  //   case "clear sky":
  //     return icons[0];
  //     break;
  //   case "few clouds":
  //     return icons[2];
  //     break;
  //   case "scattered clouds" || "broken clouds":
  //     return icons[6];
  //     break;
  //   case "shower rain" || "rain":
  //     return icons[5];
  //     break;
  //   case "thunderstorm":
  //     return icons[8];
  //     break;
  //   case "snow":
  //     return icons[7];
  //     break;
  //   case "mist":
  //     return icons[4];
  //     break;
  //   default:
  //     return "heart";
  //     break;
  // }
}

/*------------------------------FUNCTIONS FOR GIPHY SECTION------------------------------*/

/*-----API CALL-----*/
const giphyURL =
  "https://api.giphy.com/v1/gifs/search?q=inspiration&api_key=iB7XfOBy9GnAHJMbb3bLreShLnvewTmY&limit=50";
$.ajax({
  url: giphyURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  finalResponse = response.data;
  showGiphy(finalResponse[0].images.original.url);
});

function showGiphy(url) {
  const giphy = $("#giphy");
  const imageEl = $("<img>");
  imageEl.attr("src", url);
  giphy.empty();
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
const needMoreBtn = $("#needMoreBtn");

function needMoreGiphy() {
  let giphyArray = [];

  finalResponse.forEach(function (gif) {
    giphyArray.push(gif.images.original.url);
  });

  let randomGif = Math.floor(Math.random() * finalResponse.length);

  showGiphy(giphyArray[randomGif]);
  console.log(giphyArray, randomGif);
}

needMoreBtn.on("click", needMoreGiphy);

/*------------------------------FUNCTIONS FOR TODO SECTION-----------------------------*/

/*------------------------------EVENT LISTENERS-----------------------------*/

inspireBtn.on("click", displayBigNeedMoreBtn);
