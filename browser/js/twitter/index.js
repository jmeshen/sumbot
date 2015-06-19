app.config(function ($stateProvider) {
 $stateProvider.state('tweets', {
  url: '/tweets',
  templateUrl: 'js/twitter/tweets.html',
  controller: 'TwitterCtrl'
})
})

app.controller('TwitterCtrl', function ($scope, TwitterFactory) {

  //  $scope.tweets = client.get('user', function(tweets) {
  //   console.log('getting tweets from Twitter Factory');
  // })
   TwitterFactory.getTweets().then(function(results){
      console.log('results from oembed?? ', results)
      $scope.tweets = results;
   });
   // $scope.getTweets = function() {
   //    TwitterFactory.getTweets().then(function(results){
   //       $scope.tweets = results;
   //    });
   // }
  // console.log('getting tweets');
})