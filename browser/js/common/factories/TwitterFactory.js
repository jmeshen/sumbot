app.factory('TwitterFactory', function ($http) {
	return {
    getTweets: function() {
     return $http.get('/api/twitter/tweets')
     .then(function(userTweets) {
      console.log('coming back from getUserTimelineAsync');
      console.log('userTweets', userTweets);
      // console.log('what is userTweets.data.id? ', userTweets.data.id)
      return userTweets.data;
    }, console.log)
   }
  }
})