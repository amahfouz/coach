// define a Phase class

angular.module('coach.tactics')

.factory('PhaseService', function() {

    // private vars

    var transitions = [];

    // constructor function

    function Phase(id, animationChangeListener) {
        this.id = id;
        this.duration = 1000;
        this.listener = animationChangeListener;
    }

    // public API

    Phase.prototype = {

        getTransitions : function() {
            return _.clone(transitions);
        },

        addTransition : function(transition) {

            // first remove existing animation for player if exists
            this.removeTransitionById(transition.id);

            // add the transition
            transitions.push(transition);

            // notify listener that phase data changed
            this.listener(this.id);
        },

        removeTransitionById : function(playerId) {
            // _.remove mutates the array
            _.remove(transitions, function(transition) {
                return transition.id == playerId;
            });

        }
    };       

    return Phase;
});

