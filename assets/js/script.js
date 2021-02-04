
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

	// Log the API data
	console.log('token', data);

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
}

getToken();

// document.getElementById("seachBtn").addEventListener("click", getToken);