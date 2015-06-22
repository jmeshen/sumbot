app.config(function ($stateProvider) {
 $stateProvider.state('tweets', {
  url: '/tweets',
  templateUrl: 'js/twitter/tweets.html',
  controller: 'TwitterCtrl'
})
})

app.controller('TwitterCtrl', function ($scope, TwitterFactory, Socket) {

  //  $scope.tweets = client.get('user', function(tweets) {
  //   console.log('getting tweets from Twitter Factory');
  // })

    TwitterFactory.getTweeter().then(function(results){
      // console.log('results from oembed?? ', results)
      $scope.tweets = results;
      console.log($scope.tweets)
      });

    Socket.on('newTweets', function(data) {
      console.log('got new tweet from stream!', data)
      $scope.tweets.unshift(data);
      $scope.$digest();
    })



   // $scope.getTweets = function() {
   //    TwitterFactory.getTweets().then(function(results){
   //       $scope.tweets = results;
   //    });
   // }
  // console.log('getting tweets');
})