'use strict';

angular.module('coach.animation', [])

.directive('animationTree', function(){ 
	return {
		templateUrl: 'ng/tactics/animation/animation-tree.tpl.html',
		controller: 'AnimationCtrl'
	}
})
.directive('animationPhase', function() {
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

