/*------------------------------DOM ELEMENTS------------------------------*/
const inspireBtn = $("#inspireBtn");

/*------------------------------LOCAL STORAGE-----------------------------*/




/*------------------------------FUNCTIONS FOR WEATHER SECTION------------------------------*/

/*---FUNCTIONS FOR GEOLOCATION-----*/
function getUserCoordinates(position) {
  const userLongitude = position.coords.longitude;
  const userLatitude = position.coords.latitude;
  const userLocation = [userLongitude, userLatitude];
  console.log(position.coords.longitude);
  getCurrentWeather()

} 

function errorCallback(error) {
  alert(error);
}

navigator.geolocation.getCurrentPosition(getUserCoordinates, errorCallback);


function getCurrentWeather() {
  
  // const userLocation =  getUserCoordinates()
  
  const weatherURL = "https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric"
  console.log(weatherURL);
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
