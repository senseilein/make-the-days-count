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
    url: ,
    method: ""
  }).then(function(response)){

  }).catch(function(error) {

  })
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
