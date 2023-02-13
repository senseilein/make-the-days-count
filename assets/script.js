/*------------------------------DOM ELEMENTS------------------------------*/
const inspireBtn = $("#inspireBtn");
let finalResponse;

/*------------------------------LOCAL STORAGE-----------------------------*/

/*------------------------------FUNCTIONS FOR WEATHER SECTION------------------------------*/

/*------------------------------FUNCTIONS FOR GIPHY SECTION------------------------------*/

/*-----API CALL-----*/
const giphyURL = "https://api.giphy.com/v1/gifs/search?q=inspiration&api_key=iB7XfOBy9GnAHJMbb3bLreShLnvewTmY&limit=50";
$.ajax({
    url: giphyURL,
    method: "GET"
}).then(
    function (response) {
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
	  
  };

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
	
	finalResponse.forEach(function(gif) {
		giphyArray.push(gif.images.original.url);
		});

		let randomGif = Math.floor(Math.random() * finalResponse.length);

		showGiphy(giphyArray[randomGif]);
		console.log(giphyArray, randomGif);
	} ;

needMoreBtn.on("click", needMoreGiphy);

/*------------------------------FUNCTIONS FOR TODO SECTION-----------------------------*/

/*------------------------------EVENT LISTENERS-----------------------------*/

inspireBtn.on("click", displayBigNeedMoreBtn);
