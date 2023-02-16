/*------------------------------DOM ELEMENTS------------------------------*/
const inspireBtn = $("#inspireBtn");
let finalResponse;

//when page loads, weather div will be hidden / only displayed later when we get weather data
const weatherDiv = $("#weather");
weatherDiv.hide();

// let defaultTodos = ["Drink Water", "Smile", "Hug a tree", "Take a walk"];
/*------------------------------LOCAL STORAGE-----------------------------*/
function initLocalStorage() {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  if (!toDoList) {
    localStorage.setItem("toDoList", JSON.stringify([]));
  }
}
initLocalStorage();

function renderTodoItem(todoText) {
  const listEl = $("#list");
  liEl = $("<li>");
  liEl.addClass(
    "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
  );
  const divInput = $("<div>");
  divInput.addClass("d-flex align-items-center");
  const pTag = $("<p>");
  pTag.append(todoText);
  divInput.append(pTag);
  createCheckbox(divInput);
  createRemoveItemEl(liEl);
  liEl.prepend(divInput);
  listEl.append(liEl);
}

function initTodoList() {}
let toDoList = JSON.parse(localStorage.getItem("toDoList"));

// for each piece of text, we render the relevant element on the page
for (let i = 0; i < toDoList.length; i++) {
  renderTodoItem(toDoList[i]);
}
initTodoList();

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
    `assets\\images\\bespoken_weather_icons\\few_clouds_night_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\mist_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\rain_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\scattered_clouds_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\snow_by_Sihan_Liu.png`,
    String.raw`assets\images\bespoken_weather_icons\thunderstorm_by_Spot.png`,
  ];

  switch (apiIcon) {
    case "01d":
      return icons[0];
    //break;
    case "01n":
      return icons[1];
    case "02d":
      return icons[2];
    //break;
    case "02n":
      return icons[3];
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return icons[6];
    //break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return icons[5];
    //break;
    case "11d":
    case "11n":
      return icons[8];
    //break;
    case "13d":
    case "13n":
      return icons[7];
    //break;
    case "50d":
    case "50n":
      return icons[4];
    //break;
  }
}

// Function for the cup of love tea
function pourLoveTea(e) {
  console.log(e);
  const cupOfTea = $("#cupOfTea");
  // const cupOfTeaButton = $("cupOfTeaButton");
  cupOfTea.hide();
  const hearts = $('<img src="./assets/images/red_heart_by_Rokey.png"/>');
  // hearts.attr("scr", String.raw`.\assets\images\hearts_by_icon-icons.png`);
  hearts.attr("id", "hearts");
  weatherDiv.append(hearts);
  setTimeout(function () {
    cupOfTea.show();
    hearts.remove();
  }, 1000);
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

let addbutton = $("#add-button");
addbutton.on("click", function addLi(event) {
  let newTodoEl = $("#todo-input").val().trim();
  updateLocalStorageWithNewTodos(newTodoEl);
  console.log(newTodoEl);
  listEl = $("#list");
  liEl = $("<li>");
  liEl.addClass(
    "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
  );
  $("#todo-input").val("");

  const divInput = $("<div>");
  divInput.addClass("d-flex align-items-center");
  const pTag = $("<p>");
  pTag.append(newTodoEl);
  divInput.append(pTag);
  createCheckbox(divInput);
  createRemoveItemEl(liEl);
  liEl.prepend(divInput);
  listEl.append(liEl);
});

function updateLocalStorageWithNewTodos(newTodoEl) {
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  if (!toDoList.includes(newTodoEl)) {
    toDoList.push(newTodoEl);
  }
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function createCheckbox(divInput) {
  const checkBox = $("<input>").attr({ type: "checkbox" });
  checkBox.addClass("form-check-input me-2");
  divInput.prepend(checkBox);
  checkBox.on("change", handleCheckboxChange);
}

function createRemoveItemEl(liEl) {
  const cross = $("<a>");
  cross.attr({ href: "#!" });
  cross.addClass("cross");
  const iEl = $("<i>");
  iEl.addClass("fas fa-times text-primary");
  cross.append(iEl);
  liEl.append(cross);
  cross.on("click", removeToDoItem);
}

// function removeToDoItem(event) {
//   let itemToBeRemoved = $(event.target).parent().parent();
//   console.log(itemToBeRemoved.children().children().text());
//   itemToBeRemoved.remove();

//   let toDoList = JSON.parse(localStorage.getItem("toDoList"));
//   localStorage.setItem("toDoList", JSON.stringify(toDoList));
// }

function removeToDoItem(event) {
  let itemToBeRemoved = $(event.target).parent().parent();
  console.log(itemToBeRemoved.children().children().text());
  const itemText = itemToBeRemoved.children().children().text();
  console.log(itemText);
  let toDoList = JSON.parse(localStorage.getItem("toDoList"));
  console.log(toDoList);
  const index = toDoList.indexOf(itemText);
  toDoList.splice(index, 1);
  console.log(index);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  itemToBeRemoved.remove();
}

function handleCheckboxChange(event) {
  $(event.target).parent().find("p").toggleClass("todo-text");
}

/*function for bigNeedMoreButton click event*/
function showMainPage(e) {
  console.log(e.target);
  const giphyContainer = $("#giphyContainer");
  giphyContainer.show();
  const bigNeedMoreBtn = $("#bigNeedMore");
  bigNeedMoreBtn.remove();
}

/*------------------------------EVENT LISTENERS-----------------------------*/

inspireBtn.on("click", displayBigNeedMoreBtn);

$(".cross").on("click", removeToDoItem);

$(".form-check-input").on("change", handleCheckboxChange);

const bigNeedMoreBtn = $("#bigNeedMore");
const todosContainer = $("#todosContainer");
todosContainer.on("click", bigNeedMoreBtn, showMainPage);

const cupOfTea = $("#cupOfTea");
weatherDiv.on("click", cupOfTea, pourLoveTea);
