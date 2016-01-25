'use strict';

angular.module('coach.tactics', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tactics', {
    templateUrl: 'ng/tactics/tactics.html	' 
  });
}])

.service('tacticsService', TacticsServiceFactory) 

.controller('TacticsCtrl', function($scope, $alert, $dropdown, tacticsService) {

	$scope.idCounter = 0;

	$scope.button = {
	  selected: 1
	};


	this.nextId = function() {
		return $scope.idCounter++;
	};

	$scope.isAnimateMode = function() {
		return $scope.button.selected == 1;
	};

	//$scope.mode = { "radio": 1 };

	$scope.plans = tacticsService.getPlanList();
	$scope.selectedPlan = tacticsService.getById(1);
	
	$scope.selected = {'planId': undefined};

	$scope.aside = {
	  "title": "Title",
	  "content": "Hello Aside<br />This is a multiline message!"
	};

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

	$scope.save = function() {
		alert($scope.button.selected);
	};	

	$scope.play = function() {
		if (! $scope.selectedPlan)
			return;

		animatePlan($scope.selectedPlan.animation, 	function finalCompletion(err) {
			console.log("Done " + err);
		});
	};

	$scope.playerId = function(playerNumberId) {
		return idFor(playerNumberId);
	};

	this.addPlayer = function(x, y, color) {
		var newId = $scope.playerId(this.nextId());                                       
		var playerInfo = {'id': newId, 'x': x, 'y': y, 'color': color};

		$scope.selectedPlan.players.push(playerInfo);
	};

	this.updatePlayer = function(playerId, newX, newY) {
		if (!$scope.selectedPlan)
			return;

		var item = _.find($scope.selectedPlan.players, function(item) {
			return item.id == playerId;
		});
		
		if (!item)
			return;

		item.x = newX;
		item.y = newY ;
	};

	$scope.showCtxMenu = function(player) {
		var elementId = player.id;
		var element = $('#' + elementId);

		var dropdown = $dropdown(element, {
			show: false,
			trigger: "manual",
			html: true
		});

		dropdown.$scope.selectedPlayer = player;

		dropdown.$scope.deletePlayer = function(playerInfo) {
			if (! $scope.selectedPlan) {
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

	$scope.addAnimationPhase = function(){
		console.log("addAnimationPhase");
		var phases = $scope.selectedPlan.animation;
		var newPhase = 				 
			{'label': "Phase " + phases.length + 1, 
			  'duration': 1000, 
			  'transitions': []
			 };

		phases.push(newPhase);
	};

	$scope.deleteAnimationPhase = function(index) {
		var phases = $scope.selectedPlan.animation;
		phases.splice(index, 1);
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
				 {'label': "Phase 1", 
				  'duration': 1000, 
				  'transitions': [
					 {'id': 1, 'x': '100', 'y': '80'},
					 {'id': 2, 'x': '250', 'y': '20'}
				  ]
				 },
				 {'label': "Phase 2", 
				  'duration': 1500, 
				  'transitions': [
					 {'id': 3, 'x': '270', 'y': '10'},
				  ]
				 }
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
			return _.pick(entry, ['id', 'name']);
		});
	};

	this.getById = function(id) {
		return _.find(this.plans, function(value) {
			return id == value.id;
		});
	};
};

/// global

function animatePlan(phases, finalCompletion) {

	function animatePhase(phase, completionParam) {
		performTransitions(phase.transitions, phase.duration, completionParam);
	}

	function performTransitions(transitions, duration, completionParam) {
		// curry to provide duration which is not available for animateItem
		async.each(transitions, _.curry(animateItem)(duration), completionParam);
	}

	function animateItem(duration, transition, callback) {
		$('#' + idFor(transition.id)).animate(
			{ left: transition.x + 'px', top: transition.y + 'px' }, 
            duration, 'swing', callback);
	}

	// kick the animation of

	async.eachSeries(phases, animatePhase, finalCompletion);
}

function idFor(playerNumberId) {
	return 'player' + playerNumberId;
}

