/**
 * Google Authorization service.
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive')
    .service('AuthService', ['$rootScope', 'CLIENT_ID', 'SCOPES', 'GoogleDriveService',
      function($rootScope, CLIENT_ID, SCOPES, GoogleDriveService){
        var svc = this;
        svc.authorized = false;
        svc.googleDriveService = GoogleDriveService;

        /**
         * Authorize current user.
         * @param immediate - send true if it should be called immediately.
         */
        svc.authorize = function(immediate) {
          if(gapi.auth && gapi.auth.authorize) {
            gapi.auth.authorize({
              client_id: CLIENT_ID,
              scope: SCOPES.join(' '),
              immediate: immediate
            }, this.handleAuthResult);
          }
        };

        /**
         * Check if current user has authorized this application.
         */
        svc.checkAuth = function() {
          return svc.authorized;
        };

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        svc.handleAuthResult = function(authResult) {
          svc.authorized = !!(authResult && !authResult.error);
          $rootScope.$apply();
        };

        /**
         * Initiate auth flow in response to user clicking authorize button.
         */
        svc.handleAuthClick = function() {
          gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}, svc.handleAuthResult);
          return false;
        };

      }]);