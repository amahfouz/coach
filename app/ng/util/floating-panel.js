
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
    //template: '<div class="panel panel-primary">  <div class="panel-heading cursor-move"> <span> <big>Titllllle</big> </span> </div> <div id="panelBody" class="panel-collapse collapse in"> <section  ng-transclude="contentSot">Empty</section> Heeeye <div ng-transclude="footerSlot">Ayman</div> </div>  </div>'
    templateUrl: "ng/util/floating-panel.tpl.html"
  };
});
