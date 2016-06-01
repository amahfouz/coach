angular.module('coach.tactics')

.factory('planListService', function(Constants, planService, $rootScope) {

    var selectedPlanId;

    // raw plan data as retrieved from persistence
    var store = [
        {
            'id': 1,
            'name': 'Default',
            'players' : [],
            'animation' : []
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

    // dictionary of planService.Plan objects
    var cache = {};

    // private functions

    function loadFromStore(id) {
        return _.find(store, function(value) {
            return id == value.id;
        });
    };


    // public API

    return {
        ensureValidSelection: function() {
            if (selectedPlanId)
                return;

            var planList = this.getPlanList();
            if (! planList.length) 
                planList.push(newPlan);

            this.setSelectedPlan(_.head(planList).id);
        },

        getSelectedPlan : function() {
            if (! cache[selectedPlanId]) {
                cache[selectedPlanId] = new planService(loadFromStore(selectedPlanId)); 
            }
            return cache[selectedPlanId];
        },

        newPlan : function() {
            return {'name': "New Tactic", 'players': [], 'animation':[]};
        },

        getPlanList : function() {
            return _.map(store, function(entry) { 
                return _.pick(entry, ['id', 'name']);
            });
        },

        setSelectedPlan: function(planId) {
            if (planId == selectedPlanId)
                return;

            // only notify if actually changes
              
            selectedPlanId = planId;
            
            $rootScope.$broadcast(Constants.SELECTED_PLAN_CHANGED_EVENT, null);
        }
    }
})
.run(function(planListService) {
    // select a plan and a trigger the selection of a phase
    planListService.ensureValidSelection();
})
;
