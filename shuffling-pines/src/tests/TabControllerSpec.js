describe('TabController', function(){

  beforeEach(module('shuffling'));
  var tabController, tabService;

  //angular.mock.inject
  beforeEach(angular.mock.inject(function($controller){
    tabController = $controller('TabController');
  }));

  beforeEach(function(){
    inject(function($injector) {
      tabService = $injector.get('TabService');
    });
  });

  it('expect to be opened on the first tab', function(){
    expect(tabController.tabService.currentTab).toBe(1);
  });

});