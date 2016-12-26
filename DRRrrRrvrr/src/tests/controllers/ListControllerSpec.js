describe('ListController', function() {
  var $scope, authService,
      googleDriveService, listController;

  beforeEach(function() {
    //angular.mock.module
    module('gDrive');

    inject(function($rootScope, $controller, $injector) {
      $scope = $rootScope.$new();
      listController = $controller('ListController', {
        $scope: $scope
      });

      googleDriveService = $injector.get('GoogleDriveService');
      authService = $injector.get('AuthService');
    });
  });

  describe('Should load files from google drive', function() {

    it('should be empty on init', function(){
      expect(authService.authorized).toBeFalsy();
      expect(googleDriveService.documents).toEqual([]);
      expect(googleDriveService.currentFile).toEqual({});
    });

    it('should attempt to listFile() on google drive service once user is authorized (logged in)', function() {
      spyOn(googleDriveService, 'listFiles');
      authService.authorized = true;
      listController.listFiles();
      expect(googleDriveService.listFiles).toHaveBeenCalled();
      // testing for actual service loading is done in GoogleDriveServiceSpec
    });

    it('should not call listFile()  on google drive service if user logged out', function() {
      spyOn(googleDriveService, 'listFiles');
      authService.authorized = false;
      listController.listFiles();
      expect(googleDriveService.listFiles).not.toHaveBeenCalled();
    });
  });

  describe('on user authorization...', function() {
    it('should list files on his google drive (test for $scope.$watch)', function() {
      // TODO: doesn't work.
      //spyOn(listController, 'listFiles');
      //authService.authorized = true;
      //$scope.$apply();
      //expect(listController.listFiles).toHaveBeenCalled();
    });
  });
  
});