angular.module('coach.tactics')
.factory('planService', function($log) {

    // constructor function for Plan objects

    function Plan(plan) {
        if (plan)
            angular.extend(this, plan);
    };

    // private methods

    function nextId(plan) {
        // extract the IDs
        var playerIds = _.map(plan.players, function(player) { return player.id; });

        // pick the number that is one-greater than the greatest ID
        return _.last(_.sortBy(playerIds)) + 1;
    }

    // add plan manipulation methods to the Plan class

    Plan.prototype = {
        addPlayer : function(x, y, color) {

            var playerId = nextId(this);
            this.players.push({'id': playerId, 'x': x, 'y': y});
        },

        updatePlayer: function(playerId, newX, newY) {

            var player = this.getPlayer(playerId);

            if (! player) {
                $log.log("Player with ID " + playerId + " not found.");
                return;
            }

            player.x = newX;
            player.y = newY;            
        },

        removePlayer: function(playerId) {
            var playerToRemove = this.getPlayer(playerId);
            if (! playerToRemove) {
                $log.log("Player with ID " + playerId + " not found.");
                return;
            }
            _.pull(this.players, playerToRemove);

            // now remove corresponding animation from every phase if any

            _(this.animation).forEach(function(phase) {
                _.pullAllWith(phase.transitions, playerId, function(arrVal, otherVal) { return arrVal.id == otherVal; } );
                //var playerTransitionIndex = _.findIndex(transitions, function(trans) { return trans.id == playerId} );  
            });
            
        },

        getPlayer : function(playerId) {
            return _.find(this.players, function(player) {
                return playerId == player.id;
            });            
        },

        addPhase : function() {
            if (! this.animation)
                this.animation = [];
            
            var newPhase =               
                {'label': "Phase " + this.animation.length + 1, 
                  'duration': 1000, 
                  'transitions': []
                 };

            this.animation.push(newPhase);
        },

        deletePhase : function(index) {
            this.animation.splice(index, 1);
        }
    };

    // return the constructor function
    return Plan;
});