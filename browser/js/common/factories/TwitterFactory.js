app.factory('TwitterFactory', function ($http) {
	var tweet = {};

  tweet.getTweets = function() {
   return $http.get('/api/twitter/tweets')
   .then(function(userTweets) {
    console.log('what is userTweets.data.id? ', userTweets.data.id)
    return userTweets.data;
    })
  }



  return tweet;
})