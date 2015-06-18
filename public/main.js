'use strict';

var app = angular.module('Meaniscule', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
   // This turns off hashbang urls (/#about) and changes it to something normal (/about)
   $locationProvider.html5Mode(true);
   // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
   $urlRouterProvider.otherwise('/');
});
"use strict";

app.controller("HomeController", function ($scope, $http) {

  $scope.msgFromScope = "...And I'm a message from the HomeController scope, just so you know that I work!";
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/app/home/home.html',
        controller: 'HomeController'
    });
});
'use strict';

app.controller('ModulesController', function ($scope, $http, ModulesFactory) {

  $scope.$on('$stateChangeSuccess', function () {
    var defaultMessage = 'If you don\'t see a list of links here, you need to seed your database!\nIn your terminal, go to this app\'s directory and run `gulp seedDB`.\nThen try this page again.';

    ModulesFactory.getNodeModules().then(function (modules) {
      $scope.nodeModules = modules;

      if (!$scope.nodeModules.length) {
        $scope.defaultMessage = defaultMessage;
      }
    });
  });
});
'use strict';

app.factory('ModulesFactory', function ($http) {
  return {
    getNodeModules: function getNodeModules() {
      return $http.get('/api/modules/').then(function (res) {
        return res.data;
      });
    }
  };
});
'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('modules', {
        url: '/modules',
        templateUrl: '/app/modules/modules.html',
        controller: 'ModulesController'
    });
});
"use strict";

app.directive("navbar", function () {
	return {
		restrict: "E",
		templateUrl: "/app/navbar/navbar.html"
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLnN0YXRlLmpzIiwibW9kdWxlcy9tb2R1bGVzLmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL21vZHVsZXMuZmFjdG9yeS5qcyIsIm1vZHVsZXMvbW9kdWxlcy5zdGF0ZS5qcyIsIm5hdmJhci9uYXZiYXIuZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7O0FBRXpELG9CQUFpQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbEMscUJBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BDLENBQUMsQ0FBQzs7O0FDUEgsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0FBRXZELFFBQU0sQ0FBQyxZQUFZLEdBQUcsbUZBQW1GLENBQUM7Q0FFM0csQ0FBQyxDQUFDOzs7QUNKSCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsY0FBYyxFQUFFO0FBQ2pDLGtCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN6QixXQUFHLEVBQUUsR0FBRztBQUNSLG1CQUFXLEVBQUUscUJBQXFCO0FBQ2xDLGtCQUFVLEVBQUUsZ0JBQWdCO0tBQy9CLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7O0FDTkgsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFTLE1BQU0sRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFOztBQUUxRSxRQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFlBQVk7QUFDNUMsUUFBSSxjQUFjLEdBQUcsMEtBQTBLLENBQUM7O0FBRWhNLGtCQUFjLENBQUMsY0FBYyxFQUFFLENBQzVCLElBQUksQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUN0QixZQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQzlCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO09BQ3hDO0tBQ0YsQ0FBQyxDQUFDO0dBQ04sQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOzs7QUNkSCxHQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzVDLFNBQU87QUFDTCxrQkFBYyxFQUFFLDBCQUFXO0FBQ3pCLGFBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDOUIsSUFBSSxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQ2xCLGVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQztPQUNqQixDQUFDLENBQUM7S0FDTjtHQUNGLENBQUM7Q0FDSCxDQUFDLENBQUM7OztBQ1RILEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxjQUFjLEVBQUU7QUFDakMsa0JBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzVCLFdBQUcsRUFBRSxVQUFVO0FBQ2YsbUJBQVcsRUFBRSwyQkFBMkI7QUFDeEMsa0JBQVUsRUFBRSxtQkFBbUI7S0FDbEMsQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDOzs7QUNOSCxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFVO0FBQ2pDLFFBQU87QUFDTixVQUFRLEVBQUUsR0FBRztBQUNiLGFBQVcsRUFBRSx5QkFBeUI7RUFDdEMsQ0FBQztDQUNGLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdNZWFuaXNjdWxlJywgWyd1aS5yb3V0ZXInXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgIC8vIFRoaXMgdHVybnMgb2ZmIGhhc2hiYW5nIHVybHMgKC8jYWJvdXQpIGFuZCBjaGFuZ2VzIGl0IHRvIHNvbWV0aGluZyBub3JtYWwgKC9hYm91dClcbiAgICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZSh0cnVlKTtcbiAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICBcbiAgJHNjb3BlLm1zZ0Zyb21TY29wZSA9IFwiLi4uQW5kIEknbSBhIG1lc3NhZ2UgZnJvbSB0aGUgSG9tZUNvbnRyb2xsZXIgc2NvcGUsIGp1c3Qgc28geW91IGtub3cgdGhhdCBJIHdvcmshXCI7XG5cbn0pOyIsImFwcC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUNvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuY29udHJvbGxlcignTW9kdWxlc0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBNb2R1bGVzRmFjdG9yeSkge1xuICBcbiAgJHNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVmYXVsdE1lc3NhZ2UgPSAnSWYgeW91IGRvblxcJ3Qgc2VlIGEgbGlzdCBvZiBsaW5rcyBoZXJlLCB5b3UgbmVlZCB0byBzZWVkIHlvdXIgZGF0YWJhc2UhXFxuSW4geW91ciB0ZXJtaW5hbCwgZ28gdG8gdGhpcyBhcHBcXCdzIGRpcmVjdG9yeSBhbmQgcnVuIGBndWxwIHNlZWREQmAuXFxuVGhlbiB0cnkgdGhpcyBwYWdlIGFnYWluLic7XG5cbiAgICBNb2R1bGVzRmFjdG9yeS5nZXROb2RlTW9kdWxlcygpXG4gICAgICAudGhlbihmdW5jdGlvbihtb2R1bGVzKSB7XG4gICAgICAgICRzY29wZS5ub2RlTW9kdWxlcyA9IG1vZHVsZXM7XG4gICAgICAgIFxuICAgICAgICBpZiAoISRzY29wZS5ub2RlTW9kdWxlcy5sZW5ndGgpIHtcbiAgICAgICAgICAkc2NvcGUuZGVmYXVsdE1lc3NhZ2UgPSBkZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xufSk7IiwiYXBwLmZhY3RvcnkoJ01vZHVsZXNGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcbiAgcmV0dXJuIHtcbiAgICBnZXROb2RlTW9kdWxlczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL21vZHVsZXMvJylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICB9KTsgICAgXG4gICAgfVxuICB9O1xufSk7IiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbW9kdWxlcycsIHtcbiAgICAgICAgdXJsOiAnL21vZHVsZXMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9hcHAvbW9kdWxlcy9tb2R1bGVzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTW9kdWxlc0NvbnRyb2xsZXInXG4gICAgfSk7XG59KTsiLCJhcHAuZGlyZWN0aXZlKFwibmF2YmFyXCIsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6IFwiRVwiLFxuXHRcdHRlbXBsYXRlVXJsOiBcIi9hcHAvbmF2YmFyL25hdmJhci5odG1sXCJcblx0fTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==