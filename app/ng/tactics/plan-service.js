angular.module('coach.tactics')

.factory('planService', function(Constants) {

    var selectedPlanId = 1;
    var plans = [
        {
            'id': 1,
            'name': 'Default',
            'players' : [
                {'id': 1, 'x': '50', 'y': '50', 'color': 'yellow'},
                {'id': 2, 'x': '160', 'y': '160', 'color': 'red'},
                {'id': 3, 'x': '220', 'y': '220', 'color': 'yellow'},
            ],
            'animation' : [
                 {'label': "Phase 1", 
                  'duration': 1000, 
                  'transitions': [
                     {'id': 1, 'x': '100', 'y': '80'},
                     {'id': 2, 'x': '250', 'y': '20'}
                  ]
                 },
                 {'label': "Phase 2", 
                  'duration': 1500, 
                  'transitions': [
                     {'id': 3, 'x': '270', 'y': '10'},
                  ]
                 }
            ]
        }, 
        {
            'id': 2,
            'name': 'Attack',
            'players' : [
                {'id': 1, 'x': '20', 'y': '20', 'color': 'yellow'},
                {'id': 2, 'x': '60', 'y': '60', 'color': 'red'},
                {'id': 3, 'x': '120', 'y': '120', 'color': 'yellow'},
            ],
            'animation' : [
            ]
        }       
    ];

    return {
        getSelectedPlan : function() {
            return this.getById(selectedPlanId);
        },

        newPlan : function() {
            return {'name': "New Tactic", 'players': [], 'animation':[]};
        },

        getPlanList : function() {
            return _.map(plans, function(entry) { 
                return _.pick(entry, ['id', 'name']);
            });
        },

        getById : function(id) {
            return _.find(plans, function(value) {
                return id == value.id;
            });
        },

        setSelectedPlan: function(planId) {
            if (planId == selectedPlanId)
                return;

            // only notify if actually changes
              
            selectedPlanId = planId;
            $rootScope.$broadcast(Constants.SELECTED_PLAN_CHANGED_EVENT);
        }

        // addListener: function(scope, callback) {
        //     var destroyHandler = $rootScope.$on(SELECTED_PLAN_CHANGED_EVENT, callback);
        //     scope.$on('$destroy', destroyHandler);
        // }
    }
});
