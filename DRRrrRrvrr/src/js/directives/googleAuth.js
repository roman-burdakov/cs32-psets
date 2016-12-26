/**
 * Google Authorization button directive.
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive').directive('auth', [function() {
    // uncomment if you want to perform auth call on behalf of user and get updates every 5 sec.
    //.directive('auth', ['$interval', 'AuthService', function($interval, AuthService) {

      //var gAuth = this;
      //gAuth.authService = AuthService;
      //gAuth.checkAuth = function() {
      //  gAuth.authService.authorize(true);
      //};
      //
      //$interval(gAuth.checkAuth, 5000);
      //gAuth.checkAuth(true);

      return {
        restrict: 'E',
        controller: 'AuthController',
        controllerAs: 'ac',
        templateUrl: 'templates/auth.html'
      };
    }]);