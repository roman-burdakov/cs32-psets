describe('Tab', function(){

  //angular.mock.module
  beforeEach(module('shuffling'));
  var tabService;

  beforeEach(function(){
    module(function($provide){
      $provide.service('TabService', function(){
        // init with first tab.
        this.currentTab = 1;
        this.getCurrentTab = function(){
          return this.currentTab;
        };
        this.setCurrentTab = function(tab){
          this.currentTab = tab;
        };
      });
    });
    inject(function($injector) {
      tabService = $injector.get('TabService');
    });
  });

  it('expect getCurrentTab() to return correct value for currentTab', function(){
    expect(tabService.getCurrentTab()).not.toBeNull();
    expect(tabService.getCurrentTab()).toBe(tabService.currentTab);
  });

  it('expect setCurrentTab() to update currentTab value', function(){
    var oldTab = tabService.getCurrentTab();
    var newTab = 5;
    tabService.setCurrentTab(newTab);
    expect(oldTab).not.toBe(tabService.getCurrentTab());
    expect(tabService.getCurrentTab()).toBe(newTab);
  });

});