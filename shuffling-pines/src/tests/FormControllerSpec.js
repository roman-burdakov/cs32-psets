describe('FormController', function(){

  //angular.mock.module
  beforeEach(module('shuffling'));
  var formController, guestService, tabService;

  //angular.mock.inject
  beforeEach(angular.mock.inject(function($controller){
    formController = $controller('FormController');
  }));

  beforeEach(function(){
    inject(function($injector) {
      guestService = $injector.get('GuestService');
      tabService = $injector.get('TabService');
    });
  });

  describe('.register()', function(){
    var date = new Date();
    it('should register new guests, call clearInputs function and switch tab', function(){
      formController.guestService.guests = [];
      expect(formController.guestService.getAll().length).toBe(0);
      spyOn(formController, 'clearInputs');

      formController.name = 'Roman';
      formController.phone = '617-617-6117';
      formController.transitionDate = date;
      formController.action = 'drop-off';
      formController.location = '300 N. Beacton Str, Watertown MA 02472';
      formController.register();
      // clear input called
      expect(formController.clearInputs).toHaveBeenCalled();
      // guest is registered
      expect(formController.guestService.getAll().length).toBe(1);
      // tab is switch to guest view
      expect(formController.tabService.getCurrentTab()).toBe(2);
    });

    it('should erase input fields once guest is created', function(){
      expect(formController.name).not.toBeDefined();
      expect(formController.phone).not.toBeDefined();
      expect(formController.transitionDate).not.toBeDefined();
      expect(formController.action).not.toBeDefined();
      expect(formController.location).not.toBeDefined();
    });

    it('should fully initialize new guest with data from inputs', function(){
      var guest = formController.guestService.getAll()[0];
      expect(guest.name).toBe('Roman');
      expect(guest.phone).toBe('617-617-6117');
      expect(new Date(guest.transitionDate)).toEqual(date);
      expect(guest.action).toBe('drop-off');
      expect(guest.pickupLocation).toBe('300 N. Beacton Str, Watertown MA 02472');
    });
  });

  describe('.delete(key) should mark guest for the given key as deleted = true but not removed from guest list',
      function(){
    it('guest is marked as deleted', function() {
      formController.guestService.guests = [];
      formController.name = 'Roman';
      formController.phone = '617-617-6117';
      formController.transitionDate = new Date();
      formController.action = 'drop-off';
      formController.location = '300 N. Beacton Str, Watertown MA 02472';
      formController.register();

      formController.name = 'Alex';
      formController.phone = '617-617-5555';
      formController.transitionDate = new Date();
      formController.action = 'pick-up';
      formController.location = '300 N. Beacton Str, Watertown MA 02472';
      formController.register();

      expect(formController.guestService.getAll().length).toBe(2);
      var guest1 = formController.guestService.getGuest(0);
      var guest2 = formController.guestService.getGuest(1);
      expect(guest1.deleted).toBe(false);
      expect(guest2.deleted).toBe(false);

      spyOn(formController, 'delete');
      formController.delete(0);

      expect(formController.delete).toHaveBeenCalled();
      expect(formController.delete).toHaveBeenCalledWith(0);
      // still have 2 guests, but ui will use "...  | filter: { deleted: false }:true" to filter removed guest.
      expect(formController.guestService.getAll().length).toBe(2);
    });
  });

});