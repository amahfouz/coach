'use strict';

angular.module('coach.field', [])
// .controller("FieldController", function($scope, $alert) {
// })
.directive("cloneDraggable", function() {
	return {
		link: function(scope, element, attrs, controller) {
			element.draggable({ helper:'clone', 
				                revert: 'invalid', 
				                cursor: "auto"});	
		}
	};
})
.directive("draggablePlayer", function() {
	return {
		templateUrl: "ng/tactics/field/player.tpl.html",
		replace: true,
		require: "^soccerField",
		link: { 
			post: function postLink($scope, element, attrs, tacticsCtrl) {
				element.draggable
					 ({ cursor: "auto", containment: '#dragging-area', 
						stop: function(event, ui) {
							$scope.$apply(function() {
								if (! event) 
									return;

								var target = event.target;
								var jqEl = $(target);

								tacticsCtrl.updatePlayer(jqEl.attr("player-id"), target.offsetLeft, target.offsetTop);
							});
						}
					  });
			}
		}
	};
})
.directive("soccerField", function() {
	return {
		templateUrl: "ng/tactics/field/field.tpl.html",
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
	};
})
// translates the input with 'offset' pixels
.filter('translate', function() {
	return function(input, offset) {
		_.forOwn(input, function(value, key) {
			console.log("Key " + key + " value " + value);
			input["key"] = value + offset;
		});
		return input;
	}
})
;

