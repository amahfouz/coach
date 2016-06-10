angular.module('coach.tactics')
.factory('planService', function($log, PhaseService, Constants) {

    // constructor function for Plan objects

    function Plan(plan) {
        this.uid = Math.round(Math.random() * 10000 );
        if (plan)
            angular.extend(this, plan);

        updateComputedValues(this);
    };

    // private methods

    function nextId(plan) {

        if (! plan.players || plan.players.length == 0)
            return 1;

        // extract the IDs
        var playerIds = _.map(plan.players, function(player) { return player.id; });

        // pick the number that is one-greater than the greatest ID
        return _.last(_.sortBy(playerIds)) + 1;
    }

    function updateComputedValues(plan) {
        plan.paths = [];

        // if there are no phases or transitions then no paths
        if (!plan.animation || !plan.animation.length)
            return;

        // iterate over each transitions - 

        var sources = plan.players;
        var phaseIndex = 0;
        var dests;
        
        while (phaseIndex < plan.getNumPhases()) {
            dests = plan.getPhase(phaseIndex).getTransitions();

            _.forEach(sources, function(pos) {

                // find player position in destination

                var playerId = pos.id;
                var nextPos = _.find(dests, {'id': playerId});

                if (nextPos) {
                    var offset = Constants.PLAYER_DIAMETER / 2;
                    var path = {'x1': pos.x + offset, 'y1': pos.y + offset, 'x2': nextPos.x + offset, 'y2': nextPos.y + offset }
                    plan.paths.push(path);
                }
            });

            sources = dests;
            phaseIndex++;
        };
    }

    // add plan manipulation methods to the Plan class

    Plan.prototype = {

        addPlayer : function(x, y, color) {

            var playerId = nextId(this);
            this.players.push({'id': playerId, 'x': x, 'y': y, 'color': color});
        },

        updatePlayer: function(playerId, newX, newY) {

            var player = this.getPlayer(playerId);

            if (! player) {
                $log.log("Player with ID " + playerId + " not found.");
                return;
            }

            player.x = newX;
            player.y = newY;            

            updateComputedValues(this);
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
          
            updateComputedValues(this);  
        },

        getPlayer : function(playerId) {
            return _.find(this.players, function(player) {
                return playerId == player.id;
            });            
        },

        getNumPhases : function() {
            if (! this.animation)
                return 0;

            return this.animation.length;
        },

        getPhase : function(phaseId) {
            return _.find(this.animation, function(phase) {
                return phaseId == phase.id;
            });
        },

        ensureHasAnimationPhase : function() {
            if (! this.animation || this.animation.length == 0)
                this.addPhase();
        },

        addPhase : function() {
            if (! this.animation)
                this.animation = [];
            
            var phaseIndex = this.animation.length;
            var self = this;
            var newPhase = new PhaseService(phaseIndex, function(id) {
                $log.log("Animation change notificaiton.");
                updateComputedValues(self);
            });               

            this.animation.push(newPhase);
        },

        deletePhase : function(index) {
            this.animation.splice(index, 1);

            // renumber to start at zero
            var index = 0;
            _(this.animation).forEach(function(phase) {
                phase.id = index++;
            });

            updateComputedValues(this);
        },

        // every path segment in all animation phases
        getPaths : function() {
            return this.paths;
        }
    };

    // return the constructor function
    return Plan;
});