'use strict';

describe('myApp.team module', function() {

  beforeEach(module('myApp.team'));

  describe('team controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new(); //get a childscope
      var playersCtrl = $controller('TeamCtrl', {$scope: scope});
      expect(playersCtrl).toBeDefined();
    }));

  });
});