const giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=JH2woZDs5AK3mRK0PqE52IEvHoYHhQ84";
$.ajax({
    url: giphyURL,
    method: "GET"
}).then(
    function (response) {
        //console.log(response.data.images.original_mp4.mp4);
        showGiphy(response);
    }

)

function showGiphy(response) {
    const giphy = $("#giphy");
    const imageEl = $("<img>");
    imageEl.attr("src", response.data.images.original.url);
    giphy.append(imageEl);
	 
}


