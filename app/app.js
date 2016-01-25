'use strict';

// Declare app level module which depends on views, and components
angular.module('coach', [
  'ngRoute', 'ngSanitize', 'ngAnimate',

  'mgcrea.ngStrap',

  'coach.team',
  'coach.schedule',
  'coach.tactics',
  'coach.field',
  'coach.animation',
  'coach.home',
  'coach.drag',
  'coach.panels'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.config(function($dropdownProvider) {
  angular.extend($dropdownProvider.defaults, {
    html: true
  });
})
;


