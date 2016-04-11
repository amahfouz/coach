// service to animate players 
// authority on which animation phase is active

angular.module('coach.animation').

factory('playerAnimationService', function(planService, $rootScope, toaster, Constants) {

    var selectedPhase;

    // public API

    return {

        ensurePhaseIsSelected: function() {
            console.log("ensurePhaseIsSelected.");
            var selPlan = planService.getSelectedPlan();
            if (! selPlan || ! selPlan.animation || selPlan.animation.length == 0) {
                selectedPhase = null;
                return; // no phase to select
            }
            // select the first phase from the plan

            var oldSelectedPhase = selectedPhase;
            selectedPhase = _.last(selPlan.animation);

            if (oldSelectedPhase != selectedPhase) {
                console.log('Phase changed. Broadcasating.');
                $rootScope.$broadcast(Constants.SELECTED_PHASE_CHANGED_EVENT);
            }
        },

        addAnimation : function(playerId, $event) {
            var plan = planService.getSelectedPlan();

            if (! plan || ! selectedPhase) {
                toaster.pop("danger", "Error", "No tactic is selected!");
                return;
            }

            // add the animation to the current phase

            var newX = $event.offsetX;
            var newY = $event.offsetY;

            var transition = { id: playerId, x: newX, y: newY };

            selectedPhase.transitions.push(transition);
        },

        animatePlan : function(finalCompletion) {

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

            var selPlan = planService.getSelectedPlan();
            if (! selPlan)
                return;

            async.eachSeries(selPlan.animation, animatePhase, finalCompletion);
        }
    }

})
.run(function(playerAnimationService, $rootScope, Constants) {
    console.log("run playerAnimationService!");
    playerAnimationService.ensurePhaseIsSelected();

    $rootScope.$on(Constants.SELECTED_PLAN_CHANGED_EVENT, function(ev, args) {

        console.log("On selected plan changed.");

        playerAnimationService.ensurePhaseIsSelected();
    });
})
;