app.factory('TwitterFactory', function ($http) {
	var tweet = {};
		
		tweet.getTweets = function() {
			return $http.get('https://api.twitter.com/1.1/statuses/user_timeline')
				.then(function(response){
					console.log("we are working", response)
				})


	}

})