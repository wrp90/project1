
// var key = "kDsIkyfOaYiaj6UGqe3EKszmJknWu8CqX7E6ITfCrxpisziqkI";
// var secret = "b7e6nrW0HowGJevaoZ4a7oEb2WHAEQHLARl5yh3E";

// couple thoughts on what we can do from here:
//we can push pieces of the array to different html pages, making indivdual pages for different animals (top5)
//we can go back to finding a geo location API and try to link it with "org" var used on line 30 (not sure if it will work tho)

//Global variables
userFormEl = document.querySelector("search-form");


//Submit handler to handle the submit values
var formSubmitHandler = function(event) {
	event.preventDefault();
	userInput = doctument.getElementById("search-input");
	inputValue = userInput.value.trim();
	console.log(inputValue)
}

var getPetAPI = function() {
    var key = "kDsIkyfOaYiaj6UGqe3EKszmJknWu8CqX7E6ITfCrxpisziqkI";
    var secret = "b7e6nrW0HowGJevaoZ4a7oEb2WHAEQHLARl5yh3E";

    fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	}).then(function (response) {

		// Return the response as JSON
		return response.json();

	}).then(function (data) {
		//this fetch only gets info from the RI77 org
		//can change the org name to find new animals from that org
		var org = "";
		var status = "adoptable";
		// Log the API data
		console.log('token', data);
		
		return fetch('https://api.petfinder.com/v2/animals?location=' + "Austin, texas" + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	}).then(function (response) {
		console.log(response)
		// Return the API response as JSON
		return response.json();

	}).then(function (data) {

		// Log the pet data
		console.log('pets', data);
		//pulling image from data array and appending to page.
		var img = document.createElement("img");
		// img.src = "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/50463411/1/?bust=1612553534&width=100";
		img.src = data.animals[0].photos[0].small;
		var src = document.getElementById("header");
		src.appendChild(img);
	

	}).catch(function (err) {

		// Log any errors
		console.log('something went wrong', err);

	});
}

getPetAPI();

// document.getElementById("seachBtn").addEventListener("click", getToken);

function getCatImage(){
	fetch('https://api.thecatapi.com/v1/images/search?size=full', {
		method: 'GET',
	}).then(function(response) {
		// Return the response as JSON
		return response.json();
	}).then(function (data){
		document.getElementById('rotatingCat').innerHTML = data[0]['url'];

		var html = '<img src="' + data[0]["url"] + '">';
  		document.getElementById("rotatingCat").innerHTML = html;
	})

}


function getDogImage(){
	fetch('https://dog.ceo/api/breeds/image/random', {
		method: 'GET',
	}).then(function(response) {
		// Return the response as JSON
		return response.json();
	}).then(function (data){
		document.getElementById('rotatingDog').innerHTML = data['message'];

		var html = '<img src="' + data["message"] + '">';
  		document.getElementById("rotatingDog").innerHTML = html;
	})

}

var intermittentCatImage = window.setInterval(function(){
	getCatImage();
},6000);
var intermittentDogImage = window.setInterval(function(){
	getDogImage();
},6000);

