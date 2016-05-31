// controller for player animation

angular.module('coach.animation').controller('AnimationCtrl', function($scope, playerAnimationService, planListService) {

    // animation

    $scope.play = function() {
        playerAnimationService.animatePlan(function finalCompletion(err) {
            
        });
    };

    $scope.reset = function() {
        playerAnimationService.reset(function finalCompletion(err) {
           //
        });
    };

    $scope.isAnimateButtonEnabled = function() {
        return $scope.getPhases().length;
    };

    $scope.isResetButtonEnabled = function() {
        return true;
    };

    // phase manipulation

    $scope.addAnimationPhase = function(){
        playerAnimationService.addPhase();
    };

    $scope.deleteAnimationPhase = function(index) {
        playerAnimationService.deletePhase();
    };   

    $scope.selectPhase = function(index) {
        playerAnimationService.setSelectedPhase(index);
    };

    $scope.getSelectedPhase = function() {
        return playerAnimationService.getSelectedPhase();
    };

    $scope.getPhases = function() {
        var selPlan = planListService.getSelectedPlan();
        if (! selPlan) {
            $log.log("No selected plan.");
            return;
        }

        return selPlan.animation;
    };
});

