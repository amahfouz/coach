angular.module("coach").factory("Constants", function() {

    // find a CSS style value for a certain selector
    // searches all selectors in the page
  
    function getStyleRuleValue(style, selector) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var mysheet = document.styleSheets[i];
            var myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
            for (var j = 0; j < myrules.length; j++) {
                if (myrules[j].selectorText && myrules[j].selectorText.toLowerCase() === selector) {
                    return myrules[j].style[style];
                }
            }

        }
    };

    return {
        SELECTED_PLAN_CHANGED_EVENT: "coach-selected-plan-changed",
        SELECTED_PHASE_CHANGED_EVENT: "coach-selected-phase-changed",       
        PLAYER_DIAMETER: getStyleRuleValue('max-width', '.player')
    };
})