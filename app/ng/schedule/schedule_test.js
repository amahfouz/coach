'use strict';

describe('coach.schedule module', function() {

  beforeEach(module('coach.schedule'));

  describe('schedule controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new(); //get a childscope
      var scheduleCtrl = $controller('ScheduleCtrl', {$scope:scope});
      expect(scheduleCtrl).toBeDefined();
    }));

  });
});