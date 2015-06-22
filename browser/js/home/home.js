app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/twitter/tweets.html',
        controller: 'TwitterCtrl'
    });
});