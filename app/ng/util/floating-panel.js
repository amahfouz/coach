
/***** Application *****/
  
angular.module('coach.panels', ['ngSanitize'])

.directive('floatingPanel', function(){
  return {
    restrict: 'E',
    scope: {
      'title': '@'
    },
    transclude: {
      'content': 'paneContent',
      'footer' : 'paneFooter'
    },
    templateUrl: "ng/util/floating-panel.tpl.html"
  };
});
