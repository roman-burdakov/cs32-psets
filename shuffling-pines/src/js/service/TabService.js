angular.module('shuffling').service('TabService', [function(){
  var svc = this;
  svc.currentTab = 1;

  svc.setCurrentTab = function(tab){
    svc.currentTab = tab;
  };

  svc.getCurrentTab = function(){
    return svc.currentTab;
  };
}]);