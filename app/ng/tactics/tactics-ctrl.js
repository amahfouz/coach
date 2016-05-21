// coordinates events from the tactics field 

'use strict';

angular.module('coach.tactics')

.controller('TacticsCtrl', function($scope, toaster, Constants, planListService, playerAnimationService) {

	// variables 

    $scope.selectedPlayerId = null;
    $scope.isAnimating = false;

	// methods

	$scope.$watch(
		function() { return playerAnimationService.getIsAnimating(); }, 
		function(newVal, oldVal) {
			console.log("Watch fired: " + newVal + "," + oldVal);	
			$scope.isAnimating = playerAnimationService.getIsAnimating();
		}, false
	);

	$scope.getPlayers = function() {
		var phase = playerAnimationService.getSelectedPhase();

		var plan = planListService.getSelectedPlan();
		if (!plan)
			return [];

		if (!phase || phase.id == 0) {
			return plan.players;
		}
		else {
			var previousPhase = plan.getPhase(phase.id - 1);
			if (! previousPhase)
				return [];

			return previousPhase.getTransitions();
		}
	};

	$scope.getSlantedLines = function() {
		var plan = planListService.getSelectedPlan();
		return (plan) ? plan.getPaths() : [];
	};

	this.addPlayer = function(x, y, color) {
		var plan = planListService.getSelectedPlan();
		if (!plan)
			return;

		plan.addPlayer(x, y, color);
	};

	this.updatePlayer = function(playerId, newX, newY) {

		var plan = planListService.getSelectedPlan();
		if (!plan)
			return;

		if (newY <= -Constants.PLAYER_DIAMETER)
			plan.removePlayer(playerId);
		else
			plan.updatePlayer(playerId, newX, newY);
	};

	$scope.startAddAnimation = function($event, playerInfo) {

 		$event.stopPropagation();
		if (! $scope.selectedPlayerId)
			toaster.pop('success', "Animate Player", "Click on the target position to animate.");

		$scope.selectedPlayerId = playerInfo.id;
	};

	$scope.handleFieldClicked = function($event) {
		if (this.selectedPlayerId) {
			playerAnimationService.addAnimation($scope.selectedPlayerId, $event);
			$scope.selectedPlayerId = null;
		}
	}
})
;


