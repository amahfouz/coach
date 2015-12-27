'use strict';

describe('myApp.tactics module', function() {

  beforeEach(module('myApp.tactics'));

  describe('tactics controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var scope = $rootScope.$new(); //get a childscope
      var tacticsCtrl = $controller('TacticsCtrl', {$scope: scope});
      expect(tacticsCtrl).toBeDefined();
    }));

  });
});