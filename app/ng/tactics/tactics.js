'use strict';

angular.module('coach.tactics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tactics', {
    templateUrl: 'ng/tactics/tactics.html' 
  });
}])

.service('tacticsService', TacticsServiceFactory) 

.controller('TacticsCtrl', function($scope, $alert, $dropdown, tacticsService) {

	console.log("constructooooooooooooooooooooooooor.");

	$scope.idCounter = 0;

	this.nextId = function() {
		return $scope.idCounter++;
	};

	$scope.editMode = false;

	$scope.plans = tacticsService.getPlanList();
	$scope.selectedPlan = tacticsService.newPlan();
	
	$scope.selected = {'planId': undefined};

	$scope.$watch('selected.planId', function(newValue, oldValue) {
		if (oldValue == newValue)
			return;

		if (newValue == $scope.selectedPlan.id)
			return;

		//console.log("Old=" + oldValue + ", New=" + newValue + ", Selected=" + $scope.selected.planId);

		if (newValue) {
			$scope.selectedPlan = tacticsService.getById(newValue);
		}
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

	this.addPlayer = function(x, y, color) {
		var newId = "player" + this.nextId();                                       
		var playerInfo = {'id': newId, 'x': x, 'y': y, 'color': color};


		$scope.selectedPlan.players.push(playerInfo);
	};

	this.updatePlayer = function(playerId, newX, newY) {
		if (!$scope.selectedPlan)
			return;

		var item = _.find($scope.selectedPlan.players, function(item) {
			return item.id == playerId;
		});
		console.log("item=" + item);
		if (!item)
			return;

		item.x = newX;
		item.y = newY;
	}

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
			if (! $scope.selectedPlan) {
				console.log("No tactic is selected.");
				return;
			}

			_.remove($scope.selectedPlan.players, function(p) {
				return p.id == playerInfo.id;
			});
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
		console.log("getById = " + id);
		return _.find(this.plans, function(value) {
			return id == value.id;
		});
	};
}
