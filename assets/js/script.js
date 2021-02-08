
// var key = "kDsIkyfOaYiaj6UGqe3EKszmJknWu8CqX7E6ITfCrxpisziqkI";
// var secret = "b7e6nrW0HowGJevaoZ4a7oEb2WHAEQHLARl5yh3E";

// couple thoughts on what we can do from here:
//we can push pieces of the array to different html pages, making indivdual pages for different animals (top5)
//we can go back to finding a geo location API and try to link it with "org" var used on line 30 (not sure if it will work tho)

//Global variables
var userFormEl = document.querySelector("#search-form");
var count = 0;

//Submit handler to handle the submit values
var formSubmitHandler = function(event) {
	event.preventDefault();
	userInput = document.getElementById("search-input");
	inputValue = userInput.value.trim();
	getPetAPI(inputValue);
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
		//6 result cards.  B
		for (var i = 0; i < 6; i++) {
			count = count + 1
			var img = document.querySelector("#img" + count)
			var name = document.querySelector('#nameId' + count)
			var description = document.querySelector('#descriptionId' + count)
			var contact = document.querySelector('#contactId' + count)
			
			if (!data.animals[i].photos[0]) {
				img.src = "https://www.smalldoorvet.com/wp-content/uploads/2020/03/Can-cats-and-dogs-get-coronavirus_resized.jpg";
			
			} else {
				img.src = data.animals[i].photos[0].medium;
			}				
				name.innerHTML = "Name: " + data.animals[i].name;
				description.innerHTML = "Description: " + data.animals[i].description;
				contact.innerHTML = "Email: " + data.animals[i].contact.email + "<br>" + "City: " + data.animals[i].contact.address.city
				+ "<br>" + "State: " + data.animals[i].contact.address.state;
		}
		
	

	})
}




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

userFormEl.addEventListener('submit', formSubmitHandler);