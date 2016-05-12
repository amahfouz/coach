// slanted line using html element
// see http://stackoverflow.com/questions/4270485/drawing-lines-on-html-page

angular.module('coach.geometry', [])

.directive("slantedLine", function() {
   return {
        require: "^soccerField",
        replace: true,
        templateUrl: "ng/util/slanted-line.tpl.html",
        scope: {
            'lineInfo': '='
        },
        link: function (scope, element, attrs, controller) {
                console.log("Line.link.");
                var x1 = scope.lineInfo.x1;
                var x2 = scope.lineInfo.x2;
                var y1 = scope.lineInfo.y1;
                var y2 = scope.lineInfo.y2;

                var a = x1 - x2,
                    b = y1 - y2,
                    c = Math.sqrt(a * a + b * b);

                var sx = (x1 + x2) / 2,
                    sy = (y1 + y2) / 2;

                var x = sx - c / 2,
                    y = sy;

                var alpha = Math.PI - Math.atan2(-b, a);

                // make computation available to template

                scope.x = x;
                scope.y = y;
                scope.length = c;
                scope.angle = alpha;
        }
        
   }; 
})
;