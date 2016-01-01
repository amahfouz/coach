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
		replace: true,
		link: { 
			post: function postLink($scope, element, attrs, controller) {
				console.log("linked the new element.")
				element.draggable({ cursor: "crosshair", containment: 'parent', 
									start: function(event, ui) {
										console.log("Drag started");
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

					var dropped=$(ui.draggable).clone();

					dropped.removeAttr("clone-draggable");

					
					dropped.attr("id", newId);

					var pos=$(ui.helper).offset();
					
					var newX = pos.left- element.offset().left;
					var newY = pos.top - element.offset().top;

					dropped.css({"left":newX,"top":newY, "z-index": 100});
					dropped.removeClass("toolbar-gadget");
					dropped.addClass("player");

					// make it a directive
					dropped.attr("draggable-player", "");
					dropped.attr("ng-click", "showCtxMenu()");

					var compiled = $compile(dropped)($scope);
					$(this).append(compiled);
				}
			});  // element.droppable
		}
	}
})
;

// .controller('FieldCtrl', function($scope) {
// });