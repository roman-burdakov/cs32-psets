/**
 * Main app + config with routes
 * Created by roman.burdakov on 12/1/15.
 */
angular.module('gDrive', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
          .when('/list', {
            templateUrl: 'templates/list.html',
            controller: 'ListController',
            controllerAs: 'lc'
          })
          .when('/view/:docId', {
            templateUrl: 'templates/document.html',
            controller: 'DocumentController',
            controllerAs: 'dc'
          })
          .otherwise({
            redirectTo: '/list'
          });
    }]);