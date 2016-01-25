angular.module('coach.drag',['ngSanitize'])

.directive('draggable',[function(){
  return {
    restrict : 'AE',
    transclude : true,
    replace : true,
    scope : {},
    templateUrl : function(el,attrs){
      return (angular.isDefined(attrs.template)) ? attrs.template : '/tmpls/draggable-default';
    },
    link : function(scope,el,attrs){
      // draggable object properties
      scope.obj = {
        id : null,
        content : '',
        group : null
      };
      scope.placeholder = false;
      
      scope.obj.content = el.html();
      scope.obj.id = attrs.id;
      
      if(angular.isDefined(attrs.placeholder))
        scope.placeholder = scope.$eval(attrs.placeholder);
      
      // options for jQuery UI's draggable method
      var opts = (angular.isDefined(attrs.options)) ? scope.$eval(attrs.options) : {addClasses: false, cancel: '.panel-body', opacity: 0.35};
      
      if(angular.isDefined(attrs.group)){
        scope.obj.group = attrs.group;
        opts.stack = '.' + attrs.group;
      }
      
        // event handlers
      var evts = {
        start : function(evt,ui){
          if (scope.placeholder) 
             ui.helper.wrap('<div class="dragging"></div>');
        }, 
        stop : function(evt,ui){
          if (scope.placeholder)
             ui.helper.unwrap();
        } 
      }; 

      // combine options and events
      var options = angular.extend({}, opts, evts);

      el.draggable(options); 
    } // end link
  }; // end return
}]) // end draggable

.run(['$templateCache',function($templateCache){
  $templateCache.put('/tmpls/draggable-default','<div ng-transclude></div>');
}]) // end itsADrag.run
;
