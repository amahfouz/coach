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
            transitions.push(transition);
            this.listener(this.id);
        }
    };       

    return Phase;
});

