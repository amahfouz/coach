'use strict';

angular.module('coach.field', [])
// .controller("FieldController", function($scope, $alert) {
// })
.directive("cloneDraggable", function() {
	return {
		link: function(scope, element, attrs, controller) {
			element.draggable({ helper:'clone', 
				                revert: 'invalid', 
				                cursor: "crosshair"});	
		}
	}
})
.directive("draggablePlayer", function() {
	return {
		templateUrl: "ng/field/player.html",
		//controller: "TacticsCtrl",
		replace: true,
		require: "^soccerField",
		link: { 
			post: function postLink($scope, element, attrs, tacticsCtrl) {
				element.draggable
					 ({ cursor: "crosshair", containment: 'parent', 
						stop: function(event, ui) {
							$scope.$apply(function() {
								if (! event) 
									return;

								var el = event.target;
								tacticsCtrl.updatePlayer(el.id, el.offsetLeft, el.offsetTop);
							});
						}
					  });
			}
		}
	}
})
.directive("soccerField", function(tacticsService, $compile) {
	return {
		controller: "TacticsCtrl",
	    link: function($scope, element, attrs, controller) {
	    	element.droppable({		
				drop: function(ev, ui) {
					if (! ui.helper.hasClass("toolbar-gadget"))
						return;

					var pos=$(ui.helper).offset();
					var newX = pos.left- element.offset().left;
					var newY = pos.top - element.offset().top;
					var color = $(ui.helper).attr("player-color");

					$scope.$apply(function() {
						controller.addPlayer(newX, newY, color);
					});
				}
			});  // element.droppable
		}
	}
})
;

// .controller('FieldCtrl', function($scope) {
// });