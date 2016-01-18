'use strict';

angular.module('coach.team', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/team', {
    templateUrl: 'ng/team/team.html',
    controller: 'TeamCtrl'
  });
}])

.controller('TeamCtrl', function($scope, $alert) {
	$scope.players = [{'name': 'John Doe', 'shirt': '4'}, 
					  {'name': 'Josh Foe', 'shirt': '10'}, 
					  {'name': 'Joe Blow', 'shirt': '7'}];

    $scope.newPlayerName = "";
    $scope.newPlayerShirt = "";

    $scope.addPlayer = function() {
    	if (this.newPlayerName === "" || this.newPlayerShirt === "") {
		    var missingInputAlert = {
			  "title": "Missing Input", 
			  "content": "Enter the player name and shirt number.",
			  "type": "danger",
			  "placement": "top",
			  "animation": "am-fade",
			  "duration": 3,
			  "show": true
		    };

		    $alert(missingInputAlert);
    		return;
    	}
    	this.players.push({'name': this.newPlayerName,'shirt': this.newPlayerShirt});
    	this.newPlayerName = ""; 
    	this.newPlayerShirt = "";
    };
});