'use strict';

angular.module('coach.schedule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {
    templateUrl: 'ng/schedule/schedule.html',
    controller: 'ScheduleCtrl'
  });
}])

.service('gameSchedule', GameScheduleFactory)

.controller('ScheduleCtrl', function($scope, gameSchedule) {
	$scope.matches = gameSchedule.matches;
})

.directive('game', function() {
	return {
		templateUrl: 'ng/schedule/game.html'
	};
})

;

// Service constructor function

function GameScheduleFactory() {
	this.matches = [
		{"date": "01/01/2016", "opponent": "Dream Team", "field": "1", "home": "Home", "notes": ""},
		{"date": "08/01/2016", "opponent": "Bobo Kazam", "field": "2", "home": "Away", "notes": ""},
		{"date": "15/01/2016", "opponent": "Softy Tram", "field": "1", "home": "Home", "notes": ""},
		{"date": "22/01/2016", "opponent": "Crazy Boys", "field": "1", "home": "Away", "notes": ""},
		{"date": "29/01/2016", "opponent": "Bingo Toys", "field": "3", "home": "Home", "notes": ""},
	];
}
