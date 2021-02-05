
// var key = "kDsIkyfOaYiaj6UGqe3EKszmJknWu8CqX7E6ITfCrxpisziqkI";
// var secret = "b7e6nrW0HowGJevaoZ4a7oEb2WHAEQHLARl5yh3E";



var getToken = function() {
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
		var org = "RI77";
		var status = "adoptable";
		// Log the API data
		console.log('token', data);
		
		return fetch('https://api.petfinder.com/v2/animals?organization=' + org + '&status=' + status, {
		headers: {
			'Authorization': data.token_type + ' ' + data.access_token,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	}).then(function (resp) {

		// Return the API response as JSON
		return resp.json();

	}).then(function (data) {

		// Log the pet data
		console.log('pets', data);

	}).catch(function (err) {

		// Log any errors
		console.log('something went wrong', err);

	});
}

getToken();

// document.getElementById("seachBtn").addEventListener("click", getToken);

function getCatImage(){
	fetch('https://api.thecatapi.com/v1/images/search?size=full', {
		method: 'GET',
	}).then(function(response) {
		// Return the response as JSON
		return response.json();
	}).then(function (data){
		document.getElementById('rotatingImage').innerHTML = data[0]['url'];

		var html = '<img src="' + data[0]["url"] + '">';
  		document.getElementById("rotatingImage").innerHTML = html;
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
getCatImage();
getDogImage();