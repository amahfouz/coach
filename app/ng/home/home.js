'use strict';

angular.module('coach.home', ['coach.schedule'])
.controller('HomeCtrl', function($scope, gameSchedule) {
	$scope.game = _.head(gameSchedule.matches);
	$scope.noGameMsg = "You have no scheduled games.";
	$scope.gameInfoPrefix = "Your next game is";
})
;