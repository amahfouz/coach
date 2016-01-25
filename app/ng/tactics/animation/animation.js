'use strict';

angular.module('coach.animation', [])

.directive('animationTree', function(){ 
	return {
		templateUrl: 'ng/tactics/animation/animation-tree.tpl.html',
		controller: 'TacticsCtrl'
	}
})
.directive('animationPhase', function() {
	console.log("Animation phase directive.");
	return {
		templateUrl: "ng/tactics/animation/animation-phase.tpl.html",
		scope: {
			"animationSteps": '=' 
		}
	};
})
// .directive('animationStep', function() {
// 	return {

// 	}
// })
;

