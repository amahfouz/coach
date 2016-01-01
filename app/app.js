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
  'ngDragDrop',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.modal',
  'mgcrea.ngStrap.dropdown',
  'mgcrea.ngStrap.helpers.dimensions',
  'mgcrea.ngStrap.helpers.parseOptions',
  'mgcrea.ngStrap.select'
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


