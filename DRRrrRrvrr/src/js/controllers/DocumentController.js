/**
 * Document Controller.
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive')
    .controller('DocumentController', ['$scope', '$routeParams', 'GoogleDriveService', 'TranslatorService', 'AuthService',
      function($scope, $routeParams, GoogleDriveService, TranslatorService, AuthService){
        var dc = this;
        dc.googleDriveService = GoogleDriveService;
        dc.translatorService = TranslatorService;
        dc.authService = AuthService;
        dc.docId = $routeParams.docId;

        /**
         * Help function to watch changes in authorization service and call load file if user get authorized.
         */
        $scope.$watch(function() { return dc.authService.authorized; },
            function (newVal, oldVal) {
              if (oldVal === false && newVal === true) {
                dc.loadFile();
              }
            });

        /**
         * Help function to watch changes in google drive service and call translate service if file got changed.
         */
        $scope.$watch(function() { return dc.googleDriveService.currentFile; },
            function(oldVal, newVal) {
              if (newVal !== undefined && newVal !== oldVal) {
                dc.zombify();
              }
            }
        );

        /**
         * Method to delegate call to load file to google drive service
         */
        dc.loadFile = function() {
          dc.googleDriveService.loadFile(dc.docId);
          dc.zombify();
        };

        /**
         * Method to delegate call to translate file content to translation service
         */
        dc.zombify = function() {
          if (dc.googleDriveService.currentFile) {
            dc.translatorService.translate(dc.googleDriveService.currentFile);
          }
        };

        // init
        dc.loadFile();
      }]);