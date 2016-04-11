// controller for player animation

angular.module('coach.animation').controller('AnimationCtrl', function($scope, playerAnimationService) {

    $scope.play = function() {
        playerAnimationService.animatePlan(function finalCompletion(err) {
            console.log("Done " + err);
        });
    };
});