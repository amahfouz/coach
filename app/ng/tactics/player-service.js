// Service managing players and their IDs

angular.module('coach.tactics')

.service("playerService", function() {
    
    this.idCounter = 1;

    this.nextId = function() {
        return this.idCounter++;
    };

    this.idFor = function(playerNumberId) {
        return 'player' + playerNumberId;
    }

    this.rawId = function(playerElementId) {
        return playerElementId.replace(/^player/, '');
    }
});

