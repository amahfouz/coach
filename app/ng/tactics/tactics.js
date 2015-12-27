'use strict';

angular.module('coach.tactics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tactics', {
    templateUrl: 'ng/tactics/tactics.html',
    controller: 'TacticsCtrl'
  });
}])

.service('tacticsService', TacticsServiceFactory) 

.controller('TacticsCtrl', function($scope, $alert, tacticsService) {

	$scope.idCounter = 0;

	this.nextId = function() {
		return $scope.idCounter++;
	};

	$scope.editMode = true;

	$scope.plans = tacticsService.getPlanList();
	$scope.selectedPlan = tacticsService.newPlan();
	$scope.selectedPlanId = $scope.selectedPlan.id;

	$scope.$watch('selectedPlanId', function(newValue, oldValue) {
		if (newValue)
			$scope.selectedPlan = tacticsService.getById(newValue);
		else
			$scope.selectedPlan = tacticsService.newPlan();
	});	

	$scope.edit = function() {
		$scope.editMode = true;
	};

	$scope.cancelEdit = function() {
		$scope.editMode = false;
	};

	$scope.save = function() {
		$scope.editMode = false;
	};	
})
;

function TacticsServiceFactory() {


	this.plans = [
		{
			'id': 1,
			'name': 'Default',
			'players' : [
				{'id': 1, 'x': '50', 'y': '50', 'color': 'yellow'},
				{'id': 2, 'x': '160', 'y': '160', 'color': 'red'},
				{'id': 3, 'x': '220', 'y': '220', 'color': 'yellow'},
			],
			'animation' : [
			]
		}, 
		{
			'id': 2,
			'name': 'Attack',
			'players' : [
				{'id': 1, 'x': '20', 'y': '20', 'color': 'yellow'},
				{'id': 2, 'x': '60', 'y': '60', 'color': 'red'},
				{'id': 3, 'x': '120', 'y': '120', 'color': 'yellow'},
			],
			'animation' : [
			]
		}		
	];

	this.newPlan = function() {
		return {'name': "New Tactic", 'players': [], 'animation':[]};
	};

	this.getPlanList = function() {
		return _.map(this.plans, function(entry) { 
			return _.pick(entry, ['id', 'name']) 
		});
	};

	this.getById = function(id) {
		return _.find(this.plans, function(value) {
			return id == value.id;
		});
	};
}
