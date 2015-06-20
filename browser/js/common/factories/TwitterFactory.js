app.factory('TwitterFactory', function ($http) {
	var tweet = {};

  tweet.getTweeter = function() {
   return $http.get('/api/twitter/tweets')
   	.then(function(userTweets) {
	    console.log('what is userTweets.data.id? ', userTweets)
	    return userTweets.data;
    })
  }

  return tweet;
})