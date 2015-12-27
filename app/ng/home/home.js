'use strict';

angular.module('coach.home', ['coach.schedule'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'ng/home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', function($scope, gameSchedule) {
	$scope.game = _.head(gameSchedule.matches);
	$scope.noGameMsg = "You have no scheduled games.";
	$scope.gameInfoPrefix = "Your next game is";
})
;