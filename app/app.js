'use strict';

// Declare app level module which depends on views, and components
angular.module('coach', [
  'ngRoute',
  'ngSanitize',
  'ngAnimate',
  'coach.team',
  'coach.schedule',
  'coach.tactics',
  'coach.field',
  'coach.home',
  'mgcrea.ngStrap'
  //'floatingWindow'
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


