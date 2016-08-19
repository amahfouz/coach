// service to animate players 
// authority on which animation phase is active

angular.module('coach.animation').

factory('playerAnimationService', function(planListService, $rootScope, toaster, Constants) {

    // currently selected phase in animation pane

    var selectedPhase;

    // private functions 

    function getPlayerElement(playerId) {
        return $('.player[player-id="' + playerId +  '"]');
    }

    function animatePlayer(playerEl, destX, destY, duration, callback) {
        playerEl.animate({ left: destX + 'px', top: destY + 'px' }, 
                          duration, 'swing', callback);
    }

    // public API

    return {

        init : function() {
            this.isAnimating = false;
        },

        ensurePhaseIsSelected : function() {
            var selPlan = planListService.getSelectedPlan();
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

        getSelectedPhase : function() {
            return selectedPhase;
        },

        setSelectedPhase : function(phaseIndex) {
            var selPlan = planListService.getSelectedPlan();
            if (! selPlan) {
                $log.log("No selected plan!");
                return;
            }
            selectedPhase = selPlan.animation[phaseIndex];
        },

        addPhase : function() {
            var selPlan = planListService.getSelectedPlan();
            if (! selPlan) {
                $log.log("No selected plan.");
                return;
            }

            selPlan.addPhase();

            // select the new phase and fire an event
            this.ensurePhaseIsSelected();
        },

        deletePhase : function(index) {
            var selPlan = planListService.getSelectedPlan();
            if (! selPlan || ! selPlan.animation)
                return;

            selPlan.deletePhase(index);

            // select the new phase and fire an event
            this.ensurePhaseIsSelected();        

            // reset to original position
            this.reset();
        },

        addAnimation : function(playerId, $event) {
            var plan = planListService.getSelectedPlan();

            if (! plan) {
                toaster.pop("danger", "Error", "No tactic is selected!");
                return;
            }

            if (! selectedPhase) {
                plan.ensureHasAnimationPhase();
                this.ensurePhaseIsSelected();
            }

            var player = plan.getPlayer(playerId);

            if (!player) {
                toaster.pop("danger", "Error", "No player found!");
                return;
            }

            // add the animation to the current phase

            var newX = $event.offsetX;
            var newY = $event.offsetY;

            var transition = { id: playerId, x: newX, y: newY, color: player.color };

            selectedPhase.addTransition(transition);
        },

        animatePlan : function(finalCompletion) {

            function animatePhase(phase, completionParam) {
                performTransitions(phase.getTransitions(), phase.duration, completionParam);
            }

            function performTransitions(transitions, duration, completionParam) {
                // curry to provide duration which is not available for animateItem
                async.each(transitions, _.curry(performOneTransition)(duration), completionParam);
            }

            function performOneTransition(duration, transition, callback) {
                var playerEl = getPlayerElement(transition.id);

                animatePlayer(playerEl, transition.x, transition.y, duration, callback);
            }

            // kick off the animation 

            var selPlan = planListService.getSelectedPlan();
            if (! selPlan)
                return;

            var self = this;
            this.isAnimating = true;
            async.eachSeries(selPlan.animation, animatePhase, function(err) {
                finalCompletion(err);
                console.log("Setting animation to false.");
                self.isAnimating = false;
            });
        },

        reset : function(completionParam) {
            var selPlan = planListService.getSelectedPlan();
            if (! selPlan)
                return;

            function resetPlayer(duration, player, completionParam) {    
                var playerEl = getPlayerElement(player.id);

                animatePlayer(playerEl, player.x, player.y, duration, completionParam);
            }

            // kick off the animation

            async.each(selPlan.players, _.curry(resetPlayer)(300), completionParam);
        },

        getIsAnimating : function() {
            // console.log("isAnimating=" + this.isAnimating);
            return this.isAnimating;
        }
    }

})
.run(function(playerAnimationService, $rootScope, Constants) {
    
    playerAnimationService.init();
    playerAnimationService.ensurePhaseIsSelected();

    $rootScope.$on(Constants.SELECTED_PLAN_CHANGED_EVENT, function(ev, args) {

        console.log("On selected plan changed.");

        playerAnimationService.ensurePhaseIsSelected();
    });
})
;