angular.module('shuffling')
    .controller('TabController', ['TabService', function(TabService) {
  var vm = this;
  vm.tabService = TabService;
}]);
