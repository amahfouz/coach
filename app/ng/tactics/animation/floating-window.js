
/***** Application *****/
  
angular.module('adminMenu',['ngSanitize','coach.drag'])

.directive('floatingPanel' function() {
  return {
    transclude: true,
    templateUrl: "ng/util/floating-panel.tpl.js"
  };
});
