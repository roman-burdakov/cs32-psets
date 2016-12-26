/**
 * List controller
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive')
    .controller('ListController', ['$location', '$scope', 'AuthService', 'GoogleDriveService',
      function($location, $scope, AuthService, GoogleDriveService){
        var lc = this;
        lc.authService = AuthService;
        lc.googleDriveService = GoogleDriveService;

        /**
         * Help function to watch changes in authorization service
         */
        $scope.$watch(function() { return lc.authService.authorized; }, function (newVal, oldVal) {
          if (oldVal === false && newVal === true) {
            lc.listFiles();
          }
        });

        /**
         * Method to call load files from google drive.
         */
        lc.listFiles = function() {
          if (lc.authService.authorized) {
            lc.googleDriveService.listFiles();
          }
        };

        // init
        lc.listFiles();
      }]);