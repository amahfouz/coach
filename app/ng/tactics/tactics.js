'use strict';

angular.module('coach.tactics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tactics', {
    templateUrl: 'ng/tactics/tactics.html',
    controller: 'TacticsCtrl'
  });
}])

.service('tacticsService', TacticsServiceFactory) 

.controller('TacticsCtrl', function($scope, $alert, $dropdown, tacticsService) {

	$scope.idCounter = 0;

	$scope.test = function() {
		return $scope.idCounter++;
	};


	this.nextId = function() {
		return $scope.idCounter++;
	};

	$scope.editMode = false;

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

	$scope.deletePlayer = function() {
		console.log("Delete player.");
	};

	$scope.showCtxMenu = function(player) {
		var elementId = player.id;
		var element = $('#' + elementId)

		var dropdown = $dropdown(element, {
			show: false,
			trigger: "manual",
			html: true
		});

		dropdown.$scope.selectedPlayer = player;

		dropdown.$scope.deletePlayer = function(playerInfo) {
			console.log(playerInfo.id)
		};

        dropdown.$scope.content = 
	  	  [
		    {text: '<i class="fa fa-download"></i>&nbsp;Another action', "click": 'console.log("First item")'},
		    {text: '<i class="fa fa-globe"></i>&nbsp;Display an alert', "click": '$alert("Holy guacamole!")'},
		    {text: '<i class="fa fa-remove"></i>&nbsp;Delete', "click": 'deletePlayer(selectedPlayer)'},
		    {divider: true},
		    {text: 'Separated link', href: '#separatedLink'}
	      ];

		dropdown.$promise.then(function () {
		        dropdown.show();
	    });
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
