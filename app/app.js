'use strict';

// Declare app level module which depends on views, and components
angular.module('coach', [
  'ngSanitize', 
  'ngAnimate',
  'toaster',
  'ui.bootstrap',
  'ui.router',
  'ui.router.tabs',
  'coach.geometry',
  'coach.schedule',
  'coach.tactics',
  'coach.team',
  'coach.field',
  'coach.animation',
  'coach.home',
  'coach.drag',
  'coach.panels'
])
.controller("MainCtrl", function($scope) {
    $scope.tabData   = [
      {
        heading: 'Tactics',
        route:   'tactics'
      },
      {
        heading: 'Schedule',
        route:   'schedule',
      },
      {
        heading: 'Team',
        route:   'team',
      }      
    ];
})
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('tactics', {
            url: '/tactics',
            templateUrl: 'ng/tactics/tactics.html',
            controller:  'TacticsCtrl'
        })
        .state('schedule', {
            url: '/schedule',
            templateUrl: 'ng/schedule/schedule.html',
            controller:  'ScheduleCtrl'
        }) 
        .state('team', {
            url: '/team',
            templateUrl: 'ng/team/team.html',
            controller:  'TeamCtrl' 
        })
})

;


