
// var key = "kDsIkyfOaYiaj6UGqe3EKszmJknWu8CqX7E6ITfCrxpisziqkI";
// var secret = "b7e6nrW0HowGJevaoZ4a7oEb2WHAEQHLARl5yh3E";


//Global variables
var userFormEl = document.querySelector("#search-form");
var errorDisplay = document.getElementById("incorrectEntry");
var closeBox = document.getElementById("closeZipCodeModal");
document.getElementById("searchResults").hidden = true;
document.getElementById("cards").hidden = true;
document.getElementById("hideShowCat").hidden = false;
document.getElementById("hideShowDog").hidden = false;
document.getElementById("introduction").hidden = false;
//Submit handler to handle the submit values
var	formSubmitHandler = function(event) {
	console.log("formSubmitHandler is fine");
	event.preventDefault();

	var userInput = document.getElementById("search-input");
	inputValue = userInput.value.trim();
	
	if (isNaN(inputValue)){
		errorDisplay.style.display = "block";
	}
	else if (inputValue.length !== 5){
		errorDisplay.style.display = "block";
	}
	else {
		getPetAPI(inputValue);
		localStorage.setItem("zip", inputValue);
		var recentEntry = localStorage.getItem("zip");
		document.getElementById("searchResults").textContent = "Search results for: " + recentEntry;
	}
	
}

closeBox.onclick = function() {
	errorDisplay.style.display = "none";
}

var getPetAPI = function() {
	console.log("getPetApi");
	document.getElementById("searchResults").hidden = false;
	document.getElementById("cards").hidden = false;
	document.getElementById("hideShowCat").hidden = true;
	document.getElementById("hideShowDog").hidden = true;
	document.getElementById("introduction").hidden = true;
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
		var org = '';
		var status = "adoptable";
		var sort = 'distance';
		// Log the API data
		console.log('token', data);
		
		return fetch('https://api.petfinder.com/v2/animals?location=' + inputValue + '&status=' + status + '&sort=' + sort, {
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
		//Changed the for loop length. Now the for loop looks through 6 places in the array and populates the results to the 
		//6 result cards.
		for (var i = 1; i < 7; i++) {
			var img = document.getElementById("img" + i)
			var name = document.querySelector('#nameId' + i)
			var description = document.querySelector('#descriptionId' + i)
			var contact = document.querySelector('#contactId' + i)
			
			if (data.animals[i-1].photos[0]) {
				img.src = data.animals[i-1].photos[0].medium;
			
			} else {
				img.src = "https://videowithmyvet.com/wp-content/themes/Divi-child/images/placeholder.jpg";
			}				
				name.innerHTML = "Name: " + data.animals[i-1].name;
				description.innerHTML = "Description: " + data.animals[i-1].description;
				contact.innerHTML = "Email: " + data.animals[i-1].contact.email + "<br>" + "City: " + data.animals[i-1].contact.address.city
				+ "<br>" + "State: " + data.animals[i-1].contact.address.state;
		}
		
	

	})
}

//Retrieves random cat images from API
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

//retrieves random dog images from API
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

//Initializes random image function
getCatImage();
getDogImage();

//Continues random image function with six second interval
var intermittentCatImage = window.setInterval(function(){
	getCatImage();
},6000);
var intermittentDogImage = window.setInterval(function(){
	getDogImage();
},6000);

userFormEl.addEventListener('submit', formSubmitHandler);

//Modal
var modal = document.getElementById("modal");
var btn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    // modal.style.display = "none";
  }
}


