angular.module("coach").factory("Constants", function() {
    
    return {
        SELECTED_PLAN_CHANGED_EVENT: "coach-selected-plan-changed",
        SELECTED_PHASE_CHANGED_EVENT: "coach-selected-phase-changed"        
    };
})