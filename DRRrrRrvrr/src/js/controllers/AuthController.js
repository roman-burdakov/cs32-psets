/**
 * Authorization Controller
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive').controller('AuthController', ['AuthService', function(AuthService){
  var ac = this;
  ac.authService = AuthService;

  ac.authorized = function() {
    return ac.authService.checkAuth();
  };

  ac.authorize = function(immediate) {
    return ac.authService.authorize(immediate);
  };
}]);